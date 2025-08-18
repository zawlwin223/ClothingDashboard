import { productSchema } from '../_schema/formValidateSchema'
import { ProductInput } from '../_schema/formValidateSchema'

interface FormState {
  errors: object | boolean
  values?: Partial<ProductInput> | undefined
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
    size: formData.getAll('size').map(String),
    category: formData.get('category'),
    image: image,
  }

  const result = productSchema.safeParse(raw)

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  return {
    errors: false,
    values: result.data,
  }
}
