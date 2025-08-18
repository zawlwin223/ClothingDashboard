type Customer = {
  fullName: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export type OrderItem = {
  id: string
  title?: string
  price: number
  quantity: number
  size: string
  image: {
    url: string
    alt?: string
  }
}

export interface Order {
  id: string
  date: string
  customer: Customer
  items: OrderItem[]
  totalPrice: string
  status?: string
}
