/** 
 * @file BarcodeCell.tsx 
 * @description A React component to display the product barcode inside a table cell.
 * If no barcode is provided, it displays a placeholder dash.
 */

import { TableCell } from "@/components/ui/table"; // Import TableCell for table rendering

// Define the properties expected by the BarcodeCell component
interface BarcodeCellProps {
  barcode: string | null;  // Barcode can either be a string or null
}

// BarcodeCell component definition
const BarcodeCell: React.FC<BarcodeCellProps> = ({ barcode }) => (
  // Render the barcode inside a TableCell, centered and styled appropriately
  <TableCell className="text-center text-slate-600">
    {/* Display the barcode or a placeholder dash if the barcode is null */}
    {barcode || <span className="text-gray-400">-</span>}
  </TableCell>
);

export default BarcodeCell;
