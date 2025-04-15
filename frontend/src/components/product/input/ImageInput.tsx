import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

interface ImageUploadProps {
  images: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLinkUpload: (url: string) => void;
  onRemoveImage: (image: string) => void; // Function for removing an image
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, onImageUpload, onLinkUpload, onRemoveImage }) => {
  const [link, setLink] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file'); // Track the upload method

  const handleLinkSubmit = () => {
    if (!link.trim()) {
      toast.error("Please enter a valid image URL.");
      return;
    }

    const isValid = /\.(jpeg|jpg|png|gif|webp)$/.test(link);
    if (!isValid) {
      toast.error("Please enter a valid image link ending in .jpg, .png, .gif, etc.");
      return;
    }

    onLinkUpload(link);
    setLink(''); // Clear the input after submission
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLinkSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="uploadMethod" className="font-medium">
        Choose Image Upload Method
      </Label>
      <div className="flex items-center gap-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="uploadMethod"
            value="file"
            checked={uploadMethod === 'file'}
            onChange={() => setUploadMethod('file')}
            className="text-blue-600"
          />
          <span>Upload Image File</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="uploadMethod"
            value="url"
            checked={uploadMethod === 'url'}
            onChange={() => setUploadMethod('url')}
            className="text-blue-600"
          />
          <span>Use Image URL</span>
        </label>
      </div>

      {/* Conditionally render the input fields based on the selected upload method */}
      {uploadMethod === 'file' ? (
        <div className="flex items-center space-x-4">
          <label htmlFor="images" className="cursor-pointer bg-blue-100 hover:bg-blue-200 py-2 px-4 rounded-md shadow-md text-blue-600">
            Choose Files
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={onImageUpload} // Handle file upload
              className="hidden"
            />
          </label>
          <span className="text-sm text-gray-500">PNG, JPG, GIF</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2 mt-4">
          <Input
            type="text"
            placeholder="Paste image URL"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 py-2 px-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={handleLinkSubmit} // Handle URL upload
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      )}

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`product-image-${index}`} className="w-32 h-32 object-cover rounded-md shadow-sm" />
              <button
                type="button"
                onClick={() => onRemoveImage(image)} // Remove image when clicked
                className="absolute top-0 right-0 p-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
