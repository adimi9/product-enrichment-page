interface MeasureCellProps {
    value: string;
    unit?: string;
  }
  
  export const MeasureCell: React.FC<MeasureCellProps> = ({ value, unit }) => {
    return (
      <div className="text-sm text-gray-700">
        {value}
      </div>
    );
  };
  