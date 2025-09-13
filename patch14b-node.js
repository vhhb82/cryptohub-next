// patch14b-node.js — Blog grid (Variant A)
const fs = require('fs'); const path = require('path');
function ensureDir(p){ const d = path.dirname(p); if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); }
function write(rel, content){ ensureDir(rel); fs.writeFileSync(rel, content, 'utf8'); console.log("✔ wrote", rel); }

write("components/BlogList.tsx", `import BlogCard from "@/components/BlogCard"
import { prisma } from "@/lib/prisma"
export default async function BlogList({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const posts = await prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 30 })
  return (<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {posts.map(p => (<BlogCard key={p.id} href={(lang === "en" ? \`/en/blog/\${p.slug}\` : \`/blog/\${p.slug}\`)}
      title={lang === "en" ? (p.titleEn || p.title) : p.title}
      excerpt={lang === "en" ? (p.excerptEn || p.excerpt) : p.excerpt}
      image={p.image || undefined} date={p.createdAt} />))}
  </div>)
}`);

write("app/blog/page.tsx", `import BlogList from "@/components/BlogList"
export const metadata = { title: "Blog • CryptoHub" }
export default async function BlogPage() {
  return (<div className="space-y-6">
    <div><h1 className="text-3xl font-semibold" style={{fontFamily: "var(--font-sora)"}}>Blog</h1>
    <p className="muted mt-1">Articole, opinii și ghiduri din crypto.</p></div>
    <BlogList lang="ro" />
  </div>)
}`);

write("app/en/blog/page.tsx", `import BlogList from "@/components/BlogList"
export const metadata = { title: "Blog • CryptoHub" }
export default async function BlogEnPage() {
  return (<div className="space-y-6">
    <div><h1 className="text-3xl font-semibold" style={{fontFamily: "var(--font-sora)"}}>Blog</h1>
    <p className="muted mt-1">Articles, opinions and guides.</p></div>
    <BlogList lang="en" />
  </div>)
}`);
console.log("\\nDone.");
