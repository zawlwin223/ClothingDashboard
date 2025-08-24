'use server'
import { adminFB } from '@/lib/fireBaseAdmin'

const adminDb = adminFB.firestore()
const adminAuth = adminFB.auth()

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

export async function deleteDataFromFB(productId: string) {
  try {
    await adminDb.collection('products').doc(productId).delete()
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

export async function signUpAdmin() {
  const user = await adminAuth.createUser({
    email: 'admin@example.com',
    password: 'superSecurePassword123',
  })

  return { message: 'Admin created', uid: user.uid }
}
