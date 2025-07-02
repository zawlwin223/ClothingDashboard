'use server'
import { redirect } from 'next/navigation'

export async function redirectTo(path: string) {
  redirect(path)
}
