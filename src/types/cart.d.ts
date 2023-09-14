type CartItem = {
  product: Product;
  quantity: number;
};

type Cart = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

type CartProductProps = {
  item: CartItem
}
