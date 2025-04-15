import re
import json
from .helpers.GeneratePrompts import GeneratePrompts
from .helpers.GoogleSearchAgent import GoogleSearchAgent
from .helpers.ProductAgent import ProductAgent
from vertexai.preview.generative_models import Part
import requests

class AttributeEnricher:
    def __init__(self, product_json: dict):
        """
        Initializes the AttributeEnricher with product information, preparing attributes for enrichment.

        Args:
            product_json (dict): A dictionary containing the product information such as name, brand, attributes, etc.
        """
        self.product_json = product_json
        self.product_name = product_json["product_name"]
        self.brand = product_json["brand"]
        self.images = product_json.get("images", [])
        self.barcode = product_json.get("barcode", "")

        # Prepare attributes list as expected by GeneratePrompts (already adapted)
        attributes_to_enrich = [
            {
                "name": attr_name,
                "type": attr_data.get("type"),
                "unit": attr_data.get("unit"),
                "options": attr_data.get("options", [])
            }
            for attr_name, attr_data in product_json["attributes"].items()
        ]

        self.attributes_prompt = GeneratePrompts(attributes_to_enrich).generate_prompt()

    def get_mime_from_uri(self, image_uri: str) -> str:
        """
        Returns the MIME type for an image URI based on its file extension.

        Args:
            image_uri (str): The URI of the image.

        Returns:
            str: The MIME type of the image.
        """
        if image_uri.endswith(".png"):
            return "image/png"
        elif image_uri.endswith(".gif"):
            return "image/gif"
        else:
            return "image/jpeg"

    def retrieve_image_part(self, image_uri: str) -> Part:
        """
        Retrieves an image part either from a Google Cloud Storage URI, HTTP(s) URL, or local file.

        Args:
            image_uri (str): The URI or path to the image.

        Returns:
            Part: A Part object representing the image.
        """
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
        """
        Extracts and parses JSON data from a markdown-formatted response.

        Args:
            answer (str): The response string containing markdown.

        Returns:
            dict: The parsed JSON object.

        Raises:
            ValueError: If no valid JSON is found in the response.
        """
        code_blocks = re.findall(r"```(?:json)?\s*([\s\S]*?)```", answer)
        for block in code_blocks:
            try:
                return json.loads(block)
            except json.JSONDecodeError:
                continue
        raise ValueError("No valid JSON found in the response.")

    def google_product_info(self) -> str:
        """
        Uses the GoogleSearchAgent to retrieve product information based on the product name, brand, attributes, and barcode.

        Returns:
            str: A string containing the information retrieved from Google Search.
        """
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

    def enrich_attributes(self) -> dict:
        """
        Enriches the attributes of the product by generating responses using the ProductAgent and Google search information.

        Returns:
            dict: A dictionary containing enriched attribute data.
        """
        # Initialize ProductAgent and retrieve image information
        productagent = ProductAgent(gemini_model_version="gemini-2.5-pro-exp-03-25", temperature=0)
        image_parts = [self.retrieve_image_part(uri) for uri in self.images] if self.images else []
        
        # Generate the enriched attributes response using the ProductAgent
        response = productagent.generate_response(
            self.brand,
            self.product_name,
            self.google_product_info(),
            self.attributes_prompt,
            image_parts,
            self.barcode
        )

        # Parse the raw data into JSON
        raw_data = response.candidates[0].content.parts[0].text
        parsed_data = json.loads(raw_data)

        return parsed_data
