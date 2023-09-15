type CartItem = {
  product: ElectronicsProduct
  quantity: number
}

type Cart = {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

type CartProductProps = {
  item: CartItem
}