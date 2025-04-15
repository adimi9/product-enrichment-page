// src/model/product.ts

import { AttributeType } from "./AttributeTypes";

// Simplified ProductAttribute without description
export type ProductAttribute = {
  type: AttributeType;
  value?: string | number | string[] | null;
  unit?: string | null;
  options?: string[] | null;
};

export type Product = {
  id: string;
  product_name: string;
  brand: string;
  barcode?: string;
  images?: string[];
  isEnriched?: boolean;
  attributes: Record<string, ProductAttribute>;
};
