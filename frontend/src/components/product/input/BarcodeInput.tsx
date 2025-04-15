import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BarcodeInputProps {
  barcode: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BarcodeInput: React.FC<BarcodeInputProps> = ({ barcode, onChange }) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="barcode" className="font-medium">
        Product Barcode
      </Label>
      <Input
        id="barcode"
        name="barcode"
        placeholder="Enter barcode (optional)"
        value={barcode || ''}
        onChange={onChange}
      />
    </div>
  );
};

export default BarcodeInput;
