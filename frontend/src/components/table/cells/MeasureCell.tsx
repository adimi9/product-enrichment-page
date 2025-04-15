/** 
 * @file MeasureCell.tsx 
 * @description A React component that displays a measurement value, optionally with a unit.
 */

interface MeasureCellProps {
  value: string;  // The measurement value to display
  unit?: string;  // Optional unit for the measurement (e.g., "kg", "m", etc.)
}

// MeasureCell component definition
export const MeasureCell: React.FC<MeasureCellProps> = ({ value, unit }) => {
  return (
    <div className="text-sm text-gray-700">
      {/* Display the measurement value */}
      {value}

      {/* Conditionally render the unit if it's provided */}
      {unit && (
        <span className="text-gray-500 text-xs ml-1">{unit}</span>  // Display the unit in smaller, lighter text
      )}
    </div>
  );
};
