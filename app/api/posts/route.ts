import { NextResponse, NextRequest } from 'next/server'
import { client } from '@/lib/sanity'
import { requireAuth } from '@/lib/auth'
import slugify from 'slugify'

export async function POST(req: NextRequest) {
  // Temporar: dezactivat autentificarea pentru development
  // const authError = requireAuth(req)
  // if (authError) return authError
  try {
    const form = await req.formData()
    const title = String(form.get('title') || '').trim()
    const excerpt = String(form.get('excerpt') || '').trim() || null
    const content = String(form.get('content') || '').trim()

    const titleEn = String(form.get('titleEn') || '').trim() || null
    const excerptEn = String(form.get('excerptEn') || '').trim() || null
    const contentEn = String(form.get('contentEn') || '').trim() || null

    const image = (form.get('image') ? String(form.get('image')) : null) || null
    const publishedRaw = form.get('published')
    const published = publishedRaw ? (String(publishedRaw) === 'on' || String(publishedRaw) === 'true') : true

    if (!title || !content) {
      return NextResponse.json({ ok: false, error: 'Titlu și conținut obligatorii.' }, { status: 400 })
    }

    const base = slugify(title, { lower: true, strict: true }) || 'post'
    let slug = base
    let i = 1
    
    // Check if slug exists in Sanity
    while (await client.fetch(`*[_type == "post" && slug.current == "${slug}"][0]`)) {
      slug = `${base}-${i++}`
    }

    // Convert content to Sanity blocks format
    const contentBlocks = [
      {
        _type: 'block',
        _key: 'content-block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'content-span',
            text: content,
            marks: []
          }
        ],
        markDefs: []
      }
    ]

    const contentEnBlocks = contentEn ? [
      {
        _type: 'block',
        _key: 'content-en-block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'content-en-span',
            text: contentEn,
            marks: []
          }
        ],
        markDefs: []
      }
    ] : undefined

    await client.create({
      _type: 'post',
      title,
      excerpt,
      content: contentBlocks,
      titleEn,
      excerptEn,
      contentEn: contentEnBlocks,
      slug: {
        _type: 'slug',
        current: slug
      },
      mainImage: image ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: image
        }
      } : undefined,
      published,
    })
    return NextResponse.redirect(new URL('/admin?created=1', req.url))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false, error: 'Eroare server.' }, { status: 500 })
  }
}
