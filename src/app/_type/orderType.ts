type Customer = {
  fullName: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  // date: string
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

type User = {
  name: string
  age: number
}

type UserSummary = Pick<User, 'name' | 'age'>

type RecordTest = Record<string, string>

const test: RecordTest = {
  name: 'Zaw Lwin Phyo',
  job: 'web developer',
}
