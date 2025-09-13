# Applies patch 13 (EN perks for exchanges, Admin Edit + pagination, SEO sitemap)
$root = (Get-Location).Path
function Write-Text($path, $content) {
  $full = Join-Path $root $path
  $dir  = Split-Path $full -Parent
  if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  Set-Content -Path $full -Value $content -Encoding UTF8
  Write-Host "✔ Wrote $path"
}

# 1) data/exchanges_en.ts
Write-Text "data/exchanges_en.ts" @'
export type Exchange = {
  id: string
  name: string
  url: string
  perks: string[]
}

export const exchangesEn: Exchange[] = [
  { id: 'binance', name: 'Binance', url: 'https://www.binance.com/activity/referral-entry/CPA?ref=CPA_008BUATWJ6', perks: ['Largest volume', '600+ coins', 'Fees ~0.1%', 'Bonus up to 100 USDT'] },
  { id: 'bybit',   name: 'Bybit',   url: 'https://www.bybit.com/invite?ref=ZZWPQQ', perks: ['Popular derivatives', 'Good liquidity', 'Frequent bonuses'] },
  { id: 'okx',     name: 'OKX',     url: 'https://okx.com/join/65725967', perks: ['Spot + Futures', 'Launchpad/Jumpstart', 'Powerful apps'] },
  { id: 'kucoin',  name: 'KuCoin',  url: 'https://www.kucoin.com/r/rf/XN9WZ9NQ', perks: ['Wide coin list', 'Trading bots', 'Decent fees'] },
  { id: 'mexc',    name: 'MEXC',    url: 'https://promote.mexc.com/r/G97gjvQX', perks: ['New listings often', 'Frequent promos', 'Competitive futures'] },
  { id: 'bitget',  name: 'Bitget',  url: 'https://www.bitget.com/ru/referral/register?clacCode=QFKSAFPY', perks: ['Copy trading', 'Frequent bonuses', 'Clear UI'] },
  { id: 'phemex',  name: 'Phemex',  url: 'https://phemex.com/ru/account/referral/invite-friends-entry?referralCode=I3HKW8', perks: ['Perpetuals', 'Advanced tools', 'Bonus campaigns'] },
  { id: 'bitmart', name: 'BitMart', url: 'https://www.bitmart.com/invite/cBhfB3/en', perks: ['Altcoin listings', 'Sign-up bonuses'] },
  { id: 'lbank',   name: 'LBank',   url: 'https://lbank.com/ref/58RDR', perks: ['Quick listings', 'Low fees'] },
  { id: 'pionex',  name: 'Pionex',  url: 'https://www.pionex.com/register', perks: ['Built-in bots', 'Easy DCA/GRID'] },
]
'@

# 2) app/en/exchanges/page.tsx
Write-Text "app/en/exchanges/page.tsx" @'
import { exchangesEn } from '@/data/exchanges_en'

export const metadata = { title: 'Exchanges • CryptoHub' }

export default function ExchangesEnPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Exchanges</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exchangesEn.map(x => (
          <div key={x.id} className="card">
            <div className="text-lg font-semibold">{x.name}</div>
            <ul className="list-disc pl-5 opacity-80">
              {x.perks.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
            <a className="btn mt-3" href={x.url} target="_blank">Open</a>
          </div>
        ))}
      </div>
    </div>
  )
}
'@

# 3) components/Pagination.tsx
Write-Text "components/Pagination.tsx" @'
'use client'
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'

export default function Pagination({ page, hasNext } : { page: number, hasNext: boolean }) {
  const pathname = usePathname() || '/admin'
  const sp = useSearchParams()
  const mk = (p: number) => {
    const params = new URLSearchParams(sp.toString())
    if (p <= 1) params.delete('page') else params.set('page', String(p))
    return `${pathname}?${params.toString()}`.replace(/\?$/, '')
  }
  return (
    <div className="flex items-center gap-3">
      <Link className={`btn ${page <= 1 ? 'pointer-events-none opacity-50' : ''}`} href={mk(page - 1)}>« Înapoi</Link>
      <span className="opacity-70">Pagina {page}</span>
      <Link className={`btn ${hasNext ? '' : 'pointer-events-none opacity-50'}`} href={mk(page + 1)}>Înainte »</Link>
    </div>
  )
}
'@

# 4) Admin edit pages
Write-Text "app/admin/news/[id]/edit/page.tsx" @'
import AutoTranslateEn from '@/components/AutoTranslateEn'
import DeleteButton from '@/components/DeleteButton'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditNews({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const item = await prisma.news.findUnique({ where: { id } })
  if (!item) return notFound()

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Editează Știrea</h1>
        <div className="flex gap-2">
          <Link href="/admin" className="btn">← Înapoi</Link>
          <DeleteButton action={`/api/news/${id}`} />
        </div>
      </div>

      <form action={`/api/news/${id}`} method="POST" className="space-y-6">
        <input type="hidden" name="_method" value="PATCH" />

        <section className="space-y-4 card">
          <h2 className="text-lg font-semibold">Română</h2>
          <div><label className="label">Titlu</label><input className="input" name="title" defaultValue={item.title} required /></div>
          <div><label className="label">Rezumat</label><input className="input" name="excerpt" defaultValue={item.excerpt || ''} /></div>
          <div><label className="label">URL imagine</label><input className="input" name="image" defaultValue={item.image || ''} /></div>
          <div><label className="label">Conținut</label><textarea className="input" name="content" rows={10} defaultValue={item.content} /></div>
        </section>

        <section className="space-y-4 card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">English</h2>
            <AutoTranslateEn />
          </div>
          <div><label className="label">Title (EN)</label><input className="input" name="titleEn" defaultValue={item.titleEn || ''} /></div>
          <div><label className="label">Excerpt (EN)</label><input className="input" name="excerptEn" defaultValue={item.excerptEn || ''} /></div>
          <div><label className="label">Content (EN)</label><textarea className="input" name="contentEn" rows={10} defaultValue={item.contentEn || ''} /></div>
        </section>

        <label className="flex items-center gap-2"><input type="checkbox" name="published" defaultChecked={item.published} /><span>Publicat</span></label>
        <button className="btn" type="submit">Salvează</button>
      </form>
    </div>
  )
}
'@

Write-Text "app/admin/posts/[id]/edit/page.tsx" @'
import AutoTranslateEn from '@/components/AutoTranslateEn'
import DeleteButton from '@/components/DeleteButton'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditPost({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const item = await prisma.post.findUnique({ where: { id } })
  if (!item) return notFound()

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Editează Postarea</h1>
        <div className="flex gap-2">
          <Link href="/admin" className="btn">← Înapoi</Link>
          <DeleteButton action={`/api/posts/${id}`} />
        </div>
      </div>

      <form action={`/api/posts/${id}`} method="POST" className="space-y-6">
        <input type="hidden" name="_method" value="PATCH" />

        <section className="space-y-4 card">
          <h2 className="text-lg font-semibold">Română</h2>
          <div><label className="label">Titlu</label><input className="input" name="title" defaultValue={item.title} required /></div>
          <div><label className="label">Rezumat</label><input className="input" name="excerpt" defaultValue={item.excerpt || ''} /></div>
          <div><label className="label">URL imagine</label><input className="input" name="image" defaultValue={item.image || ''} /></div>
          <div><label className="label">Conținut</label><textarea className="input" name="content" rows={10} defaultValue={item.content} /></div>
        </section>

        <section className="space-y-4 card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">English</h2>
            <AutoTranslateEn />
          </div>
          <div><label className="label">Title (EN)</label><input className="input" name="titleEn" defaultValue={item.titleEn || ''} /></div>
          <div><label className="label">Excerpt (EN)</label><input className="input" name="excerptEn" defaultValue={item.excerptEn || ''} /></div>
          <div><label className="label">Content (EN)</label><textarea className="input" name="contentEn" rows={10} defaultValue={item.contentEn || ''} /></div>
        </section>

        <label className="flex items-center gap-2"><input type="checkbox" name="published" defaultChecked={item.published} /><span>Publicat</span></label>
        <button className="btn" type="submit">Salvează</button>
      </form>
    </div>
  )
}
'@

Write-Text "app/admin/videos/[id]/edit/page.tsx" @'
import DeleteButton from '@/components/DeleteButton'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditVideo({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const item = await prisma.video.findUnique({ where: { id } })
  if (!item) return notFound()

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Editează Video</h1>
        <div className="flex gap-2">
          <Link href="/admin" className="btn">← Înapoi</Link>
          <DeleteButton action={`/api/videos/${id}`} />
        </div>
      </div>

      <form action={`/api/videos/${id}`} method="POST" className="space-y-4">
        <input type="hidden" name="_method" value="PATCH" />
        <div>
          <label className="label">Platformă</label>
          <select name="platform" className="input" required defaultValue={item.platform}>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>
        <div>
          <label className="label">ID Video</label>
          <input className="input" name="videoId" required defaultValue={item.videoId} />
        </div>
        <div>
          <label className="label">Titlu</label>
          <input className="input" name="title" required defaultValue={item.title} />
        </div>
        <div>
          <label className="label">URL original (opțional)</label>
          <input className="input" name="url" defaultValue={item.url || ''} />
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="published" defaultChecked={item.published} />
          <span>Publicat</span>
        </label>
        <button className="btn" type="submit">Salvează</button>
      </form>
    </div>
  )
}
'@

# 5) API update handlers (PATCH/DELETE)
Write-Text "app/api/news/[id]/route.ts" @'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(_req: Request, context: { params: { id: string } }) {
  const idNum = Number(context.params.id)
  if (!idNum) return NextResponse.json({ ok: false, error: 'ID invalid.' }, { status: 400 })
  try {
    await prisma.news.delete({ where: { id: idNum } })
    return NextResponse.redirect(new URL('/admin?deleted=1', process.env.SITE_URL || 'http://localhost:3000'))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false, error: 'Nu s-a putut șterge.' }, { status: 500 })
  }
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const idNum = Number(context.params.id)
  if (!idNum) return NextResponse.json({ ok: false, error: 'ID invalid.' }, { status: 400 })
  try {
    const form = await req.formData()
    let data: any = {}
    if (form.has('published')) data.published = String(form.get('published')) === 'on' || String(form.get('published')) === 'true'
    data.title = String(form.get('title') || '').trim()
    data.excerpt = (form.get('excerpt') ? String(form.get('excerpt')) : '') || null
    data.content = String(form.get('content') || '').trim()
    data.titleEn = (form.get('titleEn') ? String(form.get('titleEn')) : '') || null
    data.excerptEn = (form.get('excerptEn') ? String(form.get('excerptEn')) : '') || null
    data.contentEn = (form.get('contentEn') ? String(form.get('contentEn')) : '') || null
    data.image = (form.get('image') ? String(form.get('image')) : '') || null
    await prisma.news.update({ where: { id: idNum }, data })
    return NextResponse.redirect(new URL('/admin?updated=1', process.env.SITE_URL || 'http://localhost:3000'))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false, error: 'Nu s-a putut actualiza.' }, { status: 500 })
  }
}

export async function POST(req: Request, ctx: { params: { id: string } }) {
  const form = await req.formData()
  const method = String(form.get('_method') || '').toUpperCase()
  if (method === 'DELETE') return DELETE(req, ctx)
  if (method === 'PATCH') return PATCH(req, ctx)
  return NextResponse.json({ ok: false, error: 'Metodă neacceptată.' }, { status: 405 })
}
'@

Write-Text "app/api/posts/[id]/route.ts" @'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(_req: Request, context: { params: { id: string } }) {
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

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const idNum = Number(context.params.id)
  if (!idNum) return NextResponse.json({ ok: false, error: 'ID invalid.' }, { status: 400 })
  try {
    const form = await req.formData()
    let data: any = {}
    if (form.has('published')) data.published = String(form.get('published')) === 'on' || String(form.get('published')) === 'true'
    data.title = String(form.get('title') || '').trim()
    data.excerpt = (form.get('excerpt') ? String(form.get('excerpt')) : '') || null
    data.content = String(form.get('content') || '').trim()
    data.titleEn = (form.get('titleEn') ? String(form.get('titleEn')) : '') || null
    data.excerptEn = (form.get('excerptEn') ? String(form.get('excerptEn')) : '') || null
    data.contentEn = (form.get('contentEn') ? String(form.get('contentEn')) : '') || null
    data.image = (form.get('image') ? String(form.get('image')) : '') || null
    await prisma.post.update({ where: { id: idNum }, data })
    return NextResponse.redirect(new URL('/admin?updated=1', process.env.SITE_URL || 'http://localhost:3000'))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false, error: 'Nu s-a putut actualiza.' }, { status: 500 })
  }
}

export async function POST(req: Request, ctx: { params: { id: string } }) {
  const form = await req.formData()
  const method = String(form.get('_method') || '').toUpperCase()
  if (method === 'DELETE') return DELETE(req, ctx)
  if (method === 'PATCH') return PATCH(req, ctx)
  return NextResponse.json({ ok: false, error: 'Metodă neacceptată.' }, { status: 405 })
}
'@

Write-Text "app/api/videos/[id]/route.ts" @'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(_req: Request, context: { params: { id: string } }) {
  const idNum = Number(context.params.id)
  if (!idNum) return NextResponse.json({ ok: false, error: 'ID invalid.' }, { status: 400 })
  try {
    await prisma.video.delete({ where: { id: idNum } })
    return NextResponse.redirect(new URL('/admin?deleted=1', process.env.SITE_URL || 'http://localhost:3000'))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false, error: 'Nu s-a putut șterge.' }, { status: 500 })
  }
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const idNum = Number(context.params.id)
  if (!idNum) return NextResponse.json({ ok: false, error: 'ID invalid.' }, { status: 400 })
  try {
    const form = await req.formData()
    let data: any = {}
    if (form.has('published')) data.published = String(form.get('published')) === 'on' || String(form.get('published')) === 'true'
    data.platform = String(form.get('platform') || '').trim()
    data.videoId = String(form.get('videoId') || '').trim()
    data.title = String(form.get('title') || '').trim()
    data.url = (form.get('url') ? String(form.get('url')) : '') || null
    await prisma.video.update({ where: { id: idNum }, data })
    return NextResponse.redirect(new URL('/admin?updated=1', process.env.SITE_URL || 'http://localhost:3000'))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false, error: 'Nu s-a putut actualiza.' }, { status: 500 })
  }
}

export async function POST(req: Request, ctx: { params: { id: string } }) {
  const form = await req.formData()
  const method = String(form.get('_method') || '').toUpperCase()
  if (method === 'DELETE') return DELETE(req, ctx)
  if (method === 'PATCH') return PATCH(req, ctx)
  return NextResponse.json({ ok: false, error: 'Metodă neacceptată.' }, { status: 405 })
}
'@

# 6) Admin home with pagination + edit links
Write-Text "app/admin/page.tsx" @'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import DeleteButton from '@/components/DeleteButton'
import Pagination from '@/components/Pagination'

export default async function AdminHome({ searchParams }: { searchParams: { [k: string]: string } }) {
  const page = Math.max(1, Number(searchParams.page || 1))
  const take = 10
  const skip = (page - 1) * take

  const [news, posts, videos, counts] = await Promise.all([
    prisma.news.findMany({ orderBy: { createdAt: 'desc' }, skip, take }),
    prisma.post.findMany({ orderBy: { createdAt: 'desc' }, skip, take }),
    prisma.video.findMany({ orderBy: { createdAt: 'desc' }, skip, take }),
    Promise.all([prisma.news.count(), prisma.post.count(), prisma.video.count()])
  ])

  const hasNext = (total: number) => skip + take < total
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin</h1>
        <div className="flex gap-3">
          <Link href="/admin/news/new" className="btn">+ Știre</Link>
          <Link href="/admin/posts/new" className="btn">+ Postare</Link>
          <Link href="/admin/videos/new" className="btn">+ Video</Link>
        </div>
      </div>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Știri</h2>
          <Pagination page={page} hasNext={hasNext(counts[0])} />
        </div>
        <ul className="space-y-1">
          {news.length === 0 && <p className="opacity-70">Nimic încă.</p>}
          {news.map((n) => (
            <li key={n.id} className="flex items-center gap-3">
              <Link href={`/stiri/${n.slug}`} className="hover:underline flex-1">{n.title}</Link>
              <span className="opacity-60">{n.published ? 'publicat' : 'draft'}</span>
              <Link href={`/admin/news/${n.id}/edit`} className="btn">Editează</Link>
              <DeleteButton action={`/api/news/${n.id}`} />
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Postări</h2>
          <Pagination page={page} hasNext={hasNext(counts[1])} />
        </div>
        <ul className="space-y-1">
          {posts.length === 0 && <p className="opacity-70">Nimic încă.</p>}
          {posts.map((p) => (
            <li key={p.id} className="flex items-center gap-3">
              <Link href={`/blog/${p.slug}`} className="hover:underline flex-1">{p.title}</Link>
              <span className="opacity-60">{p.published ? 'publicat' : 'draft'}</span>
              <Link href={`/admin/posts/${p.id}/edit`} className="btn">Editează</Link>
              <DeleteButton action={`/api/posts/${p.id}`} />
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Video</h2>
          <Pagination page={page} hasNext={hasNext(counts[2])} />
        </div>
        <ul className="space-y-1">
          {videos.length === 0 && <p className="opacity-70">Nimic încă.</p>}
          {videos.map((v) => (
            <li key={v.id} className="flex items-center gap-3">
              <span className="opacity-60">[{v.platform}]</span>
              <span className="flex-1">{v.title}</span>
              <span className="opacity-60">{v.published ? 'publicat' : 'draft'}</span>
              <Link href={`/admin/videos/${v.id}/edit`} className="btn">Editează</Link>
              <DeleteButton action={`/api/videos/${v.id}`} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
'@

# 7) SEO Sitemap
Write-Text "app/sitemap.ts" @'
import { prisma } from '@/lib/prisma'

export default async function sitemap() {
  const site = process.env.SITE_URL || 'http://localhost:3000'

  const staticRo = ['/', '/stiri', '/blog', '/burse', '/produse', '/video', '/despre', '/contact']
  const staticEn = ['/en/news', '/en/blog', '/en/exchanges', '/en/products', '/en/video', '/en/about', '/en/contact']

  const [news, posts, videos] = await Promise.all([
    prisma.news.findMany({ where: { published: true }, select: { slug: true, updatedAt: true }, orderBy: { updatedAt: 'desc' } }),
    prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true }, orderBy: { updatedAt: 'desc' } }),
    prisma.video.findMany({ where: { published: true }, select: { id: true, createdAt: true }, orderBy: { createdAt: 'desc' } }),
  ])

  const map = (path: string, lastmod?: Date) => ({
    url: `${site}${path}`, lastModified: lastmod || new Date(), changeFrequency: 'daily', priority: 0.7,
  })

  const roDynamic = [
    ...news.map(n => map(`/stiri/${n.slug}`, n.updatedAt)),
    ...posts.map(p => map(`/blog/${p.slug}`, p.updatedAt)),
  ]
  const enDynamic = [
    ...news.map(n => map(`/en/news/${n.slug}`, n.updatedAt)),
    ...posts.map(p => map(`/en/blog/${p.slug}`, p.updatedAt)),
  ]
  const videoDynamic = [
    ...videos.map(v => map(`/video`, v.createdAt)),
  ]

  return [
    ...staticRo.map(p => map(p)),
    ...staticEn.map(p => map(p)),
    ...roDynamic, ...enDynamic, ...videoDynamic,
  ]
}
'@

# 8) README tip
Write-Text "README-seo-admin.txt" @'
SEO + Admin patch (13):
- Add SITE_URL to .env.local, e.g. SITE_URL="https://your-domain.com"
- Admin lists support pagination via ?page=2 etc.
'@

Write-Host "`nDONE. Now run: npm run dev"
