/**
 * @file ProductActions.tsx
 * @description Component for rendering actions for selected products, including enriching and deleting.
 */

import { Button } from "@/components/ui/button"; // Import Button component
import { Wand2 } from "lucide-react"; // Import Wand2 icon for enrich action

// Define the ProductActions component with props for handling actions and selected product IDs
export const ProductActions = ({ handleEnrichSelected, handleDeleteSelected, selectedProductIds }) => (
  <div className="flex space-x-2 pt-2">
    {/* Button for enriching selected products */}
    <Button onClick={handleEnrichSelected} className="bg-primary hover:bg-primary/90 text-white">
      <Wand2 className="mr-2 h-4 w-4" /> {/* Icon for the enrich action */}
      Enrich Selected ({selectedProductIds.length}) {/* Display the count of selected products */}
    </Button>

    {/* Button for deleting selected products */}
    <Button onClick={handleDeleteSelected} variant="destructive">
      Delete Selected ({selectedProductIds.length}) {/* Display the count of selected products */}
    </Button>
  </div>
);
