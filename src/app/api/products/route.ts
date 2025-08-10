import type { NextRequest } from 'next/server'
// import { fetchDataFromFB } from '../_action/firebase'
import { fetchDataFromFB } from '@/app/_services/firebase'
import { deleteProduct } from '@/app/_action/product'
import { createProduct } from '@/app/_action/product'
import { updateProduct } from '@/app/_action/product'

export async function GET() {
  try {
    const res = await fetchDataFromFB()
    return Response.json(res)
  } catch (e) {
    throw new Response('Error')
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const size = formData.get('size') as string
  const totalQuantity = formData.get('totalQuantity') as string
  const image = formData.get('image') as File | string

  const data = {
    title,
    description,
    price,
    size,
    totalQuantity,
    image,
    category,
  }

  try {
    const result = await createProduct(data)
    return Response.json(result)
  } catch (error) {
    return Response.json('error.message')
  }
}

export async function PATCH(request: NextRequest) {
  console.log('This is update product')
  const formData = await request.formData()
  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const size = formData.get('size') as string
  const totalQuantity = formData.get('totalQuantity') as string
  const image = formData.get('image') as File | string

  const initialProductId = formData.get('id') as string
  const initialProductImage = formData.get('img_public_id') as string

  console.log(initialProductId, initialProductImage)

  const data = {
    title,
    description,
    price,
    size,
    totalQuantity,
    image,
    category,
  }
  console.log(data)
  try {
    const result = await updateProduct(
      initialProductId,
      initialProductImage,
      data
    )
    return Response.json(result)
  } catch (error) {
    return Response.json('error.message')
  }
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
