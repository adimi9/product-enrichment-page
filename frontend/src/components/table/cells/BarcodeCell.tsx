import { TableCell } from "@/components/ui/table";

interface BarcodeCellProps {
  barcode: string | null;
}

const BarcodeCell: React.FC<BarcodeCellProps> = ({ barcode }) => (
  <TableCell className="text-center text-slate-600">
    {barcode || <span className="text-gray-400">-</span>}
  </TableCell>
);

export default BarcodeCell;
