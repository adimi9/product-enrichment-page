/**
 * @file ProductNameInput.tsx
 * @description Reusable input component for entering the product name in a form.
 */

import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Props type definition for the ProductNameInput component
interface ProductNameInputProps {
  productName: string; // Current product name value
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handler for input change
}

// Functional component definition
const ProductNameInput: React.FC<ProductNameInputProps> = ({ productName, onChange }) => {
  return (
    <div className="grid gap-2">
      {/* Label for the input field */}
      <Label htmlFor="product_name" className="font-medium">
        Product Name *
      </Label>

      {/* Input field for product name */}
      <Input
        id="product_name"
        name="product_name"
        placeholder="Enter product name"
        value={productName}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default ProductNameInput;
