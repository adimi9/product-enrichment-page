import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BrandInputProps {
  brand: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, attributeKey: string) => void;
}

const BrandInput: React.FC<BrandInputProps> = ({ brand, onChange }) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="brand" className="font-medium">
        Product Brand *
      </Label>
      <Input
        id="brand"
        name="brand"
        placeholder="brand"
        value={brand}
        onChange={(e) => onChange(e, "brand")}
        required
      />
    </div>
  );
};

export default BrandInput;
