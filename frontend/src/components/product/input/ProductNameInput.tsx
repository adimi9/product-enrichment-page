import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductNameInputProps {
  productName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductNameInput: React.FC<ProductNameInputProps> = ({ productName, onChange }) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="product_name" className="font-medium">
        Product Name *
      </Label>
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
