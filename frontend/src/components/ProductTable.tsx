/** 
 * @file ProductTable.tsx 
 * @description This component displays a table of products. It allows users to select products, enrich selected products, and delete selected products. The component fetches products from an API and manages product selection, enrichment, and deletion actions. It also handles state for product data, selection, and UI interactions.
 */

import React, { useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";  // For horizontally scrollable areas
import { toast } from 'sonner';  // For displaying toast notifications
import { Table } from "@/components/ui/table";  // Import Table component for displaying products
import { Product } from '@/model/ProductData';  // Import Product type
import { renderAllColumnsHeader } from './table/ProductTableHeader';  // Header rendering logic for table
import { renderAllColumnsBody } from './table/ProductTableBody';  // Body rendering logic for table
import { renderNoProductsFound } from './table/ProductTableNoData';  // Placeholder when no products exist
import { ProductActions } from './table/ProductActions';  // Actions (Enrich/Delete) for selected products

const ProductTable: React.FC = () => {

  // State for storing product data, selected products, and selection state
  const [products, setLocalProducts] = useState<Product[]>([]);
  const [selectAll, setSelectAll] = useState(false);  // State for 'Select All' functionality
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);  // Selected product IDs

  // API URL for fetching products
  const apiUrl = import.meta.env.VITE_API_URL; 

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/products/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,  // Authorization with token
        },
      });

      const data = await res.json();
      console.log("Fetched products:", data);  // Log response data for inspection

      // Check if the fetched data is an array
      if (Array.isArray(data)) {
        setLocalProducts(data);  // Set products state if data is valid
      } else {
        toast.error("Unexpected data format received!");  // Error if data is not an array
        setLocalProducts([]);  // Clear products state
      }
    } catch (err) {
      toast.error("Failed to fetch products!");  // Error in case of failure
      console.error(err);
      setLocalProducts([]);  // Clear products on error
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Check if a product is selected
  const isProductSelected = (id: string) => {
    return selectedProductIds.includes(id);
  };

  // Toggle the selection of a product
  const toggleProductSelection = (productId: string) => {
    setSelectedProductIds((prevIds) => {
      const isSelected = prevIds.includes(productId);
      if (isSelected) {
        return prevIds.filter((id) => id !== productId);  // Deselect product
      } else {
        return [...prevIds, productId];  // Select product
      }
    });
  };

  // Select all products
  const selectAllProducts = () => {
    const allProductIds = products.map((product) => product.id);
    setSelectedProductIds(allProductIds);  // Select all product IDs
    setSelectAll(true);  // Set 'select all' to true
  };

  // Deselect all products
  const clearSelectedProducts = () => {
    setSelectedProductIds([]);  // Clear selected products
    setSelectAll(false);  // Set 'select all' to false
  };

  // Handle 'Select All' button click
  const handleSelectAll = () => {
    if (selectAll) clearSelectedProducts();  // Deselect all if already selected
    else selectAllProducts();  // Select all if none selected
    setSelectAll(!selectAll);  // Toggle 'select all' state
  };

  // Function to enrich selected products
  const enrichProducts = async (products: Product[]) => {
    const toastId = toast.loading("Enriching products...");  // Show loading toast
  
    try {
      const res = await fetch(`${apiUrl}/api/products/enrich`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,  // Authorization header
        },
        body: JSON.stringify({ products }),  // Send selected products in the request body
      });

      console.log(res); // Log response

      if (!res.ok) {
        throw new Error("Failed to enrich products");
      }

      const data = await res.json();
      console.log(data);

      // Update local products state with enrichment status
      setLocalProducts((prev) =>
        prev.map((product) => {
          const isProductBeingEnriched = products.some((p) => p.id === product.id);
          return isProductBeingEnriched
            ? { ...product, isEnriched: true }  // Mark product as enriched
            : product;
        })
      );

      if (res.status === 200) {
        toast.success(`${products.length} product(s) enriched successfully!`, { id: toastId });
        fetchProducts();  // Re-fetch products after enrichment
        clearSelectedProducts(); // Set all checkboxes to false
      }
    } catch (err) {
      toast.error("Failed to enrich selected products.", { id: toastId });
      console.error(err);
    }
  };

  // Handle enriching of selected products
  const handleEnrichSelected = async () => {
    const nonEnrichedProducts = products
      .filter((p: Product) => selectedProductIds.includes(p.id) && !p.isEnriched);  // Filter non-enriched selected products
  
    if (nonEnrichedProducts.length === 0) {
      toast.info("All selected products are already enriched!");  // Inform user if no products need enrichment
      return;
    }
  
    await enrichProducts(nonEnrichedProducts);  // Enrich non-enriched products
  };

  // Handle enriching a single product
  const handleEnrichSingle = async (productId: string) => {
    const productToEnrich = products.find(product => product.id === productId);
    if (productToEnrich) {
      await enrichProducts([productToEnrich]);  // Enrich the specific product
    }
  };

  // Handle deletion of selected products
  const handleDeleteSelected = async () => {
    if (selectedProductIds.length === 0) return;
  
    try {
      let data = { ids: selectedProductIds };  // Prepare the data for deletion request
      console.log("deleting");
      console.log(data);

      const res = await fetch(`${apiUrl}/api/products/bulk-delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,  // Authorization header
        },
        body: JSON.stringify({ ids: selectedProductIds }),  // Send selected product IDs for deletion
      });
  
      if (!res.ok) {
        throw new Error("Failed to delete products");
      }
  
      // Update local products state after deletion
      setLocalProducts((prev) =>
        prev.filter((product) => !selectedProductIds.includes(product.id))  // Remove deleted products from state
      );
      toast.success(`${selectedProductIds.length} product(s) deleted successfully!`);  // Success message
      clearSelectedProducts();  // Reset selected products
      setSelectAll(false);  // Reset 'select all' state
    } catch (err) {
      toast.error("Failed to delete selected products.");  // Error message
      console.error(err);
    }
  };

  // Check if there are any enriched products
  const hasEnrichment = products.some((p) => p.isEnriched);

  return (
    <div className="w-full flex flex-col space-y-4 relative">
      <div className="rounded-lg border shadow-sm overflow-hidden">
        <ScrollArea orientation="horizontal" className="w-full">
          <div className="flex w-full">
            <div className="flex-grow">
              <div className="min-w-[800px]">
                <Table className="w-full">
                  {renderAllColumnsHeader(selectAll, handleSelectAll, hasEnrichment)}  {/* Render table header */}
                  {renderAllColumnsBody(products, selectedProductIds, isProductSelected, toggleProductSelection, handleEnrichSingle)}  {/* Render table body */}
                </Table>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Render placeholder when no products are found */}
      {products.length === 0 && renderNoProductsFound()}

      {/* Render actions for selected products */}
      {selectedProductIds.length > 0 && (
        <ProductActions 
          handleEnrichSelected={handleEnrichSelected} 
          handleDeleteSelected={handleDeleteSelected} 
          selectedProductIds={selectedProductIds} 
        />
      )}
    </div>
  );
};

export default ProductTable;
