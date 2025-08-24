import { CustomerListTable } from '@/components/orders/customerTable'
import { Card } from '@/components/ui/card'

export default async function Dashboard() {
  return (
    <div className="p-8">
      <Card className="px-3 lg:px-9 mt-2 gap-0">
        <h1 className="font-bold  text-[30px] ms-3">Order Management</h1>
        <CustomerListTable></CustomerListTable>
      </Card>
    </div>
  )
}
