/**
 * @file BarcodeInput.tsx
 * @description Input component for entering a product barcode.
 */

import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Props for the BarcodeInput component
interface BarcodeInputProps {
  barcode: string; // Current barcode value
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Callback to handle input change
}

const BarcodeInput: React.FC<BarcodeInputProps> = ({ barcode, onChange }) => {
  return (
    <div className="grid gap-2">
      {/* Label for the barcode input */}
      <Label htmlFor="barcode" className="font-medium">
        Product Barcode
      </Label>

      {/* Barcode input field */}
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
