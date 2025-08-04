import { useMutation } from '@tanstack/react-query'
import { createProduct, updateProduct } from '../_action/product'
import { useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '../_action/product'
import { Product } from '../type/productType'

type DeleteProductArgs = { productId: string; imageId: string }
export function useCreateProduct(
  initialProduct?: Product,
  setResetImagePreview?: React.Dispatch<React.SetStateAction<number>>,
  onClose?: () => void
) {
  const queryClient = useQueryClient()
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
        console.log('Hello')
        console.log(formData)
        const res = await fetch('../api/products', {
          method: 'POST',
          body: JSON.stringify(formData),
        })
        const data = await res.json()
        return data
        // return await createProduct(formData)
      }
    },
    onSuccess: (data) => {
      if (data.message !== 'error') {
        if (setResetImagePreview) {
          setResetImagePreview((prev: number) => prev + 1)
        }
      }
      queryClient.invalidateQueries({ queryKey: ['products'] })
      if (onClose) {
        onClose()
      }
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ productId, imageId }: DeleteProductArgs) => {
      const res = await fetch(
        `../api/products?productId=${productId}&imageId=${imageId}`,
        {
          method: 'DELETE',
        }
      )
      const data = await res.json()
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
