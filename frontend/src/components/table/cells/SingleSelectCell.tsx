interface SingleSelectCellProps {
    value: string;
    options: string[];
  }
  
  export const SingleSelectCell: React.FC<SingleSelectCellProps> = ({ value, options }) => {
    return (
      <div className="text-sm text-gray-700">
        {value || options}
      </div>
    );
  };
  