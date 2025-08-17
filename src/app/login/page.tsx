'use client'

import { useMutation } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { redirectTo } from '../_utils/redirect'
import { useState } from 'react'

export default function Login() {
  const [error, setError] = useState<String>()
  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) => {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        throw new Error('Email or Password incorrect')
      }

      return res.json()
    },
    onSuccess: (data) => {
      redirectTo('/')
    },
    onError: (err) => {
      console.log(err.message)
      setError(err.message)
    },
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    mutation.mutate({ email, password }) // ✅ pass plain data
  }

  return (
    <div className="w-[500px]">
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-700">{error}</p>}
        <Input type="email" name="email" required />
        <Input type="password" name="password" className="my-3" required />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  )
}
