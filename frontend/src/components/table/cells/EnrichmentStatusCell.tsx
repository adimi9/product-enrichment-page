import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import React, { useEffect } from "react";

interface EnrichmentStatusCellProps {
  isEnriched: boolean;
  onEnrich: () => void;
}

const EnrichmentStatusCell: React.FC<EnrichmentStatusCellProps> = ({ isEnriched, onEnrich }) => {
  useEffect(() => {
    console.log("isEnriched value:", isEnriched);
  }, [isEnriched]);

  return (
    <TableCell className="text-center">
      <div className="flex items-center justify-center gap-2">
        {isEnriched ? (
          <>
            <Wand2 className="w-5 h-5 text-primary" />
            <span className="text-sm">Enriched</span>
          </>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            className="flex items-center gap-1 p-1 hover:bg-slate-100"
            onClick={onEnrich}
          >
            <Wand2 className="w-5 h-5" />
            <span className="text-sm">Not Enriched</span>
          </Button>
        )}
      </div>
    </TableCell>
  );
};

export default EnrichmentStatusCell;