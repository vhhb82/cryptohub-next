import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { secret } = await req.json()
    const expectedSecret = process.env.ADMIN_SECRET || 'admin123'
    
    if (secret === expectedSecret) {
      // Setează un cookie simplu pentru sesiune
      const response = NextResponse.json({ success: true })
      response.cookies.set('admin-auth', secret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 // 24 ore
      })
      return response
    }
    
    return NextResponse.json({ error: 'Secret incorect' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 })
  }
}

