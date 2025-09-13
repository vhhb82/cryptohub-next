import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const hp = String(form.get('website') || '').trim()
    if (hp) return NextResponse.redirect(new URL('/contact?sent=1', req.url))

    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const subject = String(form.get('subject') || '').trim() || null
    const message = String(form.get('message') || '').trim()

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Completează nume, email și mesaj.' }, { status: 400 })
    }

    await prisma.contactMessage.create({ data: { name, email, subject: subject || undefined, message } })
    return NextResponse.redirect(new URL('/contact?sent=1', req.url))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false, error: 'Eroare server.' }, { status: 500 })
  }
}
