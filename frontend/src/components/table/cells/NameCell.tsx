import { TableCell } from "@/components/ui/table";

interface NameCellProps {
  productName: string;
}

const NameCell: React.FC<NameCellProps> = ({ productName }) => (
  <TableCell className="font-medium whitespace-nowrap">{productName}</TableCell>
);

export default NameCell;
