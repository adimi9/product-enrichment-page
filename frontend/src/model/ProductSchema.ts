/**
 * @file ProductSchema.ts
 * @description Defines the full schema of a product entry in the database, including all user and system-generated fields.
 */

import { AttributeType } from "./AttributeTypes";

// complete product schema definition
export type ProductSchema = {
  product_name: string;      // User input (required)
  brand: string;             // User input (required)
  barcode?: string;         // Optional
  images?: string[];        // Optional
  isEnriched: boolean;       // System flag
  attributes: { 
    [key: string]: AttributeValue; // Use a generic type to define any attribute
  };
};

// Define the structure of system-generated attribute's value
export type AttributeValue = {
  type: AttributeType;  // The type of the attribute (e.g., "measure", "multiple_values")
  value: string | string[];  // The actual value(s) of the attribute
  unit?: string;  // Optional unit (only for types like "measure")
  options?: string[];  // Optional options (only for types like "single select"
};
