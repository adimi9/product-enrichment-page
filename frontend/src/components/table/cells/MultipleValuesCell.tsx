import React from 'react';

interface MultipleValuesCellProps {
  values: string[];
}

const MultipleValuesCell: React.FC<MultipleValuesCellProps> = ({ values }) => {
  const isEmpty =
    !values ||
    values.length === 0 ||
    (values.length === 1 && values[0].trim() === '-');

  if (isEmpty) {
    return <div className="text-sm text-gray-500">-</div>;
  }

  return (
    <div
      className="space-y-1 text-sm text-gray-700 max-h-40 overflow-auto p-1 rounded"
      style={{ backgroundColor: 'transparent' }}
    >
      {values.map((value, index) => (
        <div key={index}>{value}</div>
      ))}
    </div>
  );
};

export default MultipleValuesCell;
