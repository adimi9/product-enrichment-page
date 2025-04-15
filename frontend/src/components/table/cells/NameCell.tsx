/** 
 * @file NameCell.tsx 
 * @description A React component that displays the product name in a table cell with specific styling.
 */

import { TableCell } from "@/components/ui/table";  // Import TableCell component from the UI library

interface NameCellProps {
  productName: string;  // The product name to display
}

// NameCell component definition
const NameCell: React.FC<NameCellProps> = ({ productName }) => (
  // Render the product name inside a TableCell with custom styling
  <TableCell className="font-medium whitespace-nowrap">
    {productName}  // Display the product name
  </TableCell>
);

export default NameCell;
