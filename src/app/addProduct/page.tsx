'use client'
import ProductForm from '../_components/products/productForm'
import { Suspense } from 'react'
import { Providers } from '../providers'

export default function AddProduct() {
  return (
    <div className="flex">
      <Providers>
        <Suspense fallback={<div>Loading form...</div>}>
          <ProductForm></ProductForm>
        </Suspense>
      </Providers>
    </div>
  )
}
