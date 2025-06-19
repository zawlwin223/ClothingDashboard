// app/products/page.tsx
'use client'
import Image from 'next/image'
import Card from '@/app/_components/products/card'
import LinkButton from '../button'
import { useQuery } from '@tanstack/react-query'
import { fetchAllProducts } from '@/app/_utils/fetchProducts'
// import { fetchOrders } from '@/app/_utils/firebase'

// async function test() {
//   console.log('it works')
//   const response = await fetch(
//     'https://fashioncommerce-6a4f7-default-rtdb.firebaseio.com/orders.json'
//   )
//   const data = await response.json()
//   console.log(data)
// }
// test()
export default function FetchedProducts() {
  // const orders = await fetchOrders()
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  })

  if (isLoading) {
    return <h1>Fetching</h1>
  }

  return products.map((product) =>
    'image' in product && 'title' in product && 'price' in product ? (
      <Card key={product.id}>
        <Image
          src={
            typeof product.image === 'object'
              ? product.image.url
              : product.image
          }
          alt={product.title}
          width={100}
          height={100}
          className="object-contain"
        />
        <div className="">
          <h2 className="text-xl font-bold">{product.title}</h2>

          <p className="text-lg font-semibold">${product.price}</p>
        </div>
        <div className="flex ">
          <LinkButton id={product.id} type="edit">
            Edit
          </LinkButton>
          <LinkButton
            id={product.id}
            image_id={
              typeof product.image === 'object'
                ? product.image.public_id
                : undefined
            }
            type="delete">
            Delete
          </LinkButton>
        </div>
      </Card>
    ) : null
  )
}
