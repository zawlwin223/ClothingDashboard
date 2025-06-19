'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classes from './navStyle.module.css'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="pt-7  flex-1 bg-black text-white h-screen font-bold text-[15px] px-5">
      <h1 className="text-2xl ">Admin Dashboard</h1>
      <ul>
        <li className="mt-5">
          <Link
            href="/dashboard"
            className={pathname === '/dashboard' ? classes.active : ''}>
            Dashboard
          </Link>
        </li>
        <li className="mt-5">
          <Link
            href="/products"
            className={pathname === '/products' ? classes.active : ''}>
            Products
          </Link>
        </li>
        <li className="mt-5">
          <Link
            href="/addProduct"
            className={pathname === '/addProduct' ? classes.active : ''}>
            Add Product
          </Link>
        </li>
      </ul>
    </nav>
  )
}
