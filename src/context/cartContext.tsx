import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CartContextProvider = {
  children: ReactNode
}

type CartContextType = {
  cart: Cart;
  addToCart: (product: ElectronicsProduct) => void
  removeFromCart: (productId: number) => void
  incrementItem: (productId: number) => void
  decrementItem: (productId: number) => void
  clearCart: () => void
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: CartContextProvider) => {

  const [cart, setCart] = useState<Cart>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  });

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart({
      items: [],
      totalItems: 0,
      totalPrice: 0,
    });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ElectronicsProduct) => {
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

  const incrementItem = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item.product.id === productId);
      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalItems: prevCart.totalItems + 1,
          totalPrice: prevCart.totalPrice + parseFloat(existingItem.product.price),
        };
      }
      return prevCart;
    });
  };

  const decrementItem = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item.product.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        const updatedItems = prevCart.items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );

        return {
          ...prevCart,
          items: updatedItems,
          totalItems: prevCart.totalItems - 1,
          totalPrice: prevCart.totalPrice - parseFloat(existingItem.product.price),
        };
      } else {
        removeFromCart(productId);
        return prevCart;
      }
    });
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementItem, decrementItem, clearCart }}>
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
