'use client'
import ImagePreview from './imagePreview'

import { useState } from 'react'

import { useCreateProduct } from '@/app/_hook/productsMutation'
import { Product } from '@/app/type/productType'
import { Button } from '@/components/ui/button'
import { string } from 'zod'

interface ProductFormProps {
  initialProduct?: Product
  onClose?: () => void
}

export default function ProductForm({
  initialProduct,
  onClose,
}: ProductFormProps) {
  const [resetImagePreview, setResetImagePreview] = useState(0)

  const mutation = useCreateProduct(
    initialProduct,
    setResetImagePreview,
    onClose
  )

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
      <form onSubmit={(e) => submit(e)} className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4">
          {initialProduct ? 'Edit Product' : 'Create Product'}
        </h2>

        <input
          name="title"
          placeholder="Title"
          className="w-full border rounded px-3 py-2 mb-4"
          defaultValue={initialProduct?.title}
        />
        {errorMessage?.title && (
          <p className="text-sm text-red-600">{errorMessage.title}</p>
        )}

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border rounded px-3 py-2 mb-4"
          defaultValue={initialProduct?.description}
          // rows:string="5"
          // cols:string="33"
        />
        {errorMessage?.description && (
          <p className="text-sm text-red-600">{errorMessage.description}</p>
        )}

        <div className="w-full flex">
          <div className="flex flex-col me-4">
            <input
              name="price"
              type="number"
              placeholder="Price"
              className="w-full border rounded px-3 py-2 mb-4 me-3"
              defaultValue={initialProduct?.price}
            />
            {errorMessage?.price && (
              <p className="text-sm text-red-600">{errorMessage.price}</p>
            )}
          </div>
          <div className="flex flex-col">
            <input
              name="totalQuantity"
              type="number"
              placeholder="Total Quantity"
              className="w-full border rounded px-3 py-2 mb-4"
              defaultValue={initialProduct?.totalQuantity}
            />
            {errorMessage?.totalQuantity && (
              <p className="text-sm text-red-600">
                {errorMessage?.totalQuantity}
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex ">
          <div className="flex flex-col me-4">
            <input
              name="size"
              placeholder="Size (e.g. S, M, L, XL)"
              className="w-full border rounded px-3 py-2 mb-4 me-4"
              defaultValue={initialProduct?.size}
            />
            {errorMessage?.size && (
              <p className="text-sm text-red-600">{errorMessage.size}</p>
            )}
          </div>

          <div className="flex flex-col">
            <input
              name="category"
              placeholder="Category"
              className="w-full border rounded px-3 py-2 mb-4"
              defaultValue={initialProduct?.category}
            />
            {errorMessage?.category && (
              <p className="text-sm text-red-600">{errorMessage?.category}</p>
            )}
          </div>
        </div>

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

        <Button type="submit">{isPending ? 'pending...' : 'Submit'}</Button>
      </form>
    </>
  )
}
