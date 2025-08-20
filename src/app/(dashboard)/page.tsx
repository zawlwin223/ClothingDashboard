'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Package, DollarSign, Users } from 'lucide-react'
import PurchaseGraph from '../_components/orders/purchaseGraph'
import { Card, CardTitle } from '@/components/ui/card'
import { useFetchProducts } from '../_hook/fetchProducts'
import { Product } from '../_type/productType'
import { useFetchOrders } from '../_hook/fetchOrders'
import { Order, OrderItem } from '../_type/orderType'
import { useState } from 'react'
import { useEffect } from 'react'
import { TailChase } from 'ldrs/react'
import 'ldrs/react/TailChase.css'

export default function Home() {
  const [dashboardData, setDashboardData] = useState<any>({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  })
  const {
    data: products,
    isLoading: productLoading,
    error: productError,
  } = useFetchProducts()
  const {
    data: orders,
    isLoading: orderLoading,
    error: orderError,
  } = useFetchOrders()

  useEffect(() => {
    if (!productLoading && !orderLoading) {
      const totalProducts = products?.reduce(
        (accmulator: number, product: Product) =>
          product.totalQuantity + accmulator,
        0
      )
      const totalCustomers = orders && Object.values(orders).length
      const totalOrders = Object.values(orders as Record<string, Order>).reduce(
        (sum: number, order) => {
          return (
            sum +
            order.items.reduce(
              (itemSum: number, item: OrderItem) => itemSum + item.quantity,
              0
            )
          )
        },
        0
      )
      const totalRevenue = Object.values(
        orders as Record<string, Order>
      ).reduce((sum: number, order) => {
        return (
          sum +
          order.items.reduce(
            (itemSum: number, item: OrderItem) =>
              itemSum + item.quantity * item.price,
            0
          )
        )
      }, 0)
      const dashboardDataObject = {
        totalCustomers,
        totalOrders,
        totalRevenue,
        totalProducts,
      }
      setDashboardData(dashboardDataObject)
    }
  }, [productLoading, orderLoading, products, orders])

  return (
    <div className=" p-8 ">
      <h1 className="font-bold text-[30px] mb-5">Dashboard Overview</h1>
      <div className="flex gap-3 flex-wrap mb-5 ">
        <Card className="gap-0 px-4 flex-1">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-[20px]">Total Revenue</h1>
            <p>
              <DollarSign color="green"></DollarSign>
            </p>
          </div>
          <h1
            className="font-bold text-[25px] my-3
          ">
            {orderLoading || dashboardData.totalRevenue === 0 ? (
              <TailChase size={20}></TailChase>
            ) : (
              '$' + dashboardData.totalRevenue
            )}
          </h1>
        </Card>
        <Card className="gap-0  px-4 flex-1">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-[20px]">Total Products</h1>
            <p>
              <Package></Package>
            </p>
          </div>
          <h1
            className="font-bold text-[25px] my-3
          ">
            {productLoading || dashboardData.totalProducts === 0 ? (
              <TailChase size={20}></TailChase>
            ) : (
              dashboardData.totalProducts
            )}
          </h1>
        </Card>
        <Card className="gap-0  px-4 flex-1">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-[20px]">Total Orders</h1>
            <p>
              <ShoppingCart></ShoppingCart>
            </p>
          </div>
          <h1
            className="font-bold text-[25px] my-3
          ">
            {orderLoading || dashboardData.totalOrders === 0 ? (
              <TailChase size={20}></TailChase>
            ) : (
              dashboardData.totalOrders
            )}
          </h1>
        </Card>
        <Card className="gap-0 px-4 flex-1">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-[20px]">Total Customers</h1>
            <p>
              <Users></Users>
            </p>
          </div>
          <h1
            className="font-bold text-[25px] my-3
          ">
            {orderLoading || dashboardData.totalCustomers === 0 ? (
              <TailChase size={20}></TailChase>
            ) : (
              dashboardData.totalCustomers
            )}
          </h1>
        </Card>
      </div>
      <div className="flex flex-col lg:flex-row">
        <Card className="flex-1 min-w-0 me-0 lg:me-3 border p-5">
          <CardTitle className="font-bold text-[20px] mb-3">
            Monthly Purchase Rate
          </CardTitle>
          <div className="h-[400px]">
            <PurchaseGraph purchaseRate={null}></PurchaseGraph>
          </div>
        </Card>

        <Card className="mt-3 lg:mt-0 h-[300px] lg:h-[510px] p-5 border gap-0 w-full lg:w-[320px] shrink-0">
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
