'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

interface OrderItem {
  id: number
  title?: string
  price: number
  quantity: number
  size: string
  image: {
    url: string
    alt?: string
  }
}

interface Customer {
  fullName: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface Order {
  customer: Customer
  items: OrderItem[]
  totalPrice: string
}

export default function OrdersTable() {
  const [expanded, setExpanded] = useState<string | null>(null)

  const { data, isLoading, isError } = useQuery<Record<string, Order>>({
    queryKey: ['orders'],
    queryFn: async () => {
      const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL
      console.log(databaseUrl)
      if (!databaseUrl) throw new Error('DATABASE_URL is not defined')
      const response = await fetch(databaseUrl)
      if (!response.ok) throw new Error('Failed to fetch')
      return response.json()
    },
  })

  if (isLoading) return <div className="p-4">Loading...</div>
  if (isError)
    return <div className="p-4 text-red-500">Error loading orders</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders Table</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">City</th>
            <th className="px-4 py-2 border">Total</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data!).map(([key, order]) => (
            <>
              <tr key={key}>
                <td className="px-4 py-2 border">{order.customer.fullName}</td>
                <td className="px-4 py-2 border">{order.customer.email}</td>
                <td className="px-4 py-2 border">{order.customer.city}</td>
                <td className="px-4 py-2 border">{order.totalPrice}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() =>
                      setExpanded((prev) => (prev === key ? null : key))
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded">
                    {expanded === key ? 'Hide' : 'Check'}
                  </button>
                </td>
              </tr>

              {expanded === key && (
                // console.log()
                <tr>
                  <td colSpan={5} className="bg-gray-50 border px-4 py-2">
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <img
                            src={item.image.url}
                            alt="product"
                            className="w-16 h-16 object-cover border"
                          />
                          <div>
                            <p className="font-semibold">
                              {item.title ?? 'Unnamed Product'}
                            </p>
                            <p>
                              Size: {item.size} | Quantity: {item.quantity} |
                              Price: ${item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}
