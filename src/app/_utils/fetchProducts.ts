'use server'
import { fetchDataFromFB } from '@/app/_utils/firebase'
const urls = [
  "https://fakestoreapi.com/products/category/men's clothing",
  "https://fakestoreapi.com/products/category/women's clothing",
  'https://fakestoreapi.com/products/category/jewelery',
]

interface Product {
  id: string | number
  title: string
  price: number
  category: string
  description: string
  image: string | { url: string; public_id: string }
}

export async function fetchAllProducts() {
  const fetchFakeStoreProducts = async (url: string): Promise<Product[]> => {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch ${url}`)
    return res.json()
  }

  const productsFB = await fetchDataFromFB()
  const [men, women, jewelry] = await Promise.all(
    urls.map((url) => fetchFakeStoreProducts(url))
  )
  return [...productsFB, ...men, ...women, ...jewelry]
}
