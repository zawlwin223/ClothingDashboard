import MonthlyPurchaseChart from '@/app/_components/orders/purchaseGraph'
import { Providers } from '@/app/providers'
export default function Graph() {
  return (
    <Providers>
      <MonthlyPurchaseChart></MonthlyPurchaseChart>
    </Providers>
  )
}
