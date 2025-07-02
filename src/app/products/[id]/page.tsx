import ProductForm from '@/app/_components/products/productForm'
import { getDataFromFB } from '@/app/_utils/firebase'
import { Providers } from '@/app/providers'

interface PageProps {
  params: { id: string }
}

interface ProductData {
  id: string
  title: string
  description: string
  price: string
  totalQuantity: string
  size: string
  category: string
  image: string | { url: string; public_id: string }
}

export default async function ProductEditPage({ params }: PageProps) {
  const productId = params.id
  const data = (await getDataFromFB(productId)) as Partial<ProductData>
  console.log('Initial Product:', data)

  const initialProduct: ProductData = {
    id: data?.id || productId,
    title: data?.title || '',
    description: data?.description || '',
    price: data?.price || '',
    totalQuantity: data?.totalQuantity || '',
    size: data?.size || '',
    category: data?.category || '',
    image: data?.image || '',
  }

  return (
    <Providers>
      <ProductForm initialProduct={initialProduct}></ProductForm>
    </Providers>
  )
}
