import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import slugify from 'slugify'

export async function POST(req: NextRequest) {
  // Temporar: dezactivat autentificarea pentru development
  // const authError = requireAuth(req)
  // if (authError) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }
  try {
    const form = await req.formData()
    
    // Debug: log all form data
    console.log('API received form data:');
    for (const [key, value] of form.entries()) {
      console.log(`${key}:`, value);
    }
    
    const title = String(form.get('title') || '').trim()
    const excerpt = String(form.get('excerpt') || '').trim() || null
    const content = String(form.get('content') || '').trim()

    const titleEn = String(form.get('titleEn') || '').trim() || null
    const excerptEn = String(form.get('excerptEn') || '').trim() || null
    const contentEn = String(form.get('contentEn') || '').trim() || null

    const image = (form.get('image') ? String(form.get('image')) : null) || null
    console.log('Image value:', image);
    const publishedRaw = form.get('published')
    const published = publishedRaw ? (String(publishedRaw) === 'on' || String(publishedRaw) === 'true') : true

    if (!title || !content) {
      return NextResponse.json({ ok: false, error: 'Titlu și conținut obligatorii.' }, { status: 400 })
    }

    const base = slugify(title, { lower: true, strict: true }) || 'stire'
    let slug = base
    let i = 1
    while (await prisma.news.findUnique({ where: { slug } })) {
      slug = `${base}-${i++}`
    }

    await prisma.news.create({
      data: {
        title, excerpt: excerpt || undefined, content,
        titleEn: titleEn || undefined, excerptEn: excerptEn || undefined, contentEn: contentEn || undefined,
        image: image || undefined, published, slug
      }
    })
    return NextResponse.json({ success: true, redirect: '/admin?created=1' })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false, error: 'Eroare server.' }, { status: 500 })
  }
}
