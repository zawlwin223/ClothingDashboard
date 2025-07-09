import { useQuery } from '@tanstack/react-query'

export function fetchOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL
      
      if (!databaseUrl) throw new Error('DATABASE_URL is not defined')
      const response = await fetch(databaseUrl)
      if (!response.ok) throw new Error('Failed to fetch')
      return response.json()
    },
  })
}
