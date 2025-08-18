import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { Product } from '../_type/productType'
import { ProductInput } from '../_schema/formValidateSchema'

type DeleteProductArgs = { productId: string; imageId: string }

export function useCreateProduct(
  initialProduct?: Product,
  setResetImagePreview?: React.Dispatch<React.SetStateAction<number>>,
  onClose?: () => void
) {
  const queryClient = useQueryClient()
  return useMutation<any, Error, ProductInput>({
    mutationFn: async (values: ProductInput) => {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as any)
        }
      })
      if (initialProduct?.id) {
        formData.append('id', initialProduct.id)
        if (
          typeof initialProduct.image === 'object' &&
          !(initialProduct.image instanceof File)
        ) {
          formData.append('img_public_id', initialProduct.image.public_id)
        }
        const res = await fetch('../api/products', {
          method: 'PATCH',
          body: formData,
        })
        const data = await res.json()
        return data
      } else {
        const res = await fetch('../api/products', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        return data
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

export function useDeleteProduct(onClose: () => void) {
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
      onClose()
    },
  })
}
