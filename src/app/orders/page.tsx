// import { fetchOrders } from '../_utils/firebase'
import { CustomerListTable } from '../_components/orders/customerTable'
export default async function Dashboard() {
  // const orders = await fetchOrders()
  // console.log('Fetched orders:', orders)
  return (
    <div className="p-5 mt-2">
      <h1 className="font-bold  text-[30px] ms-4">Order Management</h1>
      <CustomerListTable></CustomerListTable>
    </div>
  )
}
