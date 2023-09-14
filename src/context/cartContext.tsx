// cartContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CartContextProvider = {
  children: ReactNode
}

type CartContextType = {
  cart: Cart;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  // savedCart: string
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: CartContextProvider) => {

  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });

  // const initialSavedCart = localStorage.getItem('cart') || '';
  // const [savedCart, setSavedCart] = useState<string>(initialSavedCart);

  useEffect(() => {
    // Save cart data to local storage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // useEffect(() => {
  //   // Save cart data to local storage whenever it changes
  //   localStorage.setItem('cart', JSON.stringify(cart));
  //   // Update savedCart whenever cart changes
  //   setSavedCart(JSON.stringify(cart));
  // }, [cart]);

  useEffect(() => {
    // Load cart data from local storage on component mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item.product.id === product.id);
      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalItems: prevCart.totalItems + 1,
          totalPrice: prevCart.totalPrice + parseFloat(product.price),
        };
      } else {
        return {
          ...prevCart,
          items: [...prevCart.items, { product, quantity: 1 }],
          totalItems: prevCart.totalItems + 1,
          totalPrice: prevCart.totalPrice + parseFloat(product.price),
        };
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.items.find((item) => item.product.id === productId);
      if (itemToRemove) {
        return {
          ...prevCart,
          items: prevCart.items.filter((item) => item.product.id !== productId),
          totalItems: prevCart.totalItems - itemToRemove.quantity,
          totalPrice: prevCart.totalPrice - (itemToRemove.quantity * parseFloat(itemToRemove.product.price)),
        };
      }
      return prevCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
