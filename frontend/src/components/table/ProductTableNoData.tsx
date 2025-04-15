import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export const renderNoProductsFound = () => (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full p-20 h-[300px] flex items-center justify-center">
        <Table className="w-full">
          <TableBody>
            <TableRow className="h-[300px] hover:bg-transparent">
              <TableCell colSpan={10} className="text-center py-10">
                No products found.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
  