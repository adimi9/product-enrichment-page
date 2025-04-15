import React from 'react';

interface RichTextCellProps {
  value: string;
}

const RichTextCell: React.FC<RichTextCellProps> = ({ value }) => {
  const isEmpty = !value || value.trim() === '-' || value.trim() === '';

  if (isEmpty) {
    return <div className="text-sm text-gray-500">-</div>;
  }

  return (
    <div
      className="text-sm text-gray-700 max-h-40 overflow-auto p-1 rounded"
      style={{ backgroundColor: 'transparent' }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

export default RichTextCell;
