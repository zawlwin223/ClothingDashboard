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
  // date: string
}

interface Order {
  id: string
  date: string
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
    <div className="w-full p-4 border border-gray-300 rounded-lg bg-white shadow-md">
      <h1 className="font-semibold text-[20px]">Order History</h1>
      <p className="mb-3 mt-2 text-gray-500">
        Review details of all customer orders.
      </p>

      <input
        type="text"
        placeholder="Filter By Customer Name"
        className="my-3 p-2 w-[300px] bg-gray-200 border-0 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      <div className="w-full border border-gray-300 rounded-lg overflow-hidden mb-4">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th className="p-3 text-gray-500">Date</th>
              <th className="p-3 text-gray-500">Name</th>
              <th className="p-3 text-gray-500">Email</th>
              <th className="p-3 text-gray-500 text-center">City</th>
              <th className="p-3 text-gray-500 text-center">Total</th>
              {/* <th className="p-3 text-gray-500 text-center">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {Object.entries(data!).map(([key, order]) => {
              const typedOrder = order as Order
              console.log('Order:', typedOrder)
              return (
                <React.Fragment key={key}>
                  <tr key={`${key}-order`} className="border-t border-gray-300">
                    <td className="px-4 py-2 text-gray-500">
                      {typedOrder.date}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {typedOrder.customer.fullName}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {typedOrder.customer.email}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {typedOrder.customer.city}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {typedOrder.totalPrice}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
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
                                  Size: {item.size} | Quantity: {item.quantity}{' '}
                                  | Price: ${item.price}
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
    </div>
  )
}
