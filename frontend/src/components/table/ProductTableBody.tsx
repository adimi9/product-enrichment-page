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
  products: Product[],
  selectedProductIds: string[],
  isProductSelected: (id: string) => boolean,
  toggleProductSelection: (id: string) => void,
  handleEnrichSingle: (productId: string) => void
) => (
  <TableBody>
    {products.length === 0 ? (
      <TableRow>
        <TableCell colSpan={16} className="text-center py-10 text-muted-foreground">
        </TableCell>
      </TableRow>
    ) : (
      products.map((product: Product) => (
        <TableRow key={`all-${product.id}`} className="hover:bg-slate-50">
          <TableCell className="py-3 px-3">
            <Checkbox
              checked={isProductSelected(product.id)}
              onCheckedChange={() => toggleProductSelection(product.id)}
              aria-label={`Select ${product.product_name}`}
            />
          </TableCell>

          {/* ImageCell */}
          <ImageCell images={product.images} />

          {/* BarcodeCell */}
          <BarcodeCell barcode={product.barcode} />

          {/* NameCell */}
          <NameCell productName={product.product_name} />

          {/* BrandCell */}
          <BrandCell brand={product.brand} />

          {/* EnrichmentStatusCell */}
          <EnrichmentStatusCell
            isEnriched={product.isEnriched}
            onEnrich={() => handleEnrichSingle(product.id)}
          />
          {/* Dynamic Attributes Cells */}
          {product.attributes && Object.entries(product.attributes).map(([key, { value, unit, options }]) => {
            // Determine which component to render based on attribute type
            const attribute = productAttributes.find(attr => attr.key === key);
            if (!attribute) return null;

            switch (attribute.type) {
              case "measure":
                return (
                  <TableCell key={key} className="py-3 px-3">
                    <MeasureCell value={String(value)} unit={unit} />
                  </TableCell>
                );
              case "multiple_values":
                return (
                  <TableCell key={key} className="py-3 px-3">
                    <MultipleValuesCell values={
                        Array.isArray(value) ? value : [String(value)]
                    } />
                  </TableCell>
                );
              case "rich_text":
                return (
                  <TableCell key={key} className="py-3 px-3">
                    <RichTextCell value={String(value)} />
                  </TableCell>
                );
              case "single_select":
                return (
                  <TableCell key={key} className="py-3 px-3">
                    <SingleSelectCell value={String(value)} options={options} />
                  </TableCell>
                );
              case "short_text":
                return (
                  <TableCell key={key} className="py-3 px-3">
                    <ShortTextCell value={String(value)} />
                  </TableCell>
                );
              default:
                return (
                  <TableCell key={key} className="py-3 px-3">
                    <div>{value}</div>
                  </TableCell>
                );
            }
          })}
        </TableRow>
      ))
    )}
  </TableBody>
);