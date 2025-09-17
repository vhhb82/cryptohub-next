import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import SanityImage from '@/components/SanityImage'
import SanityContent from '@/components/SanityContent'

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const post = await client.fetch(`
    *[_type == "post" && slug.current == "${params.slug}" && published == true && !(_id in path("drafts.**"))][0]
  `)
  
  if (!post) return notFound()
  
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="opacity-60 text-sm">{new Date(post._createdAt).toLocaleString()}</p>
      {post.mainImage && (
        <SanityImage 
          image={post.mainImage} 
          alt={post.title} 
          width={800}
          height={400}
          className="rounded-2xl w-full" 
        />
      )}
      {post.excerpt && <p className="text-lg">{post.excerpt}</p>}
      <SanityContent content={post.content} />
    </article>
  )
}
