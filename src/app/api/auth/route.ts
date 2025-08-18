import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Call Firebase REST API
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    )

    const data = await res.json()

    if (!res.ok) {
      // Firebase sends error messages like EMAIL_NOT_FOUND, INVALID_PASSWORD
      return NextResponse.json(
        { error: data.error?.message || 'Email and Password Incorrect' },
        { status: 400 }
      )
    }

    // Store ID token in HTTP-only cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set('token', data.idToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: Number(data.expiresIn), // token expiration in seconds
    })

    return response
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Email and Password Incorrect' },
      { status: 500 }
    )
  }
}
