import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultProducts, type Product } from '../data/products';

const STORAGE_KEY = 'agrofeed_products_v1';

interface ProductContextValue {
  products: Product[];
  updateProduct: (id: string, updates: Partial<Product>) => void;
  resetProducts: () => void;
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProducts;
    const parsed = JSON.parse(raw) as Product[];
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultProducts;
    return parsed;
  } catch {
    return defaultProducts;
  }
}

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => loadProducts());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((current) =>
      current.map((product) => (product.id === id ? { ...product, ...updates } : product))
    );
  };

  const resetProducts = () => {
    setProducts(defaultProducts);
  };

  const value = useMemo(
    () => ({
      products,
      updateProduct,
      resetProducts,
    }),
    [products]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
