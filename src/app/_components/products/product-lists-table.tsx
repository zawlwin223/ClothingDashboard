// app/products/page.tsx
'use client'
import Image from 'next/image'
import LinkButton from '../button'
import { useQuery } from '@tanstack/react-query'
import { fetchDataFromFB } from '@/app/_utils/firebase'
import { table } from 'console'
import { paginate } from '@/app/_utils/pagination'
import { useState } from 'react'
import PaginationButton from '../paginationButton'

export default function ProductsList() {
  const [page, setPage] = useState(1) // State to manage current page
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

  const [paginatedProducts, totalPageRaw] = paginate(products, page, 5) // Adjust page number as needed
  const totalPage = typeof totalPageRaw === 'number' ? totalPageRaw : 1

  if (isLoading) {
    return <h1>Fetching</h1>
  }

  type Product = {
    id: string
    image: unknown
    title: unknown
    price: unknown
    // description: unknown
    totalQuantity?: unknown
    size?: unknown
    category?: unknown
    // add other fields as needed
  }

  return (
    <div className="w-full p-4 border border-gray-300 rounded-lg bg-white shadow-md">
      <h1 className="font-semibold text-[20px]">Products Lists</h1>
      <p className="mb-3 mt-2 text-gray-500">
        View, edit or delete your products
      </p>

      <input
        type="text"
        placeholder="Filter Products By Title"
        className="my-3 p-2 w-[300px] bg-gray-200 border-0 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      <div className="w-full border border-gray-300 rounded-lg overflow-hidden mb-4">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th className="p-3 text-gray-500">Image</th>
              <th className="p-3 text-gray-500">Title</th>
              <th className="p-3 text-gray-500 text-center">Price</th>
              <th className="p-3 text-gray-500 text-center">Quantity</th>
              <th className="p-3 text-gray-500 text-center">Size</th>
              <th className="p-3 text-gray-500 text-center">Category</th>
              {/* <th className="p-3">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {(paginatedProducts as Product[]).map((product) =>
              'image' in product && 'title' in product && 'price' in product ? (
                <tr key={product.id} className="border-t border-gray-300">
                  <td className="p-3">
                    <Image
                      src={
                        typeof product.image === 'object' &&
                        product.image !== null
                          ? String((product.image as { url: unknown }).url)
                          : String(product.image)
                      }
                      alt={String(product.title)}
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                  </td>

                  <td className="p-3">
                    <h2 className="text-gray-500">{String(product.title)}</h2>
                  </td>

                  <td className="p-3 text-center">
                    <p className="text-gray-500">{String(product.price)}</p>
                  </td>

                  <td className="p-3 text-center">
                    <p className="text-gray-500">
                      {String(product.totalQuantity)}
                    </p>
                  </td>

                  <td className="p-3 text-center">
                    <p className="text-gray-500">{String(product.size)}</p>
                  </td>

                  <td className="p-3 text-center">
                    <p className="text-gray-500">{String(product.category)}</p>
                  </td>

                  <td className="p-3">
                    <button>...</button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>

      <PaginationButton setPage={setPage} page={page} totalPage={totalPage} />
    </div>
  )
}
