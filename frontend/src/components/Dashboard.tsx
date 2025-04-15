/** 
 * @file Dashboard.tsx 
 * @description This component represents the product dashboard page. It displays a list of products, allows users to create new products via a modal, and manages state related to product creation. The dashboard uses a store to manage product data.
 */

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react"; // Icon for the 'Create New Product' button
import ProductTable from './ProductTable'; // Table to display existing products
import CreateProductModal from './CreateProductModal'; // Modal for creating a new product
import { useProductStore } from '@/store/productStore'; // Custom hook to manage product store
import { Product } from '@/model/ProductData'; // Import Product type directly for type safety
import { toast } from 'sonner'; // Notification library for success/error messages

const Dashboard: React.FC = () => {
  // State for managing the visibility of the product creation modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Destructuring to get the `addProduct` function from the product store
  const { addProduct } = useProductStore();

  // Handler to create a product, called from the CreateProductModal
  const handleCreateProduct = (productData: Product) => {  
    // Add the new product to the product store
    addProduct(productData);
    // Show a success notification after the product is created
    toast.success('Product created successfully!');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Products</h2>
        {/* Button to trigger the product creation modal */}
        <Button 
          onClick={() => setIsCreateModalOpen(true)}  // Open the modal when clicked
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />  {/* Plus icon inside the button */}
          Create New Product
        </Button>
      </div>

      {/* Product table to display existing products */}
      <ProductTable />
      
      {/* CreateProductModal component to handle new product creation */}
      <CreateProductModal 
        open={isCreateModalOpen}  // Pass the modal open state as a prop
        onOpenChange={setIsCreateModalOpen}  // Pass the setter to control modal state
      />
    </div>
  );
};

export default Dashboard;
