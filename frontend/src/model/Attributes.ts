/** 
 * @file 
 * @description Defines attribute types for products, initializes product attributes with default values, 
 * and provides requirements for each attribute based on its type and options.
 */

import { AttributeType } from "./AttributeTypes"; // Importing the AttributeType type definition

// Type definition for an attribute (name, key, type, unit, options)
export type AttributeDefinition = {
  name: string;        // Name of the attribute
  key: string;         // Unique key to identify the attribute
  type: AttributeType; // Type of the attribute (e.g., "measure", "short_text", etc.)
  unit?: string;       // Unit of measurement (optional)
  options?: string[];  // Options for attributes like "single_select" or "multiple_values" (optional)
};

// List of product attributes with their properties
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
    let defaultValue: any; // Default value for the attribute
    let requirements: string[] = []; // Requirements for the attribute (e.g., unit, options)

    // Set default value based on the attribute type
    switch (attribute.type) {
      case "measure":
      case "number":
        defaultValue = "-"; // Default value for "measure" or "number" type is a placeholder "-"
        break;
      case "multiple_values":
        defaultValue = ["-"]; // Default value for "multiple_values" is an array with a placeholder "-"
        break;
      case "rich_text":
        defaultValue = "-"; // Default value for "rich_text" is a placeholder "-"
        break;
      case "single_select":
        defaultValue = "-"; // Default value for "single_select" is a placeholder "-"
        break;
      case "short_text":
        defaultValue = "-"; // Default value for "short_text" is a placeholder "-"
        break;
      default:
        defaultValue = "-"; // Fallback default value in case of an unknown type
    }

    // Retrieve additional requirements based on the attribute's options
    if (attribute.options) {
      requirements = [`Select one of the following options: ${attribute.options.join(", ")}`]; // List available options for "single_select" or "multiple_values"
    }

    // Add requirements for attributes like "measure" that have a unit
    if (attribute.unit) {
      requirements.push(`Please specify a value in ${attribute.unit}`); // Add unit requirement
    }

    // Construct the attribute object with value, type, options, unit, and requirements
    acc[attribute.key] = {
      name: attribute.name,         // Attribute Name (from `name`)
      value: defaultValue,          // Default value based on attribute type
      type: attribute.type,         // Attribute type (e.g., "measure", "short_text", etc.)
      unit: attribute.unit,         // Attribute unit (if any)
      options: attribute.options || [], // Attribute options (if any, otherwise an empty array)
      requirements: requirements,   // Requirements (if any)
    };

    return acc; // Return the accumulated attributes object
  }, {} as Record<string, any>); // Initialize the accumulator as an empty object
};
