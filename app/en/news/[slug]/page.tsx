import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function NewsDetailEn({ params }: { params: { slug: string } }) {
  const item = await prisma.news.findUnique({ where: { slug: params.slug } })
  if (!item || !item.published) return notFound()
  const title = item.titleEn || item.title
  const excerpt = item.excerptEn || item.excerpt
  const content = item.contentEn || item.content
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="opacity-60 text-sm">{new Date(item.createdAt).toLocaleString('en-US')}</p>
      {item.image && <img src={item.image} alt={title} className="rounded-2xl w-full" />}
      {excerpt && <p className="text-lg">{excerpt}</p>}
      <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
    </article>
  )
}
