import { Providers } from '@/app/providers'
import OrdersTable from '@/app/_components/orders/ordersTable'

export default function Orders() {
  return (
    <Providers>
      <OrdersTable></OrdersTable>
    </Providers>
  )
}
