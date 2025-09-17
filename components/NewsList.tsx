import NewsCard from "@/components/NewsCard"
import { client } from "@/lib/sanity"

export default async function NewsList({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const items = await client.fetch(`
    *[_type == "news" && published == true && !(_id in path("drafts.**"))] | order(_createdAt desc) [0...30]
  `)
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((n: any) => (
        <NewsCard
          key={n._id}
          href={lang === "en" ? `/en/news/${n.slug.current}` : `/stiri/${n.slug.current}`}
          title={lang === "en" ? (n.titleEn || n.title) : n.title}
          excerpt={lang === "en" ? (n.excerptEn || n.excerpt) : n.excerpt}
          image={n.mainImage || undefined}
          date={n._createdAt}
        />
      ))}
    </div>
  )
}