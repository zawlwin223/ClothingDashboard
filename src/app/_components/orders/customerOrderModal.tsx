type OrderItem = {
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
export default function CustomerOrderModal({ items }: { items: OrderItem[] }) {
  console.log('Customer Order Items:', items)
  return (
    <div>
      <h1 className="font-bold text-[30px]">Customer Order Modal</h1>
      {/* Modal content goes here */}
    </div>
  )
}
