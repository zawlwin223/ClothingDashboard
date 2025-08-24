import { useMutation } from '@tanstack/react-query'

type ConfirmedData = {
  name: string
  email: string
  order: object
}
export function useSendEmail(
  id: string,
  onClose: () => void,
  setOrderConfirmed: (id: string) => void
) {
  return useMutation({
    mutationFn: async ({ name, email, order }: ConfirmedData) => {
      const result = await fetch('../api/emial', {
        method: 'POST',
        body: JSON.stringify({ name, email, order }),
      })
      return result.json()
    },
    onSuccess: () => {
      setOrderConfirmed(id)
      onClose()
    },
  })
}
