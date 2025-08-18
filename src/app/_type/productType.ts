export type Product = {
  id?: string
  title: string
  description: string
  price: string
  totalQuantity: string
  size: string
  category: string
  image: string | { url: string; public_id: string } | File
}
