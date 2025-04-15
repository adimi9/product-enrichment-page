/** 
 * @file SingleSelectCell.tsx 
 * @description A React component that displays a selected value or options for a single select in a cell.
 * It renders the selected value, or if it's empty, it shows the available options.
 */

interface SingleSelectCellProps {
  value: string;  // The selected value to display
  options: string[];  // List of available options to display if no value is selected
}

// SingleSelectCell component definition
export const SingleSelectCell: React.FC<SingleSelectCellProps> = ({ value, options }) => {
  return (
    <div className="text-sm text-gray-700">
      {/* Display the selected value, or if no value, show the options array */}
      {value || options.join(", ")}  {/* Join the options array into a string separated by commas */}
    </div>
  );
};
