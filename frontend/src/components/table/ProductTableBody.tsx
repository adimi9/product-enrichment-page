/**
 * @file RenderAllColumnsBody.tsx
 * @description Renders the body of a table with dynamic content based on product attributes, including selection checkboxes, product details, and custom attribute cells.
 */

import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Product } from "@/model/ProductData";
import { Checkbox } from "@/components/ui/checkbox";
import ImageCell from "./cells/ImageCell";
import BarcodeCell from "./cells/BarcodeCell";
import NameCell from "./cells/NameCell";
import BrandCell from "./cells/BrandCell";
import EnrichmentStatusCell from "./cells/EnrichmentStatusCell";
import { ShortTextCell } from "./cells/ShortTextCell";
import { MeasureCell } from "./cells/MeasureCell";
import MultipleValuesCell from "./cells/MultipleValuesCell";
import RichTextCell from "./cells/RichTextCell";
import { SingleSelectCell } from "./cells/SingleSelectCell";
import { productAttributes } from "@/model/Attributes";

export const renderAllColumnsBody = (
  products: Product[], // Array of products to display
  selectedProductIds: string[], // List of selected product IDs
  isProductSelected: (id: string) => boolean, // Function to check if a product is selected
  toggleProductSelection: (id: string) => void, // Function to toggle product selection
  handleEnrichSingle: (productId: string) => void // Function to trigger enrichment for a single product
) => (
  <TableBody>
    {products.length === 0 ? (
      // No products available, show a placeholder row
      <TableRow>
        <TableCell colSpan={16} className="text-center py-10 text-muted-foreground">
          No products found
        </TableCell>
      </TableRow>
    ) : (
      // Map through products to render each row
      products.map((product: Product) => (
        <TableRow key={`all-${product.id}`} className="hover:bg-slate-50">
          {/* Checkbox for selecting products */}
          <TableCell className="py-3 px-3">
            <Checkbox
              checked={isProductSelected(product.id)} // Check if the product is selected
              onCheckedChange={() => toggleProductSelection(product.id)} // Toggle product selection
              aria-label={`Select ${product.product_name}`} // Accessibility label
            />
          </TableCell>

          {/* Image cell displaying the product image */}
          <ImageCell images={product.images} />

          {/* Barcode cell displaying the product barcode */}
          <BarcodeCell barcode={product.barcode} />

          {/* Name cell displaying the product name */}
          <NameCell productName={product.product_name} />

          {/* Brand cell displaying the product brand */}
          <BrandCell brand={product.brand} />

          {/* Enrichment status cell displaying enrichment state and action */}
          <EnrichmentStatusCell
            isEnriched={product.isEnriched} // Check if product is enriched
            onEnrich={() => handleEnrichSingle(product.id)} // Trigger enrichment action
          />

          {/* Dynamic rendering of attribute cells */}
          {product.attributes && Object.entries(product.attributes).map(([key, { value, unit, options }]) => {
            const attribute = productAttributes.find(attr => attr.key === key); // Find the attribute metadata by key
            if (!attribute) return null; // Return null if attribute is not found

            // Render different cell types based on the attribute type
            switch (attribute.type) {
              case "measure":
                return (
                  <TableCell key={key} className="py-3 px-3">
                    <MeasureCell value={String(value)} unit={unit} /> {/* Render measure cell */}
                  </TableCell>
                );
              case "multiple_values":
                return (
                  <TableCell key={key} className="py-3 px-3">
                    <MultipleValuesCell values={Array.isArray(value) ? value : [String(value)]} /> {/* Render multiple values cell */}
                  </TableCell>
                );
              case "rich_text":
                return (
                  <TableCell key={key} className="py-3 px-3">
                    <RichTextCell value={String(value)} /> {/* Render rich text cell */}
                  </TableCell>
                );
              case "single_select":
                return (
                  <TableCell key={key} className="py-3 px-3">
                    <SingleSelectCell value={String(value)} options={options} /> {/* Render single select cell */}
                  </TableCell>
                );
              case "short_text":
                return (
                  <TableCell key={key} className="py-3 px-3">
                    <ShortTextCell value={String(value)} /> {/* Render short text cell */}
                  </TableCell>
                );
              default:
                return (
                  <TableCell key={key} className="py-3 px-3">
                    <div>{value}</div> {/* Render default cell for unknown types */}
                  </TableCell>
                );
            }
          })}
        </TableRow>
      ))
    )}
  </TableBody>
);