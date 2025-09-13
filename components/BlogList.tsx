import BlogCard from "@/components/BlogCard"
import { prisma } from "@/lib/prisma"
export default async function BlogList({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const posts = await prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 30 })
  return (<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {posts.map(p => (<BlogCard key={p.id} href={(lang === "en" ? `/en/blog/${p.slug}` : `/blog/${p.slug}`)}
      title={lang === "en" ? (p.titleEn || p.title) : p.title}
      excerpt={lang === "en" ? (p.excerptEn || p.excerpt) : p.excerpt}
      image={p.image || undefined} date={p.createdAt} />))}
  </div>)
}