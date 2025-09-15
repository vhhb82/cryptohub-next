import { NextRequest } from 'next/server'

export function checkAuth(req: NextRequest): boolean {
  // Verifică dacă există cookie-ul de autentificare
  const authCookie = req.cookies.get('admin-auth')?.value
  const expectedAuth = process.env.ADMIN_SECRET || 'admin123'
  
  return authCookie === expectedAuth
}

export function requireAuth(req: NextRequest): Response | null {
  if (!checkAuth(req)) {
    return new Response('Unauthorized', { 
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  return null
}
