'use client'

import { useState } from 'react'
import React from 'react'
import { fetchOrders } from '@/app/_hook/fetchOrders'

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
  id: string
  customer: Customer
  items: OrderItem[]
  totalPrice: string
}

export default function OrdersTable() {
  const [expanded, setExpanded] = useState<string | null>(null)

  const { data, isLoading, isError } = fetchOrders()

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
          {Object.entries(data!).map(([key, order]) => {
            const typedOrder = order as Order
            return (
              <React.Fragment key={key}>
                <tr key={`${key}-order`}>
                  <td className="px-4 py-2 border">
                    {typedOrder.customer.fullName}
                  </td>
                  <td className="px-4 py-2 border">
                    {typedOrder.customer.email}
                  </td>
                  <td className="px-4 py-2 border">
                    {typedOrder.customer.city}
                  </td>
                  <td className="px-4 py-2 border">{typedOrder.totalPrice}</td>
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
                  <tr key={`${key}-item`}>
                    <td colSpan={5} className="bg-gray-50 border px-4 py-2">
                      <div className="space-y-4">
                        {typedOrder.items.map((item, idx) => (
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
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
