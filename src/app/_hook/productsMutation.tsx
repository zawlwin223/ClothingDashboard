import { useMutation } from '@tanstack/react-query'
import { createProduct, updateProduct } from '../_action/product'
import { redirectTo } from '../_utils/redirect'
export function productMutation(
  initialProduct?: {
    id: string
    title: string
    description: string
    price: string
    totalQuantity: string
    size: string
    category: string
    image: string | { url: string; public_id: string }
  },
  setResetImagePreview?: React.Dispatch<React.SetStateAction<number>>
) {
  return useMutation<any, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      if (initialProduct?.id) {
        return await updateProduct(
          initialProduct.id,
          typeof initialProduct.image === 'object'
            ? initialProduct.image.public_id
            : '',
          formData
        )
      } else {
        return await createProduct(formData)
      }
    },
    onSuccess: (data) => {
      if (data.message !== 'error') {
        if (setResetImagePreview) {
          setResetImagePreview((prev: number) => prev + 1)
        }
      }
      redirectTo('/products')
    },
  })
}
