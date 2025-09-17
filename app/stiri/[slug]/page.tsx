import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import SanityImage from '@/components/SanityImage'
import SanityContent from '@/components/SanityContent'

export default async function NewsDetail({ params }: { params: { slug: string } }) {
  const item = await client.fetch(`
    *[_type == "news" && slug.current == "${params.slug}" && published == true && !(_id in path("drafts.**"))][0]
  `)
  
  if (!item) return notFound()
  
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{item.title}</h1>
      <p className="opacity-60 text-sm">{new Date(item._createdAt).toLocaleString()}</p>
      {item.mainImage && (
        <SanityImage 
          image={item.mainImage} 
          alt={item.title} 
          width={800}
          height={400}
          className="rounded-2xl w-full" 
        />
      )}
      {item.excerpt && <p className="text-lg">{item.excerpt}</p>}
      <SanityContent content={item.content} />
    </article>
  )
}
