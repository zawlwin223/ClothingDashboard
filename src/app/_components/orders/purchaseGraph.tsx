'use client'
import { Bar } from 'react-chartjs-2'
import { fetchOrders } from '@/app/_hook/fetchOrders'
import { getLast7dates } from '@/app/_utils/getLast7dates'
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

const PurchaseGraph = () => {
  const last7Dates = getLast7dates()

  const dailyTotalPrice: { [date: string]: number } = {}
  last7Dates.forEach((date) => {
    dailyTotalPrice[date] = 0
  })

  interface Order {
    id: string
    date: string
    totalPrice: string
  }

  const { data: orders, isLoading, isError } = fetchOrders()

  Object.values(orders || {}).forEach((order) => {
    const { date, totalPrice } = order as Order
    const orderDate = new Date(date).toISOString().split('T')[0]
    if (last7Dates.includes(orderDate.toString())) {
      const numericPrice = parseFloat(totalPrice.replace(/[$,]/g, ''))
      dailyTotalPrice[orderDate] += numericPrice
    }
  })

  // console.log('Fetched orders:', orders)
  const graphData = {
    labels: last7Dates,
    datasets: [
      {
        data: last7Dates.map((date) => dailyTotalPrice[date]),
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
