import re
import json
from .helpers.GeneratePrompts import GeneratePrompts
from .helpers.GoogleSearchAgent import GoogleSearchAgent
from .helpers.ProductAgent import ProductAgent
from vertexai.preview.generative_models import Part
import requests

class AttributeEnricher:
    def __init__(self, product_json):
        self.product_json = product_json
        self.product_name = product_json["product_name"]
        self.brand = product_json["brand"]
        self.images = product_json.get("images", [])
        self.barcode = product_json.get("barcode", "")

        # Prepare attributes list as expected by GeneratePrompts (already adapted by you)
        attributes_to_enrich = []
        for attr_name, attr_data in product_json["attributes"].items():
            attributes_to_enrich.append({
                "name": attr_name,
                "type": attr_data.get("type"),
                "unit": attr_data.get("unit"),
                "options": attr_data.get("options", [])
            })
        self.attributes_prompt = GeneratePrompts(attributes_to_enrich).generate_prompt()

    def get_mime_from_uri(self, image_uri: str) -> str:
        if image_uri.endswith(".png"):
            return "image/png"
        elif image_uri.endswith(".gif"):
            return "image/gif"
        else:
            return "image/jpeg"

    def retrieve_image_part(self, image_uri):
        if image_uri.startswith("gs://"):
            return Part.from_uri(image_uri, mime_type=self.get_mime_from_uri(image_uri))

        elif image_uri.startswith("http://") or image_uri.startswith("https://"):
            response = requests.get(image_uri)
            if response.status_code == 200:
                image_bytes = response.content
                return Part.from_data(image_bytes, mime_type=self.get_mime_from_uri(image_uri))
            else:
                print(f"Fetch image failed for {image_uri}, status code: {response.status_code}")
                return None
        else:
            image_bytes = open(image_uri, "rb").read()
            return Part.from_data(image_bytes, mime_type=self.get_mime_from_uri(image_uri))

    def parse_json_from_markdown(self, answer: str) -> dict:
        code_blocks = re.findall(r"```(?:json)?\s*([\s\S]*?)```", answer)
        for block in code_blocks:
            try:
                return json.loads(block)
            except json.JSONDecodeError:
                continue
        raise ValueError("No valid JSON found in the response.")

    def google_product_info(self):
        googlesearchagent = GoogleSearchAgent()

        response = googlesearchagent.generate_response(
            self.product_name,
            self.brand,
            self.attributes_prompt,
            self.barcode
        )

        response_string = ""
        for part in response.candidates[0].content.parts:
            if hasattr(part, 'text') and part.text:
                response_string += part.text

        return response_string

    def enrich_attributes(self):
        # Initialize ProductAgent and get the image information
        productagent = ProductAgent(gemini_model_version="gemini-2.5-pro-exp-03-25", temperature=0)
        image_parts = [self.retrieve_image_part(uri) for uri in self.images] if self.images else []
        
        response = productagent.generate_response(
            self.brand,
            self.product_name,
            self.google_product_info(),
            self.attributes_prompt,
            image_parts,
            self.barcode
        )

        raw_data = response.candidates[0].content.parts[0].text
        parsed_data = json.loads(raw_data)

        return parsed_data