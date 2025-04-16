/** 
 * @file ShortTextCell.tsx 
 * @description A React component that displays a short text value inside a cell.
 * It renders the text in a styled container with specific text size and color.
 */

interface ShortTextCellProps {
  value: string;  // The short text value to display
}

// ShortTextCell component definition
export const ShortTextCell: React.FC<ShortTextCellProps> = ({ value }) => {
  return (
    // Render the short text inside a styled container
    <div className="text-sm text-gray-700">
      {value}  {/* Display the text value */}
    </div>
  );
};
