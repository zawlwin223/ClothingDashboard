'use client'
import { useActionState } from 'react'
import ImagePreview from './imagePreview'
import { createProduct, updateProduct } from '@/app/_action/product'
import { ProductInput } from '@/app/_libs/formValidateSchema'
import { useState } from 'react'
import { redirect } from 'next/navigation'

interface FormState {
  message: string
  errors: Partial<Record<keyof ProductInput, string[]>>
  values?: Partial<ProductInput>
}

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

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData): Promise<FormState> => {
      let result: FormState

      if (initialProduct?.id) {
        result = await updateProduct(
          initialProduct.id,
          typeof initialProduct.image === 'object'
            ? initialProduct.image.public_id
            : '',
          prevState,
          formData
        )
      } else {
        result = await createProduct(prevState, formData)
      }

      if (result.message !== 'error') {
        setResetImagePreview((prev: number) => prev + 1)
        redirect('/products')
      }

      return result
    },
    {
      message: '',
      errors: {},
      values: initialProduct
        ? {
            title: initialProduct.title,
            description: initialProduct.description,
            price: initialProduct.price,
            totalQuantity: initialProduct.totalQuantity,
            size: initialProduct.size,
            category: initialProduct.category,
          }
        : {},
    }
  )

  return (
    <>
      <form
        action={formAction}
        className="max-w-xl ms-5 p-6 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold mb-4">
          {initialProduct ? 'Edit Product' : 'Create Product'}
        </h2>

        <input
          name="title"
          placeholder="Title"
          className="w-full border rounded px-3 py-2"
          defaultValue={state.values?.title}
        />
        {state.errors?.title && (
          <p className="text-sm text-red-600">{state.errors.title}</p>
        )}

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border rounded px-3 py-2"
          defaultValue={state.values?.description}
        />
        {state.errors?.description && (
          <p className="text-sm text-red-600">{state.errors.description}</p>
        )}

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full border rounded px-3 py-2"
          defaultValue={state.values?.price}
        />
        {state.errors?.price && (
          <p className="text-sm text-red-600">{state.errors.price}</p>
        )}

        <input
          name="totalQuantity"
          type="number"
          placeholder="Total Quantity"
          className="w-full border rounded px-3 py-2"
          defaultValue={state.values?.totalQuantity}
        />
        {state.errors?.totalQuantity && (
          <p className="text-sm text-red-600">{state.errors.totalQuantity}</p>
        )}

        <input
          name="size"
          placeholder="Size (e.g. S, M, L, XL)"
          className="w-full border rounded px-3 py-2"
          defaultValue={state.values?.size}
        />
        {state.errors?.size && (
          <p className="text-sm text-red-600">{state.errors.size}</p>
        )}

        <input
          name="category"
          placeholder="Category"
          className="w-full border rounded px-3 py-2"
          defaultValue={state.values?.category}
        />
        {state.errors?.category && (
          <p className="text-sm text-red-600">{state.errors.category}</p>
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
        {state.errors?.image && (
          <p className="text-sm text-red-600">{state.errors.image}</p>
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
