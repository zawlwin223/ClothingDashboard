'use client'
import ImagePreview from './imagePreview'

import { useState } from 'react'

import { productMutation } from '@/app/_hook/productsMutation'

interface ProductFormProps {
  initialProduct?: {
    id: string
    title: string
    description: string
    price: string
    totalQuantity: string
    size: string
    category: string
    image: string | { url: string; public_id: string }
  }
}

export default function ProductForm({ initialProduct }: ProductFormProps) {
  const [resetImagePreview, setResetImagePreview] = useState(0)

  const mutation = productMutation(initialProduct, setResetImagePreview)

  const { data, error, isPending } = mutation

  const validationError =
    error && JSON.parse((error as any)?.message).validationError

  const errorMessage = validationError ? validationError : error?.message

  interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

  function submit(e: SubmitEvent): void {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    mutation.mutate(formData)
  }

  return (
    <>
      <form
        onSubmit={(e) => submit(e)}
        className="max-w-xl ms-5 p-6 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold mb-4">
          {initialProduct ? 'Edit Product' : 'Create Product'}
        </h2>

        <input
          name="title"
          placeholder="Title"
          className="w-full border rounded px-3 py-2"
          defaultValue={initialProduct?.title}
        />
        {errorMessage?.title && (
          <p className="text-sm text-red-600">{errorMessage.title}</p>
        )}

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border rounded px-3 py-2"
          defaultValue={initialProduct?.description}
        />
        {errorMessage?.description && (
          <p className="text-sm text-red-600">{errorMessage.description}</p>
        )}

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full border rounded px-3 py-2"
          defaultValue={initialProduct?.price}
        />
        {errorMessage?.price && (
          <p className="text-sm text-red-600">{errorMessage.price}</p>
        )}

        <input
          name="totalQuantity"
          type="number"
          placeholder="Total Quantity"
          className="w-full border rounded px-3 py-2"
          defaultValue={initialProduct?.totalQuantity}
        />
        {errorMessage?.totalQuantity && (
          <p className="text-sm text-red-600">{errorMessage?.totalQuantity}</p>
        )}

        <input
          name="size"
          placeholder="Size (e.g. S, M, L, XL)"
          className="w-full border rounded px-3 py-2"
          defaultValue={initialProduct?.size}
        />
        {errorMessage?.size && (
          <p className="text-sm text-red-600">{errorMessage.size}</p>
        )}

        <input
          name="category"
          placeholder="Category"
          className="w-full border rounded px-3 py-2"
          defaultValue={initialProduct?.category}
        />
        {errorMessage?.category && (
          <p className="text-sm text-red-600">{errorMessage?.category}</p>
        )}

        <ImagePreview
          initialImg={
            initialProduct
              ? typeof initialProduct.image === 'string'
                ? initialProduct.image
                : typeof initialProduct.image === 'object'
                ? initialProduct.image.url
                : ''
              : ''
          }
          key={resetImagePreview}></ImagePreview>
        {errorMessage?.image && (
          <p className="text-sm text-red-600">{errorMessage?.image}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition">
          {isPending ? 'pending...' : 'Submit'}
        </button>
      </form>
    </>
  )
}
