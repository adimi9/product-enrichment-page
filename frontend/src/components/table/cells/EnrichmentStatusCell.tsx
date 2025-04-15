/** 
 * @file EnrichmentStatusCell.tsx 
 * @description A React component to display the enrichment status of a product in a table cell.
 * If the product is enriched, it shows an "Enriched" label with an icon. 
 * Otherwise, it displays a "Not Enriched" button to trigger the enrichment process.
 */

import { TableCell } from "@/components/ui/table"; // Import TableCell for table rendering
import { Button } from "@/components/ui/button"; // Import Button component for the "Not Enriched" action
import { Wand2 } from "lucide-react"; // Import Wand2 icon for enrichment visual
import React, { useEffect } from "react"; // Import React and the useEffect hook

// Define the properties expected by the EnrichmentStatusCell component
interface EnrichmentStatusCellProps {
  isEnriched: boolean;  // Boolean to track if the product is enriched
  onEnrich: () => void;  // Function to trigger the enrichment process
}

// EnrichmentStatusCell component definition
const EnrichmentStatusCell: React.FC<EnrichmentStatusCellProps> = ({ isEnriched, onEnrich }) => {
  
  // Log the isEnriched value whenever it changes for debugging purposes
  useEffect(() => {
    console.log("isEnriched value:", isEnriched);
  }, [isEnriched]);

  return (
    <TableCell className="text-center">
      <div className="flex items-center justify-center gap-2">
        {/* Conditional rendering based on enrichment status */}
        {isEnriched ? (
          <>
            {/* Display icon and "Enriched" label if the product is enriched */}
            <Wand2 className="w-5 h-5 text-primary" />
            <span className="text-sm">Enriched</span>
          </>
        ) : (
          // Display button to trigger the enrichment process if not enriched
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
