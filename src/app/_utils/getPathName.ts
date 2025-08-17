'use client'
import { usePathname } from 'next/navigation'
export function getPathName() {
  const pathName = usePathname()
  return pathName
}
