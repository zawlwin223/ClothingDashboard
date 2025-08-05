'use server'
import { adminDb } from '@/app/_libs/fireBaseAdmin'
import { getDatabase } from 'firebase-admin/database'

interface Product {
  title: string
  description: string
  price: number
  totalQuantity: number
  size: string
  category: string
  image: object
}
export async function sendDataToFB(product: Product) {
  console.log(product)
  try {
    await adminDb.collection('products').add(product)
    return { message: 'Successs' }
  } catch (error) {
    throw new Error(
      `Error adding document: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    )
  }
}

export async function fetchDataFromFB() {
  try {
    const snapshot = await adminDb.collection('products').get()
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return products
  } catch (error) {
    throw new Error(
      `Error fetching data: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    )
  }
}

// export async function getDataFromFB(id: string) {
//   console.log('Fetching data for ID:', id)
//   try {
//     const docRef = adminDb.collection('products').doc(id)
//     const doc = await docRef.get()
//     if (!doc.exists) {
//       throw new Error(`No document found with ID: ${id}`)
//     }
//     return { id: doc.id, ...doc.data() }
//   } catch (error) {
//     throw new Error(
//       `Error fetching document: ${
//         error instanceof Error ? error.message : 'Unknown error'
//       }`
//     )
//   }
// }

export async function deleteDataFromFB(productId: string) {
  try {
    await adminDb.collection('products').doc(productId).delete()
    console.log(`Document with ID ${productId} deleted successfully`)
  } catch (error) {
    throw new Error(
      `Error deleting document: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    )
  }
}

export async function updateDataFromFb({
  firebaseId,
  updatedData,
}: {
  firebaseId: string
  updatedData: { [key: string]: any }
}) {
  try {
    const docRef = await adminDb.collection('products').doc(firebaseId)
    await docRef.update(updatedData)
    return { message: 'success' }
  } catch (error: unknown) {
    return new Error(error instanceof Error ? error.message : 'Unknown error')
  }
}

// async function deleteOrderFromFb() {
//   try {
//     const db = getDatabase()
//     await db.ref('').remove()
//   } catch (error: unknown) {
//     return new Error(error instanceof Error ? error.message : 'Unknown error')
//   }
// }
