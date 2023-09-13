import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'CLEAR_CART' };

type CartContextValue = {
  cart: Cart;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

const initialState: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + parseFloat(action.payload.price),
        };
      } else {
        return {
          ...state,
          items: [
            ...state.items,
            { product: action.payload, quantity: 1 },
          ],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + parseFloat(action.payload.price),
        };
      }

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(
        (item) => item.product.id === action.payload
      );

      if (!itemToRemove) {
        return state;
      }

      if (itemToRemove.quantity > 1) {
        const updatedItems = state.items.map((item) =>
          item.product.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - parseFloat(itemToRemove.product.price),
        };
      } else {
        const updatedItems = state.items.filter(
          (item) => item.product.id !== action.payload
        );
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - parseFloat(itemToRemove.product.price),
        };
      }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
