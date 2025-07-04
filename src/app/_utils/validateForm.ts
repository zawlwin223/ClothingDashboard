// validateForm.ts
import { console } from 'inspector'
import { productSchema } from '../_libs/formValidateSchema'
import { ProductInput } from '../_libs/formValidateSchema'

interface FormState {
  message: string
  errors: object
  values?: Partial<ProductInput>
}

export function validateForm(formData: FormData): FormState {
  const initialImage = formData.get('currentImg') // existing image info
  const uploadedImage = formData.get('image') // new image file
  const hasInitialImage = !!initialImage && typeof initialImage === 'string'
  const hasUploadedImage =
    uploadedImage instanceof File && uploadedImage.size > 0

  const image = hasUploadedImage
    ? uploadedImage
    : hasInitialImage
    ? initialImage
    : ''

  const raw = {
    title: formData.get('title'),
    description: formData.get('description'),
    price: formData.get('price'),
    totalQuantity: formData.get('totalQuantity'),
    size: formData.get('size'),
    category: formData.get('category'),
    image: image,
  }

  console.log('raw', raw)

  const result = productSchema.safeParse(raw)

  if (!result.success) {
    return {
      message: 'error',
      errors: result.error.flatten().fieldErrors,
      values: {
        title: String(raw.title || ''),
        description: String(raw.description || ''),
        price: String(raw.price || ''),
        totalQuantity: String(raw.totalQuantity || ''),
        size: String(raw.size || ''),
        category: String(raw.category || ''),
        image: raw.image instanceof File ? raw.image : undefined,
      },
    }
  }

  return {
    message: 'success',
    errors: {},
    values: result.data,
  }
}
