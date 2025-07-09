import ProductLists from '../_components/products/product-lists-table'
import { Providers } from '../providers'
import { Suspense } from 'react'
// import { fetchOrders } from '../_utils/firebase'

export default async function Products() {
  // const orders = await fetchOrders()
  // console.log('Fetched orders:', orders)
  return (
    <div className="w-full p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold  text-[30px]">Product Management</h1>
        <button className="bg-black rounded-[10px] text-white py-2 px-[30px]">
          Add New Product
        </button>
      </div>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductLists />
      </Suspense>
    </div>
  )
}
