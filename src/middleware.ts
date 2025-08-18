'use server'
import { NextRequest, NextResponse } from 'next/server'
// import { adminFB } from './app/_libs/fireBaseAdmin'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/orders', '/products', '/purchaseRate'],
}
