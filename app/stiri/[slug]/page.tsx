import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function NewsDetail({ params }: { params: { slug: string } }) {
  const item = await prisma.news.findUnique({ where: { slug: params.slug } })
  if (!item || !item.published) return notFound()
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{item.title}</h1>
      <p className="opacity-60 text-sm">{new Date(item.createdAt).toLocaleString()}</p>
      {item.image && <img src={item.image} alt={item.title} className="rounded-2xl w-full" />}
      {item.excerpt && <p className="text-lg">{item.excerpt}</p>}
      <div className="whitespace-pre-wrap leading-relaxed">{item.content}</div>
    </article>
  )
}
