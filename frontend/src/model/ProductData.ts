/** 
 * @file 
 * @description Defines the `ProductAttribute` and `Product` types for modeling product data.
 * The `ProductAttribute` type represents individual attributes of a product, 
 * while the `Product` type represents a product with its attributes and other properties.
 */

import { AttributeType } from "./AttributeTypes"; // Importing the AttributeType for type safety

// Simplified representation of a product attribute (without description)
export type ProductAttribute = {
  type: AttributeType;          // The type of the attribute (e.g., "measure", "short_text", etc.)
  value?: string | number | string[] | null; // The value of the attribute (can be a string, number, array of strings, or null)
  unit?: string | null;         // The unit of the attribute (optional, can be null)
  options?: string[] | null;    // Options for the attribute (optional, can be null)
};

// Representation of a product with its attributes and other properties
export type Product = {
  id: string;                  // Unique identifier for the product
  product_name: string;        // Name of the product
  brand: string;               // Brand of the product
  barcode?: string;            // Barcode of the product (optional)
  images?: string[];           // List of image URLs for the product (optional)
  isEnriched?: boolean;        // Flag indicating whether the product has enriched data (optional)
  attributes: Record<string, ProductAttribute>; // A record of product attributes, where keys are attribute keys and values are of type `ProductAttribute`
};
