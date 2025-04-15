/** 
 * @file RichTextCell.tsx 
 * @description A React component that displays a rich text value inside a table cell.
 * It renders the value as HTML and handles empty or invalid values by displaying a placeholder.
 */

import React from 'react';

interface RichTextCellProps {
  value: string;  // The rich text value to display
}

// RichTextCell component definition
const RichTextCell: React.FC<RichTextCellProps> = ({ value }) => {
  // Check if the value is empty, a hyphen, or a string with only spaces
  const isEmpty = !value || value.trim() === '-' || value.trim() === '';

  // If the value is empty or invalid, return a placeholder
  if (isEmpty) {
    return <div className="text-sm text-gray-500">-</div>;
  }

  // If the value is valid, render it as HTML
  return (
    <div
      className="text-sm text-gray-700 max-h-40 overflow-auto p-1 rounded"
      style={{ backgroundColor: 'transparent' }}  // Transparent background for the container
      dangerouslySetInnerHTML={{ __html: value }}  // Render the HTML content from the value
    />
  );
};

export default RichTextCell;
