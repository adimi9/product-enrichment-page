import { create } from 'zustand';
import { Product } from '../model/ProductData';  // Updated to reflect your model structure
import { v4 as uuidv4 } from 'uuid';

interface ProductState {
  products: Product[];
  selectedProductIds: string[];
  addProduct: (product: Omit<Product, 'id' | 'isEnriched'>) => void;
  enrichProducts: (productIds: string[]) => void;
  deleteProducts: (productIds: string[]) => void;
  toggleProductSelection: (productId: string) => void;
  selectAllProducts: () => void;
  clearSelectedProducts: () => void;
  isProductSelected: (productId: string) => boolean;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  selectedProductIds: [],
  
  // Add a product to the store
  addProduct: (productData) => {
    const newProduct: Product = {
      id: uuidv4(),
      isEnriched: false,  // Default value
      ...productData,     // Spread other properties
    };
    
    set((state) => ({
      products: [...state.products, newProduct]
    }));
  },
  
  // Enrich products (mark them as enriched)
  enrichProducts: (productIds) => {
    set((state) => ({
      products: state.products.map((product) =>
        productIds.includes(product.id)
          ? { ...product, isEnriched: true }
          : product
      ),
    }));
  },
  
  // Delete products by their ids
  deleteProducts: (productIds) => {
    set((state) => ({
      products: state.products.filter((product) => !productIds.includes(product.id)),
      selectedProductIds: state.selectedProductIds.filter((id) => !productIds.includes(id)),
    }));
  },
  
  // Toggle selection of a product
  toggleProductSelection: (productId) => {
    set((state) => {
      const isSelected = state.selectedProductIds.includes(productId);
      return {
        selectedProductIds: isSelected
          ? state.selectedProductIds.filter((id) => id !== productId)
          : [...state.selectedProductIds, productId],
      };
    });
  },
  
  // Select all products
  selectAllProducts: () => {
    set((state) => ({
      selectedProductIds: state.products.map((product) => product.id),
    }));
  },
  
  // Clear all selected products
  clearSelectedProducts: () => {
    set({ selectedProductIds: [] });
  },
  
  // Check if a product is selected
  isProductSelected: (productId) => {
    return get().selectedProductIds.includes(productId);
  },
}));
