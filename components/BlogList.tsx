import BlogCard from "@/components/BlogCard"
import { client } from "@/lib/sanity"

export default async function BlogList({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const posts = await client.fetch(`
    *[_type == "post" && published == true && !(_id in path("drafts.**"))] | order(_createdAt desc) [0...30]
  `)
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p: any) => (
        <BlogCard 
          key={p._id} 
          href={lang === "en" ? `/en/blog/${p.slug.current}` : `/blog/${p.slug.current}`}
          title={lang === "en" ? (p.titleEn || p.title) : p.title}
          excerpt={lang === "en" ? (p.excerptEn || p.excerpt) : p.excerpt}
          image={p.mainImage || undefined} 
          date={p._createdAt} 
        />
      ))}
    </div>
  )
}