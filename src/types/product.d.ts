type Product = {
  id: number
  title: string
  image: string
  price: string
  description: string
}

type CardProps = {
  product: Product
}

type Cart = {
  id: number;
  userId: number;
  products: {
    productId: number;
    quantity: number;
  }[];
}