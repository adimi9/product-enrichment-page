/**
 * @file renderAllColumnsHeader.tsx
 * @description Renders the header row for the product table, including dynamic columns based on attributes.
 * Ensures equal width for all attribute columns before enrichment.
 */

import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Image as ImageIcon, Barcode } from "lucide-react";
import { productAttributes } from "@/model/Attributes";
import { AttributeTypeMeta } from "@/model/AttributeTypes";
import { Checkbox } from "@/components/ui/checkbox";

// Function to render the header row of the product table
export const renderAllColumnsHeader = (
  selectAll: boolean, // Boolean indicating if all products are selected
  handleSelectAll: () => void, // Function to handle the "select all" action
  hasEnrichment: boolean // Flag to control column width depending on enrichment status
) => (
  <TableHeader className="bg-white">
    <TableRow className="border-b border-slate-200">
      {/* Checkbox column for selecting all products */}
      <TableHead className="w-12 whitespace-nowrap bg-white z-10 py-3 px-3">
        <Checkbox
          checked={selectAll} // Check if all products are selected
          onCheckedChange={handleSelectAll} // Trigger the select all handler
          aria-label="Select all" // Accessibility label for the checkbox
        />
      </TableHead>

      {/* Image column header */}
      <TableHead className="w-24 whitespace-nowrap bg-white z-10 font-medium text-slate-700 text-center">
        <div className="flex items-center justify-center">
          <ImageIcon className="h-4 w-4 mr-1" /> {/* Image icon */}
          <span>Images</span>
        </div>
      </TableHead>

      {/* Barcode column header */}
      <TableHead className="w-24 whitespace-nowrap bg-white z-10 font-medium text-slate-700 text-center">
        <div className="flex items-center justify-center">
          <Barcode className="h-4 w-4 mr-1" /> {/* Barcode icon */}
          <span>Barcode</span>
        </div>
      </TableHead>

      {/* Static columns for product name, brand, and enrichment status */}
      <TableHead className="w-60 whitespace-nowrap bg-white z-10 font-medium text-slate-700">
        Product Name
      </TableHead>
      <TableHead className="w-48 whitespace-nowrap bg-white z-10 font-medium text-slate-700">
        Product Brand
      </TableHead>
      <TableHead className="w-40 whitespace-nowrap bg-white z-10 font-medium text-slate-700 text-center">
        Enrichment Status
      </TableHead>

      {/* Dynamic columns based on product attributes */}
      {productAttributes.map((attr) => (
        <TableHead
          key={attr.key} // Unique key for each attribute column
          className="whitespace-nowrap font-medium text-slate-700 text-center"
          style={{
            // Set the minimum width for attribute columns depending on enrichment state
            minWidth: hasEnrichment ? AttributeTypeMeta[attr.type].defaultWidth : "120px", // Fixed size before enrichment
            width: hasEnrichment ? undefined : "120px", // Fixed size for attributes before enrichment
          }}
        >
          {attr.name} {/* Display the attribute name */}
          {attr.unit ? ` (${attr.unit})` : ""} {/* Display unit if available */}
        </TableHead>
      ))}
    </TableRow>
  </TableHeader>
);
