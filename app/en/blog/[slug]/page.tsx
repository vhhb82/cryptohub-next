import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function BlogDetailEn({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } })
  if (!post || !post.published) return notFound()
  const title = post.titleEn || post.title
  const excerpt = post.excerptEn || post.excerpt
  const content = post.contentEn || post.content
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="opacity-60 text-sm">{new Date(post.createdAt).toLocaleString('en-US')}</p>
      {post.image && <img src={post.image} alt={title} className="rounded-2xl w-full" />}
      {excerpt && <p className="text-lg">{excerpt}</p>}
      <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
    </article>
  )
}
