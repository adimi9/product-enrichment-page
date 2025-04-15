/** 
 * @file CreateProductModal.tsx
 * @description Modal component for creating a new product, with image upload, field validation, and API submission.
 */

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
import { uploadFileToS3 } from '@/config/s3';

interface CreateProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({ open, onOpenChange }) => {
  // Initial product form state
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

  // Handle image file upload to S3
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const uploadedUrls: string[] = [];

      for (const file of files) {
        try {
          const imageUrl = await uploadFileToS3(file);
          uploadedUrls.push(imageUrl);
        } catch {
          toast.error(`Failed to upload ${file.name}`);
        }
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
    }
  };

  // Handle image URL upload
  const handleImageLinkUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, url],
    }));
  };

  // Remove image by URL
  const handleRemoveImage = (imageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(image => image !== imageToRemove),
    }));
  };

  // General input field handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Product) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit form to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.product_name.trim() || !formData.brand.trim()) {
      toast.error("Product name and brand are required");
      return;
    }

    // Map attributes to backend format
    const mappedAttributes = Object.entries(formData.attributes).reduce((acc, [key, attribute]) => {
      acc[key] = {
        label: key,
        value: attribute.value,
        type: attribute.type || "text",
        unit: attribute.unit || null,
        options: attribute.options || [],
      };
      return acc;
    }, {} as Record<string, any>);

    const productPayload = {
      product_name: formData.product_name,
      brand: formData.brand,
      barcode: formData.barcode,
      images: formData.images,
      isEnriched: formData.isEnriched,
      attributes: mappedAttributes,
    };

    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(`${apiUrl}/api/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productPayload),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error('API Error:', error);
        throw new Error("Failed to create product");
      }

      toast.success("Product created! (Please refresh the page to see updates)");

      // Reset form
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

    } catch {
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
          <ProductNameInput
            productName={formData.product_name}
            onChange={(e) => handleInputChange(e, "product_name")}
          />
          <BrandInput
            brand={formData.brand}
            onChange={(e) => handleInputChange(e, "brand")}
          />
          <BarcodeInput
            barcode={formData.barcode}
            onChange={(e) => handleInputChange(e, "barcode")}
          />
          <ImageUpload
            images={formData.images}
            onImageUpload={handleImageUpload}
            onLinkUpload={handleImageLinkUpload}
            onRemoveImage={handleRemoveImage}
          />

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
