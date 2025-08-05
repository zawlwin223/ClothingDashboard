'use client'
import ImagePreview from './imagePreview'

import { useState } from 'react'

import { useCreateProduct } from '@/app/_hook/productsMutation'
import { Product } from '@/app/type/productType'
import { Button } from '@/components/ui/button'
import { validateForm } from '@/app/_utils/validateForm'
import { ProductInput } from '@/app/_libs/formValidateSchema'
import { error } from 'console'
// import { string } from 'zod'

interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

interface ProductFormProps {
  initialProduct?: Product
  onClose?: () => void
}

export default function ProductForm({
  initialProduct,
  onClose,
}: ProductFormProps) {
  const [resetImagePreview, setResetImagePreview] = useState(0)
  const [validationError, setValidationError] = useState<any>(false)

  const mutation = useCreateProduct(
    initialProduct,
    setResetImagePreview,
    onClose
  )

  const { isPending } = mutation

  function submit(e: SubmitEvent): void {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const { errors, values } = validateForm(formData)
    console.log(errors)
    if (errors) {
      setValidationError(errors)
      return
    } else {
      mutation.mutate(values as ProductInput)
    }
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
        {validationError?.title && (
          <p className="text-sm text-red-600">{validationError.title}</p>
        )}

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border rounded px-3 py-2 mb-4"
          defaultValue={initialProduct?.description}
          // rows:string="5"
          // cols:string="33"
        />
        {validationError?.description && (
          <p className="text-sm text-red-600">{validationError.description}</p>
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
            {validationError?.price && (
              <p className="text-sm text-red-600">{validationError.price}</p>
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
            {validationError?.totalQuantity && (
              <p className="text-sm text-red-600">
                {validationError?.totalQuantity}
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
            {validationError?.size && (
              <p className="text-sm text-red-600">{validationError.size}</p>
            )}
          </div>

          <div className="flex flex-col">
            <input
              name="category"
              placeholder="Category"
              className="w-full border rounded px-3 py-2 mb-4"
              defaultValue={initialProduct?.category}
            />
            {validationError?.category && (
              <p className="text-sm text-red-600">
                {validationError?.category}
              </p>
            )}
          </div>
        </div>

        <ImagePreview
          initialImg={
            initialProduct
              ? typeof initialProduct.image === 'string'
                ? initialProduct.image
                : initialProduct.image instanceof File
                  ? ''
                  : initialProduct.image.url
              : ''
          }
          key={resetImagePreview}></ImagePreview>
        {validationError?.image && (
          <p className="text-sm text-red-600">{validationError?.image}</p>
        )}

        <Button type="submit">{isPending ? 'pending...' : 'Submit'}</Button>
      </form>
    </>
  )
}
