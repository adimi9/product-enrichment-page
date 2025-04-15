/**
 * @file BrandInput.tsx
 * @description Input component for entering the product brand.
 */

import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Props for the BrandInput component
interface BrandInputProps {
  brand: string; // Current brand value
  onChange: (e: React.ChangeEvent<HTMLInputElement>, attributeKey: string) => void; // Callback to update brand
}

const BrandInput: React.FC<BrandInputProps> = ({ brand, onChange }) => {
  return (
    <div className="grid gap-2">
      {/* Label for the brand input */}
      <Label htmlFor="brand" className="font-medium">
        Product Brand *
      </Label>

      {/* Input field for product brand */}
      <Input
        id="brand"
        name="brand"
        placeholder="brand"
        value={brand}
        onChange={(e) => onChange(e, "brand")} // Pass the event and attribute key to parent handler
        required
      />
    </div>
  );
};

export default BrandInput;
