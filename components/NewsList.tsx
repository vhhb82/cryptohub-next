import NewsCard from "@/components/NewsCard"; import { prisma } from "@/lib/prisma";
export default async function NewsList({ lang="ro" }:{ lang?: "ro"|"en" }){
  const items = await prisma.news.findMany({ where:{published:true}, orderBy:{createdAt:"desc"}, take:30 });
  if (!items.length) {
    return (
      <div className="card">
        <p className="muted">Nu există știri publicate încă. Mergi în <a className="text-blue-700 underline" href="/admin">Admin</a> și adaugă prima știre.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(n=>(
        <NewsCard key={n.id}
          href={lang==="en"?`/en/news/${n.slug}`:`/stiri/${n.slug}`}
          title={lang==="en"?(n.titleEn||n.title):n.title}
          excerpt={lang==="en"?(n.excerptEn||n.excerpt):n.excerpt}
          image={n.image||undefined}
          date={n.createdAt}
        />
      ))}
    </div>
  );
}