import type { NextRequest } from 'next/server'
// import { fetchDataFromFB } from '../_action/firebase'
import { fetchDataFromFB } from '@/app/_action/firebase'
import { deleteProduct } from '@/app/_action/product'
import { createProduct } from '@/app/_action/product'
export async function GET(request: NextRequest) {
  console.log('it works')
  try {
    const res = await fetchDataFromFB()
    return Response.json(res)
  } catch (e) {
    throw new Response('Error')
  }
}

export async function POST(request: NextRequest) {
  console.log('Hello Post works')
  const formData = request.json()
  console.log(formData)
  // await createProduct(formData)
}
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const productId = String(searchParams.get('productId'))
  const imageId = String(searchParams.get('imageId'))
  console.log(productId, imageId)
  try {
    const res = await deleteProduct(productId, imageId)
    console.log(res)
    return Response.json(res)
  } catch (e) {
    throw new Response('Error')
  }
}
