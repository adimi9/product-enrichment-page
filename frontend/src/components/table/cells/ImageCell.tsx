import { TableCell } from "@/components/ui/table";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

interface ImageCellProps {
  images: string[];
}

const ImageCell: React.FC<ImageCellProps> = ({ images }) => {
  const [showMore, setShowMore] = useState(false);

  const handleToggleImages = () => setShowMore(prev => !prev);  // Toggle between showing more or less

  return (
    <TableCell className="text-center">
      {images && images.length > 0 ? (
        <div className="flex flex-col items-center space-y-2">
          {/* Display first image (always shown) */}
          <img
            src={images[0]}
            alt="Product 1"
            className="w-full h-auto max-w-[200px] object-contain" // Ensures image fits cell without cropping
          />

          {/* Show more images if available */}
          {showMore && images.slice(1).map((img, idx) => (
            <img
              key={idx + 1}
              src={img}
              alt={`Product ${idx + 2}`}
              className="w-full h-auto max-w-[200px] object-contain"
            />
          ))}

          {/* Show "More" or "Less" button based on the current state */}
          {images.length > 1 && (
            <button
              onClick={handleToggleImages}
              className="text-blue-500 text-xs mt-2"
            >
              {showMore ? "Show less" : `+ ${images.length - 1} more`}
            </button>
          )}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-gray-400" />
        </div>
      )}
    </TableCell>
  );
};

export default ImageCell;
