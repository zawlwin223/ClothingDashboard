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

//test typeScript
// const test = (name: string): string => {
//   return name
// }
// test('test')

// function add(a: number, b: number): number
// function add(a: string, b: string): string

// function add(a: number | string, b: number | string): number | string {
//   if (typeof a === 'number' && typeof b === 'number') {
//     return a + b
//   } else if (typeof a === 'string' && typeof b === 'string') {
//     return a + b
//   }
//   throw new Error('Invalid arguments')
// }
// add(1, 2) // returns 3
// add('Hello, ', 'world!') // returns 'Hello, world!'

// type person = {
//   name: string
//   age: number
// }

// type position = {
//   role: string
// }

// type employee = person & position

// const employee1: employee = {
//   name: 'John Doe',
//   age: 30,
//   role: 'Software Engineer',
// }

// interface User {
//   name: string
//   age: number
//   email?: string
//   greet: () => void
// }
// interface Admin extends User {
//   role: string
// }

// const testAdmin: Admin = {
//   name: 'Jane Doe',
//   age: 28,
//   role: 'Administrator',
//   greet: () => {
//     console.log('hello')
//   },
// }

// interface lala {
//   (): void
// }

// const fun: lala = () => {
//   console.log('lala')
// }

// type Obj = {
//   readonly id: number
//   name: string
//   age: number
// }

// const obj: Obj = {
//   id: 1,
//   name: 'John',
//   age: 30,
// }

// obj.name = 'Doe' // Allowed
// // obj.id = 2; // Error: Cannot assign to 'id' because it is
// const keyTest: keyof Obj = 'name'

// console.log(typeof obj)

// const testName: typeof obj = { id: 1, name: 'test', age: 20 }

// type TestType = {
//   [index: number]: string
// }
// const testArray: TestType = { 1: 'one', 2: 'two', 3: 'three' }

// type sth = {
//   [index: string]: string
//   name: string
//   age: string
// }

// const testSth: sth = {
//   name: 'Zaw',
//   age: '20',
//   position: 'SaYaGyi',
// }

// type UserKeys = 'name' | 'age' | 'string'

// type UserK = {
//   [key in UserKeys]: string
// }

// const userk: UserK = {}

// const successResponse = <T>(value: T): Response<T> => {
//   return { name: 'Success', data: value }
// }

// successResponse('Hello')

// type Response<T> = {
//   name: string
//   data: T
// }

// const response: Response<number> = {
//   name: 'Test Response',
//   data: 123,
// }

// type UserProfile = {
//   name: string
//   email: string
//   age?: number
// }

// const showUserInfo = (val: UserProfile): string => {
//   return `Name:${val.name}, Email:${val.email} ` + val.age && `$Age:${val.age}`
// }

// showUserInfo({
//   name: 'Zaw',
//   email: 'zaw@email.com',
//   age: 25,
// })

// showUserInfo({
//   name: 'Zaw',
//   email: 'zaw@email.com',
// })
