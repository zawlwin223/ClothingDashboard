import Link from 'next/link'
import PurchaseGraph from './_components/orders/purchaseGraph'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Package } from 'lucide-react'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
export default function Home() {
  return (
    <div className="w-full p-8 ">
      <h1 className="font-bold text-[30px] mb-5">Dashboard Overview</h1>
      <Card></Card>
      <div className="flex justify-between  ">
        {/* <div className="w-[850px] h-[500px]  border p-5"> */}
        <Card className="w-[850px] h-[500px]  border p-5">
          <CardTitle className="font-bold text-[20px] mb-3">
            Monthly Purchase Rate
          </CardTitle>
          <PurchaseGraph purchaseRate={null}></PurchaseGraph>
        </Card>

        {/* </div> */}
        <Card className="w-[330px] h-[500px] p-5 border gap-0">
          <h1 className="font-bold text-[20px]">Quick Actions</h1>
          <p className="mt-2">Manage your store efficiently.</p>
          <Button className="mt-5">
            <Link href={'/orders'} className="flex items-center justify-center">
              <ShoppingCart className="me-3"></ShoppingCart> View Orders
            </Link>
          </Button>
          <Button className="mt-3">
            <Link
              href={'/products'}
              className="flex items-center justify-center">
              <Package className="me-3"></Package>
              Manage Products
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}
