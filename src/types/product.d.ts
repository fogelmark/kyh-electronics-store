type Product = {
  id: number
  title: string
  price: string
}

type ElectronicsProduct = Product & {
  image: string
  description: string
  category: string
  rating: {
    count: number
    rate: number
  }
}

type CardProps = {
  product: ElectronicsProduct
}

