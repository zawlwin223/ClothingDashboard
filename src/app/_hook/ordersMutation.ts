import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getDatabase, ref, remove } from 'firebase/database'
export function useDeleteOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const databaseUrl =
        process.env.NEXT_PUBLIC_DATABASE_URL + 'orders/' + id + '.json'
      await fetch(databaseUrl, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      })
    },
  })
}

export function useOrderStatusUpdate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const databaseUrl =
        process.env.NEXT_PUBLIC_DATABASE_URL + 'orders/' + id + '.json'
      await fetch(databaseUrl, {
        method: 'PATCH',
        body: JSON.stringify({ status: status }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
