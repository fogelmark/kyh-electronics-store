import { ReactNode, createContext, useContext, useState, useEffect } from "react";

type CartContextProviderProps = {
  children: ReactNode
}

type CartContextType = {
  cart: Cart[]
  addToCart: (item: Cart) => void
  removeFromCart: (itemId: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context
}

export const CartProvider = ({ children }: CartContextProviderProps) => {
  const [cart, setCart] = useState<Cart>({
    id: 0,
    userId: 0,
    products: []
  })

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        // Parse the savedCart only if it's not null or undefined
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        // Handle any parsing errors here
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const newItem = {
      productId: product.id, // Assuming product.id uniquely identifies products
      quantity: 1, // Start with a quantity of 1
    };

    const productIndex = cart.products.findIndex(
      (item: {productId: number}) => item.productId === newItem.productId
    );

    if (productIndex !== -1) {
      // If the product is already in the cart, update the quantity
      cart.products[productIndex].quantity += 1;
    } else {
      // If the product is not in the cart, add it as a new item
      cart.products.push(newItem);
    }
    setCart({...cart});
  };
  
  const removeFromCart = (itemId: number) => {
    // Update cart state by filtering out the item to remove
    const updatedCart = {
      ...cart,
      products: cart.products.filter((item) => item.productId !== itemId),
    };
    setCart(updatedCart);
  };

  const contextValue = {
    cart,
    addToCart,
    removeFromCart
  }
  
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}
