import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

type ProductContextProviderProps = {
  children: ReactNode
}

type ProductContextType = {
  products: ElectronicsProduct[];
  loading: boolean;
  error: string | null;
  setProducts: React.Dispatch<React.SetStateAction<ElectronicsProduct[]>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }: ProductContextProviderProps) => {
  const [products, setProducts] = useState<ElectronicsProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/category/electronics?limit=6');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const contextValue: ProductContextType = {
    products,
    loading,
    error,
    setProducts,
    setLoading
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
