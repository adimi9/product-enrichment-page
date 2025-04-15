/** 
 * @file ImageCell.tsx 
 * @description A React component that displays a list of images in a table cell.
 * It shows the first image and optionally toggles to display more images when clicked.
 */

import { TableCell } from "@/components/ui/table";  // Import TableCell component from the UI library
import { ImageIcon } from "lucide-react";  // Import ImageIcon from lucide-react for a fallback icon
import { useState } from "react";  // Import useState hook from React

// Define the props type for the ImageCell component
interface ImageCellProps {
  images: string[];  // Array of image URLs to display
}

// ImageCell component definition
const ImageCell: React.FC<ImageCellProps> = ({ images }) => {
  const [showMore, setShowMore] = useState(false);  // State to track whether to show more images

  // Toggle between showing more or fewer images
  const handleToggleImages = () => setShowMore((prev) => !prev);

  return (
    <TableCell className="text-center">
      {/* Check if there are any images to display */}
      {images && images.length > 0 ? (
        <div className="flex flex-col items-center space-y-2">
          {/* Display the first image (always shown) */}
          <img
            src={images[0]}
            alt="Product 1"
            className="w-full h-auto max-w-[200px] object-contain" // Ensures image fits cell without cropping
          />

          {/* Show additional images if 'showMore' is true */}
          {showMore &&
            images.slice(1).map((img, idx) => (
              <img
                key={idx + 1}  // Use the index to generate a unique key for each image
                src={img}
                alt={`Product ${idx + 2}`}  // Dynamic alt text for additional images
                className="w-full h-auto max-w-[200px] object-contain"  // Ensures images fit properly in the table cell
              />
            ))}

          {/* Conditionally render a button to toggle more or fewer images */}
          {images.length > 1 && (
            <button
              onClick={handleToggleImages}  // Toggle the 'showMore' state when clicked
              className="text-blue-500 text-xs mt-2"
            >
              {/* Change button text based on the 'showMore' state */}
              {showMore ? "Show less" : `+ ${images.length - 1} more`}
            </button>
          )}
        </div>
      ) : (
        // Fallback icon when no images are available
        <div className="w-full flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-gray-400" />
        </div>
      )}
    </TableCell>
  );
};

export default ImageCell;
