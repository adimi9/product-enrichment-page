import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductNameInput from './product/input/ProductNameInput';
import BrandInput from './product/input/BrandInput';
import BarcodeInput from './product/input/BarcodeInput';
import ImageUpload from './product/input/ImageInput';
import { Product } from '@/model/ProductData';
import { initializeAttributes } from '@/model/Attributes';
import { uploadFileToS3 } from '@/config/s3';  // Import the function that handles the S3 upload

interface CreateProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState<Product>({
    id: '',
    product_name: '',
    brand: '',
    barcode: '',
    images: [],
    isEnriched: false,
    attributes: initializeAttributes(),
  });

  const apiUrl = import.meta.env.VITE_API_URL; 

  console.log("Initial formData:", formData);


  // Handle image file upload to S3
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const imageUrls: string[] = [];

      // Upload each file to S3
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        try {
          const imageUrl = await uploadFileToS3(file); // Upload the file to S3
          imageUrls.push(imageUrl); // Collect the URLs
        } catch (error) {
          toast.error(`Failed to upload ${file.name}`);
        }
      }

      // Update formData with the new image URLs
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls],
      }));
    }
  };

  const handleImageLinkUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, url],
    }));
  };

  const handleRemoveImage = (imageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(image => image !== imageToRemove), // Remove the image by matching the URL
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;

    console.log(`Changing input field ${field} to:`, value); // Log the field being changed and the new value
  
    setFormData(prev => ({
      ...prev,
      [field]: value, // Update only the product-level field (name, brand, barcode, etc.)
    }));
  };

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      barcode: e.target.value,
    }));
  };

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      product_name: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Log form data before submission
    console.log("Form submit data before validation:", formData);
  
    // Validate required fields
    if (!formData.product_name.trim() || !formData.brand.trim()) {
      toast.error("Product name and brand are required");
      return;
    }
  
    // Map the attributes object to match the backend model
    const mappedAttributes = Object.keys(formData.attributes).reduce((acc, key) => {
      const attribute = formData.attributes[key];
  
      // Create an attribute object for each key (colour, height, etc.)
      acc[key] = {
        label: key,               // Set the key as the label
        value: attribute.value,   // Use the value from the form
        type: attribute.type || "text", // Default to "text" if not provided
        unit: attribute.unit || null,  // Set the unit (could be null)
        options: attribute.options || [], // Default to an empty array for options
      };
  
      return acc;
    }, {});
  
    // Create the final product object
    const product = {
      product_name: formData.product_name,
      brand: formData.brand,
      barcode: formData.barcode,
      images: formData.images,
      isEnriched: formData.isEnriched,
      attributes: mappedAttributes, // Use the mapped attributes here
    };
  
    console.log("Product object to be sent to API:", product); // Log the final product object to be sent
  
    try {
      const token = localStorage.getItem("access_token");
  
      const res = await fetch(`${apiUrl}/api/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.log('Error:', errorData);
        throw new Error("Failed to create product");
      }
  
      toast.success("Product created! (Please refresh the page to see updates)");
      setFormData({
        id: '',
        product_name: '',
        brand: '',
        barcode: '',
        images: [],
        isEnriched: false,
        attributes: initializeAttributes(),
      });
      onOpenChange(false);
    } catch (err) {
      toast.error("Something went wrong while creating the product.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <ProductNameInput productName={formData.product_name} onChange={(e) => handleInputChange(e, "product_name")} />
          <BrandInput brand={formData.brand} onChange={(e) => handleInputChange(e, "brand")} />
          <BarcodeInput barcode={formData.barcode} onChange={(e) => handleInputChange(e, "barcode")} />
          <ImageUpload images={formData.images} onImageUpload={handleImageUpload} onLinkUpload={handleImageLinkUpload} onRemoveImage={handleRemoveImage}/>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
              Create Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
