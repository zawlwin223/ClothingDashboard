import { useQuery } from '@tanstack/react-query'
import { fetchDataFromFB } from '../_services/firebase'
export function useFetchProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('../api/products')
      if (!res.ok) return new Error('Error Fetching Products')
      const data = res.json()
      return data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  })
}
