class GeneratePrompts:
    def __init__(self, list_of_attributes):
        self.list_of_attributes = list_of_attributes

    def prompt_measure(self, attribute_name, unit) -> str:
        return f"{attribute_name.title()}: Generate a measurement in the unit {unit}."

    def prompt_multiple_values(self, attribute_name) -> str:
        return f"{attribute_name.title()}: Generate multiple values."

    def prompt_rich_text(self, attribute_name) -> str:
        return f"{attribute_name.title()}: Generate a complete and detailed rich text (HTML) response. The length should be at least 200 words."
        
    def prompt_single_select(self, attribute_name, options) -> str:
        titled_options = [option.title() for option in options]
        result = ", ".join(titled_options)
        
        return f"{attribute_name.title()}: Select the most appropriate option from: {result}."

    def prompt_number(self, attribute_name, unit=None) -> str:
        prompt = f"{attribute_name.title()}: Generate a number"
        
        if unit:
            prompt += f", with unit: {unit}"

        prompt += "." # always end with a period.

        return prompt 

    def prompt_short_text(self, attribute_name) -> str:
        return f"{attribute_name.title()}: Generate short text (shorter than 50 characters)."

    def prompt_long_text(self, attribute_name) -> str:
        return f"{attribute_name.title()}: Generate a complete and detailed textual response. The length should be at least 200 words."

    def generate_prompt(self) -> str:
        prompt = ""
        for index, attribute in enumerate(self.list_of_attributes):
            attribute_type = attribute.get("type").lower()
            attribute_name = attribute.get("name")

            prompt += f"{index + 1}. "

            if attribute_type == "measure":
                prompt += self.prompt_measure(attribute_name, attribute.get("unit"))
            elif attribute_type == "multiple_values":
                prompt += self.prompt_multiple_values(attribute_name)
            elif attribute_type == "rich_text":
                prompt += self.prompt_rich_text(attribute_name)
            elif attribute_type == "single_select":
                prompt += self.prompt_single_select(attribute_name, attribute.get("options"))
            elif attribute_type == "number":
                prompt += self.prompt_number(attribute_name, attribute.get("unit"))
            elif attribute_type == "short_text":
                prompt += self.prompt_short_text(attribute_name)
            elif attribute_type == "long_text":
                prompt += self.prompt_long_text(attribute_name)
            else:
                prompt += f"{attribute_name}"

            prompt += "\n" 

        return prompt