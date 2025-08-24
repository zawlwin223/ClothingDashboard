'use server'
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
import { Product } from '../type/productType'
export async function createProduct(values: Product) {
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
}

export async function deleteProduct(productId: string, imageId: string) {
  await deleteImage(imageId)
  await deleteDataFromFB(productId)
  return { message: 'Delete Success' }
}
