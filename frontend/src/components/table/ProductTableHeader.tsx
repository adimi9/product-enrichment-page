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

export const renderAllColumnsHeader = (
  selectAll: boolean,
  handleSelectAll: () => void,
  hasEnrichment: boolean // 👈 added prop to control column sizing
) => (
  <TableHeader className="bg-white">
    <TableRow className="border-b border-slate-200">
      <TableHead className="w-12 whitespace-nowrap bg-white z-10 py-3 px-3">
        <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} aria-label="Select all" />
      </TableHead>

      <TableHead className="w-24 whitespace-nowrap bg-white z-10 font-medium text-slate-700 text-center">
        <div className="flex items-center justify-center">
          <ImageIcon className="h-4 w-4 mr-1" />
          <span>Images</span>
        </div>
      </TableHead>

      <TableHead className="w-24 whitespace-nowrap bg-white z-10 font-medium text-slate-700 text-center">
        <div className="flex items-center justify-center">
          <Barcode className="h-4 w-4 mr-1" />
          <span>Barcode</span>
        </div>
      </TableHead>

      <TableHead className="w-60 whitespace-nowrap bg-white z-10 font-medium text-slate-700">Product Name</TableHead>
      <TableHead className="w-48 whitespace-nowrap bg-white z-10 font-medium text-slate-700">Product Brand</TableHead>
      <TableHead className="w-40 whitespace-nowrap bg-white z-10 font-medium text-slate-700 text-center">Enrichment Status</TableHead>

      {productAttributes.map((attr) => (
        <TableHead
          key={attr.key}
          className={`whitespace-nowrap font-medium text-slate-700 text-center`}
          style={{
            minWidth: hasEnrichment ? AttributeTypeMeta[attr.type].defaultWidth : "120px", // fixed size pre-enrichment
            width: hasEnrichment ? undefined : "120px",
          }}
        >
          {attr.name}{attr.unit ? ` (${attr.unit})` : ""}
        </TableHead>
      ))}
    </TableRow>
  </TableHeader>
);
