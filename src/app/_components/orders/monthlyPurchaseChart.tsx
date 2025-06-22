'use client'
import { Bar } from 'react-chartjs-2'
import { fetchOrders } from '@/app/_hook/fetchOrders'
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

const MonthlyPurchaseChart = () => {
  const dailyOrders = [0, 0, 0, 0, 0, 0, 0]

  interface Order {
    id: string
    date: string
    // Add other fields as needed
  }

  // Remove FetchOrdersResult interface and destructure fetchOrders result directly
  const { data: orders, isLoading, isError } = fetchOrders()

  Object.values(orders || {}).forEach((order) => {
    const { date } = order as Order
    const [year, month, day] = date.split('-').map(Number)
    const dateObj = new Date(year, month - 1, day)
    const dayOfWeek = dateObj.getDay() // month is 0-indexed in JS
    dailyOrders[dayOfWeek] += 1
    console.log(dayOfWeek)
  })

  // console.log('Fetched orders:', orders)
  const graphData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Daily Purchase',
        data: dailyOrders,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Purchases',
      },
    },
  }

  return <Bar data={graphData} options={options} />
}

export default MonthlyPurchaseChart
