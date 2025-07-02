// app/products/page.tsx
'use client'
import Image from 'next/image'
import Card from '@/app/_components/products/card'
import LinkButton from '../button'
import { useQuery } from '@tanstack/react-query'
import { fetchDataFromFB } from '@/app/_utils/firebase'

export default function FetchedProducts() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchDataFromFB,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return <h1>Fetching</h1>
  }

  return products.map((product) =>
    'image' in product && 'title' in product && 'price' in product ? (
      <Card key={product.id}>
        <Image
          src={
            typeof product.image === 'object' && product.image !== null
              ? String((product.image as { url: unknown }).url)
              : String(product.image)
          }
          alt={String(product.title)}
          width={100}
          height={100}
          className="object-contain"
        />
        <div className="">
          <h2 className="text-xl font-bold">{String(product.title)}</h2>

          <p className="text-lg font-semibold">${String(product.price)}</p>
        </div>
        <div className="flex ">
          <LinkButton id={product.id} type="edit">
            Edit
          </LinkButton>
          <LinkButton
            id={product.id}
            image_id={
              typeof product.image === 'object' &&
              product.image !== null &&
              'public_id' in product.image
                ? (product.image as { public_id: string }).public_id
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
