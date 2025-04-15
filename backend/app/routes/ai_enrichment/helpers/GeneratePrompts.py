class GeneratePrompts:
    def __init__(self, list_of_attributes):
        """
        Initializes with a list of attributes. 
        Each attribute should be a dictionary with 'name' and 'type'.
        """
        self.list_of_attributes = list_of_attributes

    def prompt_measure(self, attribute_name, unit) -> str:
        """
        Generate a prompt for 'measure' type attributes.
        Example: 'Height: Generate a measurement in the unit cm.'
        
        Args:
            attribute_name (str): The name of the attribute (e.g., 'Height').
            unit (str): The unit of measurement (e.g., 'cm').

        Returns:
            str: A formatted string prompt for measurement.
        """
        return f"{attribute_name.title()}: Generate a measurement in the unit {unit}."

    def prompt_multiple_values(self, attribute_name) -> str:
        """
        Generate a prompt for 'multiple_values' type attributes.
        Example: 'Color: Generate multiple values.'
        
        Args:
            attribute_name (str): The name of the attribute (e.g., 'Color').

        Returns:
            str: A formatted string prompt for multiple values.
        """
        return f"{attribute_name.title()}: Generate multiple values."

    def prompt_rich_text(self, attribute_name) -> str:
        """
        Generate a prompt for 'rich_text' type attributes.
        Example: 'Description: Generate a complete and detailed rich text (HTML) response.'
        
        Args:
            attribute_name (str): The name of the attribute (e.g., 'Description').

        Returns:
            str: A formatted string prompt for rich text.
        """
        return f"{attribute_name.title()}: Generate a complete and detailed rich text (HTML) response. The length should be at least 200 words."

    def prompt_single_select(self, attribute_name, options) -> str:
        """
        Generate a prompt for 'single_select' type attributes with a list of options.
        Example: 'Size: Select the most appropriate option from: Small, Medium, Large.'
        
        Args:
            attribute_name (str): The name of the attribute (e.g., 'Size').
            options (list): A list of available options (e.g., ['Small', 'Medium', 'Large']).

        Returns:
            str: A formatted string prompt for single-select options.
        """
        titled_options = [option.title() for option in options]
        result = ", ".join(titled_options)
        return f"{attribute_name.title()}: Select the most appropriate option from: {result}."

    def prompt_number(self, attribute_name, unit=None) -> str:
        """
        Generate a prompt for 'number' type attributes.
        Example: 'Weight: Generate a number with unit: kg.'
        
        Args:
            attribute_name (str): The name of the attribute (e.g., 'Weight').
            unit (str, optional): The unit of the number (e.g., 'kg'). Defaults to None.

        Returns:
            str: A formatted string prompt for a number.
        """
        prompt = f"{attribute_name.title()}: Generate a number"
        if unit:
            prompt += f", with unit: {unit}"
        prompt += "."  # Always end with a period.
        return prompt

    def prompt_short_text(self, attribute_name) -> str:
        """
        Generate a prompt for 'short_text' type attributes.
        Example: 'Tagline: Generate short text (shorter than 50 characters).'
        
        Args:
            attribute_name (str): The name of the attribute (e.g., 'Tagline').

        Returns:
            str: A formatted string prompt for short text.
        """
        return f"{attribute_name.title()}: Generate short text (shorter than 50 characters)."

    def prompt_long_text(self, attribute_name) -> str:
        """
        Generate a prompt for 'long_text' type attributes.
        Example: 'Description: Generate a complete and detailed textual response.'
        
        Args:
            attribute_name (str): The name of the attribute (e.g., 'Description').

        Returns:
            str: A formatted string prompt for long text.
        """
        return f"{attribute_name.title()}: Generate a complete and detailed textual response. The length should be at least 200 words."

    def generate_prompt(self) -> str:
        """
        Generate a series of prompts for each attribute in the list.
        
        This method generates a prompt for each attribute in the list based on its type 
        and returns the full set of prompts as a single string.

        Returns:
            str: A formatted string containing all generated prompts.
        """
        prompt = ""
        for index, attribute in enumerate(self.list_of_attributes):
            attribute_type = attribute.get("type").lower()
            attribute_name = attribute.get("name")

            # Start with the prompt index
            prompt += f"{index + 1}. "

            # Generate the appropriate prompt based on the attribute type
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

            prompt += "\n"  # Add newline for separation between prompts

        return prompt
