import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const authError = requireAuth(req)
  if (authError) return authError
  try {
    const form = await req.formData()
    const platform = String(form.get('platform') || '').trim().toLowerCase()
    const videoId = String(form.get('videoId') || '').trim()
    const title = String(form.get('title') || '').trim()
    const url = (form.get('url') ? String(form.get('url')) : '').trim() || null
    const publishedRaw = form.get('published')
    const published = !!publishedRaw && (String(publishedRaw) === 'on' || String(publishedRaw) === 'true')

    if (!platform || !videoId || !title) {
      return NextResponse.json({ ok: false, error: 'Platformă, ID video și titlu sunt obligatorii.' }, { status: 400 })
    }
    if (!['youtube', 'tiktok'].includes(platform)) {
      return NextResponse.json({ ok: false, error: 'Platforma trebuie să fie youtube sau tiktok.' }, { status: 400 })
    }

    await prisma.video.create({ data: { platform, videoId, title, url: url || undefined, published } })
    return NextResponse.redirect(new URL('/admin?created=1', req.url))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false, error: 'Eroare server.' }, { status: 500 })
  }
}
