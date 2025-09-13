import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const authError = requireAuth(req)
  if (authError) return authError
  const idNum = Number(context.params.id)
  if (!idNum) return NextResponse.json({ ok: false, error: 'ID invalid.' }, { status: 400 })
  try {
    await prisma.post.delete({ where: { id: idNum } })
    return NextResponse.redirect(new URL('/admin?deleted=1', process.env.SITE_URL || 'http://localhost:3000'))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false, error: 'Nu s-a putut șterge.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest, ctx: any) {
  const authError = requireAuth(req)
  if (authError) return authError
  const form = await req.formData()
  const method = String(form.get('_method') || '').toUpperCase()
  if (method === 'DELETE') return DELETE(req, ctx)
  return NextResponse.json({ ok: false, error: 'Metodă neacceptată.' }, { status: 405 })
}
