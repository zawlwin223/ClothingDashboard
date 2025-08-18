'use client' // import ProductLists from '../_components/products/product-lists-table'
// import { Providers } from '../providers'
import { Suspense } from 'react'
import ProductListsTable from '@/app/_components/products/product-lists-table'
import { useState } from 'react'
import Modal from '@/app/_components/modal'
import ProductForm from '@/app/_components/products/productForm'
import { Product } from '@/app/_type/productType'
import { Card } from '@/components/ui/card'

export default function Products() {
  const [addProductFormModal, setAddProductFormModal] = useState(false)
  const [editProductFormModal, setEditProductFormModal] =
    useState<Product | null>(null)
  return (
    <div className="w-full p-8 mt-2 relative">
      <Card className="px-9 gap-0">
        <div className="flex justify-between items-center ">
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
      </Card>
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
