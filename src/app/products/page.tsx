'use client' // import ProductLists from '../_components/products/product-lists-table'
import { Providers } from '../providers'
import { Suspense } from 'react'
// import { fetchOrders } from '../_utils/firebase'
import { Button } from '@/components/ui/button'
import ProductListsTable from '../_components/products/product-lists-table'
import { useState } from 'react'
import Modal from '../_components/modal'
import ProductForm from '../_components/products/productForm'
// Import the Product type
import type { Product } from '../_components/products/product-lists-table'

export default function Products() {
  const [addProductFormModal, setAddProductFormModal] = useState(false)
  const [editProductFormModal, setEditProductFormModal] =
    useState<Product | null>(null)
  return (
    <div className="w-full p-8 relative">
      <div className="flex justify-between mb-6 items-center ">
        <h1 className="font-bold  text-[30px]">Product Management</h1>
      </div>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductListsTable
          setProductFormModal={(booleanData) =>
            setAddProductFormModal(booleanData)
          }
          setEditProductFormModal={(data) => setEditProductFormModal(data)}
        />
      </Suspense>
      {addProductFormModal && (
        <Modal onClose={() => setAddProductFormModal(false)}>
          <ProductForm
            onClose={() => setAddProductFormModal(false)}></ProductForm>
        </Modal>
      )}

      {editProductFormModal && (
        <Modal onClose={() => setEditProductFormModal(null)}>
          <ProductForm
            onClose={() => setEditProductFormModal(null)}
            initialProduct={editProductFormModal}></ProductForm>
        </Modal>
      )}
    </div>
  )
}
