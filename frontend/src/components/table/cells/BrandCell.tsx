/** 
 * @file BrandCell.tsx 
 * @description A React component to display the product brand name inside a table cell.
 * It renders the brand name in a table cell with specific styling to ensure no text wrapping.
 */

import { TableCell } from "@/components/ui/table"; // Import TableCell for table rendering

// Define the properties expected by the BrandCell component
interface BrandCellProps {
  brand: string;  // The brand name to display
}

// BrandCell component definition
const BrandCell: React.FC<BrandCellProps> = ({ brand }) => (
  // Render the brand name inside a TableCell with no text wrapping and specific styling
  <TableCell className="whitespace-nowrap text-slate-600">
    {brand}  {/* Display the brand name */}
  </TableCell>
);

export default BrandCell;
