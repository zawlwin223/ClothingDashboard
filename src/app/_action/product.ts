'use server'
import { validateForm } from '../_utils/validateForm'
import { ProductInput } from '../_libs/formValidateSchema'
import { deleteImage, saveImageFile, updateImage } from '../_utils/cloudinary'

import {
  sendDataToFB,
  deleteDataFromFB,
  updateDataFromFb,
} from '../_utils/firebase'
import { redirect } from 'next/navigation'

interface FormState {
  // message: string
  // errors: Partial<Record<keyof ProductInput, string[]>>
  values?: Partial<ProductInput>
}

export async function createProduct(formData: FormData): Promise<FormState> {
  const { message, errors, values } = validateForm(formData)

  console.log('Form validation result:', { message, errors, values })

  if (message === 'error') {
    throw new Error(JSON.stringify({ validationError: errors }))
  }

  const imageResult = await saveImageFile(values?.image as File)

  if (
    typeof imageResult === 'object' &&
    imageResult !== null &&
    'secure_url' in imageResult
  ) {
    const newProduct = {
      ...values,
      image: {
        url: (imageResult as any).secure_url,
        public_id: (imageResult as any).public_id,
      },
      title: values?.title ?? '',
      description: values?.description ?? '',
      price: values?.price ? Number(values.price) : 0,
      totalQuantity: values?.totalQuantity ? Number(values.totalQuantity) : 0,
      size: values?.size ?? '',
      category: values?.category ?? '',
    }

    await sendDataToFB(newProduct)
  }

  return {
    values,
  }
}

export async function updateProduct(
  firebaseid: string,
  imageId: string,
  formData: FormData
): Promise<FormState> {
  const { message, errors, values } = validateForm(formData)

  if (message === 'error') {
    throw new Error(JSON.stringify(errors))
  }
  const newProduct = {
    ...values,
    title: values?.title ?? '',
    description: values?.description ?? '',
    price: values?.price ? Number(values.price) : 0,
    totalQuantity: values?.totalQuantity ? Number(values.totalQuantity) : 0,
    size: values?.size ?? '',
    category: values?.category ?? '',
  }

  if (values?.image && typeof values.image === 'string') {
    console.log('Image is a URL, updating Firebase data only')
    newProduct.image = {
      url: values.image,
      public_id: imageId,
    } as any

    await updateDataFromFb({
      firebaseId: firebaseid,
      updatedData: newProduct,
    })
    return {
      values,
    }
  }

  if (values?.image && values.image instanceof File) {
    //Image is a File, updating Cloudinary and Firebase
    const imageResult = await updateImage({
      file: values.image as File,
      imageId,
    })

    if (
      typeof imageResult === 'object' &&
      imageResult !== null &&
      'secure_url' in imageResult
    ) {
      newProduct.image = {
        url: (imageResult as any).secure_url,
        public_id: (imageResult as any).public_id,
      } as any

      await updateDataFromFb({
        firebaseId: firebaseid,
        updatedData: newProduct,
      })
    }
  }

  return {
    values,
  }
}

export async function deleteProduct(
  productId: string | number,
  imageId: string
) {
  await deleteImage(imageId)
  await deleteDataFromFB(String(productId))
  redirect('/products')
}
