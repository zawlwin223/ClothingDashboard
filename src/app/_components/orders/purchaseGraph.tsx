'use client'
import { Bar } from 'react-chartjs-2'
import { useFetchOrders } from '@/app/_hook/fetchOrders'
import { getLast7dates } from '@/app/_utils/getLast7dates'
import { getLast7months } from '@/app/_utils/getLast7months'
import { monthNames } from '@/app/_utils/getLast7months'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const PurchaseGraph = ({ purchaseRate }: { purchaseRate: string | null }) => {
  const last7Dates = getLast7dates()
  const Last7months = getLast7months()

  const dailyTotalPrice: { [date: string]: number } = {}
  last7Dates.forEach((date) => {
    dailyTotalPrice[date] = 0
  })

  const monthlyTotalPrice: { [month: string]: number } = {}
  Last7months.forEach((month) => {
    monthlyTotalPrice[month] = 0
  })

  interface Order {
    id: string
    date: string
    totalPrice: string
  }

  const { data: orders, isLoading, isError } = useFetchOrders()

  Object.values(orders || {}).forEach((order) => {
    const { date, totalPrice } = order as Order
    const orderDate = new Date(date).toISOString().split('T')[0]
    const orderMonth = monthNames[new Date(date).getMonth()]

    if (last7Dates.includes(orderDate.toString())) {
      const numericPrice = parseFloat(totalPrice.replace(/[$,]/g, ''))
      dailyTotalPrice[orderDate] += numericPrice
    }
    if (Last7months.includes(orderMonth.toString())) {
      const numericPrice = parseFloat(totalPrice.replace(/[$,]/g, ''))
      monthlyTotalPrice[orderMonth] += numericPrice
    }
  })

  // console.log('Fetched orders:', orders)
  const graphData = {
    labels: purchaseRate === 'Daily Purchase Rate' ? last7Dates : Last7months,
    datasets: [
      {
        data:
          purchaseRate === 'Daily Purchase Rate'
            ? last7Dates.map((date) => dailyTotalPrice[date])
            : Last7months.map((month) => monthlyTotalPrice[month]),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,

    plugins: {
      // borderWidth: 2,
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: false,
        // text: 'Daily Purchases',
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // hides vertical grid lines behind bars
          drawBorder: false, // hides the axis line itself (optional)
        },
      },
      y: {
        ticks: {
          callback: function (tickValue: string | number) {
            const num =
              typeof tickValue === 'number' ? tickValue : parseFloat(tickValue)
            return `$${num.toLocaleString()}`
          },
        },
      },
    },
  }

  return <Bar data={graphData} options={options} />
}

export default PurchaseGraph
