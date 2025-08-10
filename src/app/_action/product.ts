'use server'
import { validateForm } from '../_utils/validateForm'
import { ProductInput } from '../_schema/formValidateSchema'
import {
  deleteImage,
  saveImageFile,
  updateImage,
} from '../_services/cloudinary'

import {
  sendDataToFB,
  deleteDataFromFB,
  updateDataFromFb,
} from '../_services/firebase'
import { Product } from '../_type/productType'
import { redirect } from 'next/navigation'
import { strict } from 'assert'
import { string } from 'zod'

// interface FormState {
//   // message: string
//   // errors: Partial<Record<keyof ProductInput, string[]>>
//   values?: Partial<ProductInput>
// }
// type Value = {
//   title: string
//   price: string
//   category: string
//   description: string
//   totalQuantity: string
//   size: string
//   image: string | File
// }
export async function createProduct(values: Product) {
  console.log('This is create product', values)

  // const { message, errors, values } = validateForm(formData)

  // console.log('Form validation result:', { message, errors, values })

  // if (message === 'error') {
  //   throw new Error(JSON.stringify({ validationError: errors }))
  // }

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

    try {
      const { message } = await sendDataToFB(newProduct)
      return message
    } catch (error) {
      new Error('Error')
    }
  }
}

export async function updateProduct(
  firebaseid: string,
  imageId: string,
  values: Product
) {
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

    try {
      const { message } = await updateDataFromFb({
        firebaseId: firebaseid,
        updatedData: newProduct,
      })
      return message
    } catch (e) {
      new Error('Error')
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

      try {
        const { message } = await updateDataFromFb({
          firebaseId: firebaseid,
          updatedData: newProduct,
        })
        return message
      } catch (e) {
        new Error('Error')
      }
    }
  }

  // return {
  //   values,
  // }
}

export async function deleteProduct(productId: string, imageId: string) {
  await deleteImage(imageId)
  await deleteDataFromFB(productId)
  return { message: 'Delete Success' }
  // redirect('/products')
}
