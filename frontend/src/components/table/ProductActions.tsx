import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

export const ProductActions = ({ handleEnrichSelected, handleDeleteSelected, selectedProductIds }) => (
  <div className="flex space-x-2 pt-2">
    <Button onClick={handleEnrichSelected} className="bg-primary hover:bg-primary/90 text-white">
      <Wand2 className="mr-2 h-4 w-4" />
      Enrich Selected ({selectedProductIds.length})
    </Button>
    <Button onClick={handleDeleteSelected} variant="destructive">
      Delete Selected ({selectedProductIds.length})
    </Button>
  </div>
);
