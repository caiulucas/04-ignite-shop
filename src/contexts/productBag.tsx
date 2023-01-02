import { useState } from 'react';
import { createContext } from 'use-context-selector';

type Product = {
  id: string;
  name: string;
  defaultPriceId: string;
  price: string;
  rawPrice: number;
  imageUrl: string;
};

interface ProductBagContextData {
  bag: Product[];
  addToBag: (product: Product) => void;
  removeToBag: (productId: string) => void;
  clearBag: () => void;
}

interface ProductBagProviderProps {
  children: React.ReactNode;
}

export const ProductBagContext = createContext<ProductBagContextData>(
  {} as ProductBagContextData
);

const storageKey = '@ignite-shop:productBag';

export function ProductBagProvider({ children }: ProductBagProviderProps) {
  const [bag, setBag] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return [];

    const localBag = localStorage.getItem(storageKey);

    if (localBag) return JSON.parse(localBag);
    return [];
  });

  function addToBag(product: Product) {
    setBag((state) => {
      const newProducts = [...state, product];
      localStorage.setItem(storageKey, JSON.stringify(newProducts));

      return newProducts;
    });
  }

  function removeToBag(productId: string) {
    setBag((state) => {
      const newProducts = state.filter((product) => product.id !== productId);
      localStorage.setItem(storageKey, JSON.stringify(newProducts));

      return newProducts;
    });
  }

  function clearBag() {
    setBag([]);
    localStorage.clear();
  }

  return (
    <ProductBagContext.Provider
      value={{ bag, addToBag, removeToBag, clearBag }}
    >
      {children}
    </ProductBagContext.Provider>
  );
}
