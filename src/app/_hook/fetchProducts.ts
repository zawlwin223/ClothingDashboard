import { useQuery } from '@tanstack/react-query'
import { fetchDataFromFB } from '../_utils/firebase'
export function useFetchProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchDataFromFB,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  })
}
