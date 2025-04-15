// src/model/attributes.ts

import { AttributeType } from "./AttributeTypes";

export type AttributeDefinition = {
  name: string;
  key: string;
  type: AttributeType;
  unit?: string;
  options?: string[];
};

export const productAttributes: AttributeDefinition[] = [
  { name: "Item Weight", key: "item_weight", type: "measure", unit: "G" },
  { name: "Ingredients", key: "ingredients", type: "multiple_values" },
  { name: "Product Description", key: "product_description", type: "rich_text" },
  { name: "Storage Requirements", key: "storage_requirements", type: "single_select", options: ["Dry Storage", "Deep Frozen", "Ambient Storage", "Frozen Food Storage"] },
  { name: "Items per Package", key: "items_per_package", type: "number" },
  { name: "Colour", key: "colour", type: "short_text" },
  { name: "Material", key: "material", type: "short_text" },
  { name: "Width", key: "width", type: "measure", unit: "CM" },
  { name: "Height", key: "height", type: "measure", unit: "CM" },
  { name: "Warranty", key: "warranty", type: "number", unit: "Year" }
];

// Initialize product attributes with default values and metadata
export const initializeAttributes = () => {
  return productAttributes.reduce((acc, attribute) => {
    let defaultValue: any;
    let requirements: string[] = [];
    
    // Set default value based on attribute type
    switch (attribute.type) {
      case "measure":
      case "number":
        defaultValue = "-";
        break;
      case "multiple_values":
        defaultValue = ["-"];
        break;
      case "rich_text":
        defaultValue = "-";
        break;
      case "single_select":
        defaultValue = "-";
        break;
      case "short_text":
        defaultValue = "-";
        break;
      default:
        defaultValue = "-";
    }

    // Retrieve requirements based on the attribute type
    if (attribute.options) {
      requirements = [`Select one of the following options: ${attribute.options.join(", ")}`];
    }

    // Add requirements for attributes like "measure"
    if (attribute.unit) {
      requirements.push(`Please specify a value in ${attribute.unit}`);
    }

    // Construct attribute object with value, type, options, unit, and requirements
    acc[attribute.key] = {
      name: attribute.name,      // Attribute Name (from `name`)
      value: defaultValue,       // Default value
      type: attribute.type,      // Attribute type (e.g., "measure", "short_text", etc.)
      unit: attribute.unit,      // Attribute unit (if any)
      options: attribute.options || [],  // Options (if any, otherwise empty array)
      requirements: requirements,  // Attribute requirements
    };

    return acc;
  }, {} as Record<string, any>);
};
