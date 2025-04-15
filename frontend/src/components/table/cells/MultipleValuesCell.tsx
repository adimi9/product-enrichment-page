/** 
 * @file MultipleValuesCell.tsx 
 * @description A React component that displays multiple values in a cell, handling empty or invalid values.
 * It shows a list of values or a placeholder "-" when no valid values are available.
 */

import React from 'react';

interface MultipleValuesCellProps {
  values: string[];  // Array of values to display
}

// MultipleValuesCell component definition
const MultipleValuesCell: React.FC<MultipleValuesCellProps> = ({ values }) => {
  // Check if the values array is empty or contains invalid data
  const isEmpty =
    !values ||  // Check if values is falsy (null, undefined, etc.)
    values.length === 0 ||  // Check if there are no values
    (values.length === 1 && values[0].trim() === '-');  // Check if there's only a single value that is just a hyphen (placeholder)

  // If the values array is empty or invalid, render a placeholder
  if (isEmpty) {
    return <div className="text-sm text-gray-500">-</div>;
  }

  // If there are valid values, display them in a list
  return (
    <div
      className="space-y-1 text-sm text-gray-700 max-h-40 overflow-auto p-1 rounded"
      style={{ backgroundColor: 'transparent' }}  // Transparent background for the container
    >
      {/* Map over the values array and render each value in a separate <div> */}
      {values.map((value, index) => (
        <div key={index}>{value}</div>  // Use the index as the key for each value
      ))}
    </div>
  );
};

export default MultipleValuesCell;
