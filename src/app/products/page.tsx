import FetchedProducts from '../_components/products/products'
import { Providers } from '../providers'
import { Suspense } from 'react'
// import { fetchOrders } from '../_utils/firebase'

export default async function Products() {
  // const orders = await fetchOrders()
  // console.log('Fetched orders:', orders)
  return (
    <div className="grid grid-cols-3 gap-4 p-4 ">
      <Providers>
        <Suspense fallback={<div>Loading products...</div>}>
          <FetchedProducts />
        </Suspense>
      </Providers>
    </div>
  )
}
