// import { fetchOrders } from '../_utils/firebase'
import { Car } from 'lucide-react'
import { CustomerListTable } from '@/app/_components/orders/customerTable'
import { Card } from '@/components/ui/card'
export default async function Dashboard() {
  // const orders = await fetchOrders()
  // console.log('Fetched orders:', orders)
  return (
    <div className="p-8">
      <Card className="px-9 mt-2 gap-0">
        <h1 className="font-bold  text-[30px] ms-3">Order Management</h1>
        <CustomerListTable></CustomerListTable>
      </Card>
    </div>
  )
}
