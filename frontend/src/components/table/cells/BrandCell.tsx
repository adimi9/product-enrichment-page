import { TableCell } from "@/components/ui/table";

interface BrandCellProps {
  brand: string;
}

const BrandCell: React.FC<BrandCellProps> = ({ brand }) => (
  <TableCell className="whitespace-nowrap text-slate-600">{brand}</TableCell>
);

export default BrandCell;
