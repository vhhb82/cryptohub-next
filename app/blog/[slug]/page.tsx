import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } })
  if (!post || !post.published) return notFound()
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="opacity-60 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
      {post.image && <img src={post.image} alt={post.title} className="rounded-2xl w-full" />}
      {post.excerpt && <p className="text-lg">{post.excerpt}</p>}
      <div className="whitespace-pre-wrap leading-relaxed">{post.content}</div>
    </article>
  )
}
