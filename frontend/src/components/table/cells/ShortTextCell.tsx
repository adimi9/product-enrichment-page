interface ShortTextCellProps {
    value: string;
  }
  
  export const ShortTextCell: React.FC<ShortTextCellProps> = ({ value }) => {
    return (
      <div className="text-sm text-gray-700">
        {value}
      </div>
    );
  };
  