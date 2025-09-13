// patch15-node.js — Variantă B: Soft Cards + Violet Accent
// Rulează: node patch15-node.js
const fs = require('fs'); const path = require('path');
const w = (p,c)=>{ const d=path.dirname(p); if(!fs.existsSync(d)) fs.mkdirSync(d,{recursive:true}); fs.writeFileSync(p,c,'utf8'); console.log('✔ wrote',p); };

// 1) globals.css (temă nouă + utilitare)
w("app/globals.css", `@tailwind base;
@tailwind components;
@tailwind utilities;

/* ===== Variant B: Soft Cards + Violet Accent ===== */
:root{
  --bg: 247 248 252;      /* #F7F8FC */
  --fg: 17 24 39;         /* gray-900 */
  --muted: 71 85 105;     /* slate-600 */
  --card: 255 255 255;    /* white */
  --border: 228 231 236;  /* neutral-200 */
  --accent: 124 58 237;   /* violet-600 */
  --accent-50: 245 243 255; /* violet-50 */
}

html, body { height: 100%; }
body{
  @apply antialiased;
  color: rgb(var(--fg));
  background: rgb(var(--bg));
}

/* Layout container */
.container{ @apply mx-auto px-4; max-width: 70rem; }

/* Reusable UI */
@layer components{
  .btn{
    @apply inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition;
    background: rgb(var(--accent));
    color: white;
  }
  .btn:hover{ filter: brightness(0.95); }

  .btn-ghost{
    @apply inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm;
    border-color: rgb(var(--border)); background: white; color: rgb(var(--fg));
  }

  .badge{
    @apply inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium;
    background: rgb(var(--accent-50)); color: rgb(var(--accent));
  }

  .muted{ color: rgb(var(--muted)); }

  .card-soft{
    @apply rounded-2xl bg-white shadow-sm;
  }
  .card-hover{
    @apply transition;
  }
  .card-hover:hover{
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(17,24,39,.08);
  }
}

/* Header line */
.border-b-soft{ border-bottom: 1px solid rgb(var(--border)); }
.tradingview-ticker{ @apply border-b-soft; }
`);

// 2) layout.tsx (header blur + container update)
w("app/layout.tsx", `import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import TradingViewTicker from "@/components/TradingViewTicker";
import LangSwitcher from "@/components/LangSwitcher";
import HeaderNav from "@/components/HeaderNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "CryptoHub",
  description: "Știri, blog și instrumente pentru trading",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const affiliate = process.env.TRADINGVIEW_AFFILIATE_URL || "https://www.tradingview.com";
  return (
    <html lang="ro" className={\`\${inter.variable} \${sora.variable}\`}>
      <body className="font-sans">
        <header className="sticky top-0 z-40 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b-soft">
          <div className="container py-3 flex items-center gap-6">
            <Link href="/" className="text-2xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>CryptoHub</Link>
            <HeaderNav />
            <span className="ml-auto"><LangSwitcher /></span>
          </div>
        </header>

        <div className="tradingview-ticker">
          <TradingViewTicker />
        </div>

        <main className="container py-8">{children}</main>

        <footer className="container py-10 text-sm opacity-70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} CryptoHub</div>
          <a href={affiliate} target="_blank" rel="noopener" className="inline-flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M3 3h2v18H3V3zm8 6h2v12h-2V9zm8-4h2v16h-2V5z"/></svg>
            <span>Powered by TradingView</span>
          </a>
        </footer>
      </body>
    </html>
  );
}
`);

// 3) NewsCard (soft card)
w("components/NewsCard.tsx", `import Link from "next/link";
export default function NewsCard({ href, title, excerpt, image, date }:{
  href:string; title:string; excerpt?:string|null; image?:string|null; date:string|Date
}){
  const d = typeof date === "string" ? new Date(date) : date;
  return (
    <article className="card-soft card-hover p-4">
      <div className="flex items-start gap-3">
        {image ? (
          <img src={image} alt={title} className="w-28 h-20 object-cover rounded-xl" />
        ) : (
          <div className="w-28 h-20 rounded-xl bg-slate-100" />
        )}
        <div className="min-w-0">
          <div className="badge mb-1">Știre</div>
          <h3 className="text-base font-semibold leading-snug">
            <Link href={href} className="hover:underline">{title}</Link>
          </h3>
          {excerpt && <p className="mt-1 text-sm muted line-clamp-2">{excerpt}</p>}
          <p className="mt-2 text-xs muted">{d.toLocaleString("ro-RO")}</p>
        </div>
      </div>
    </article>
  );
}
`);

// 4) BlogCard (media-card)
w("components/BlogCard.tsx", `import Link from "next/link";
export default function BlogCard({ href, title, excerpt, image, date }:{
  href:string; title:string; excerpt?:string|null; image?:string|null; date:string|Date
}){
  const d = typeof date === "string" ? new Date(date) : date;
  return (
    <article className="card-soft card-hover p-4">
      <div className="flex gap-4">
        {image ? (
          <img src={image} alt={title} className="w-40 h-28 object-cover rounded-xl" />
        ) : (
          <div className="w-40 h-28 rounded-xl bg-slate-100" />
        )}
        <div className="min-w-0">
          <div className="badge mb-1">Blog</div>
          <h3 className="text-lg font-semibold leading-snug">
            <Link href={href} className="hover:underline">{title}</Link>
          </h3>
          {excerpt && <p className="mt-1 text-sm muted line-clamp-2">{excerpt}</p>}
          <p className="mt-2 text-xs muted">{d.toLocaleString("ro-RO")}</p>
        </div>
      </div>
    </article>
  );
}
`);

// 5) NewsList (grid)
w("components/NewsList.tsx", `import NewsCard from "@/components/NewsCard";
import { prisma } from "@/lib/prisma";
export default async function NewsList({ lang="ro" }:{ lang?: "ro"|"en" }){
  const items = await prisma.news.findMany({ where:{ published:true }, orderBy:{ createdAt:"desc" }, take:24 });
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map(n => (
        <NewsCard key={n.id}
          href={lang==="en"?\`/en/news/\${n.slug}\`:\`/stiri/\${n.slug}\`}
          title={lang==="en"?(n.titleEn||n.title):n.title}
          excerpt={lang==="en"?(n.excerptEn||n.excerpt):n.excerpt}
          image={n.image||undefined}
          date={n.createdAt}
        />
      ))}
    </div>
  );
}
`);

// 6) BlogList (2 coloane media-cards)
w("components/BlogList.tsx", `import BlogCard from "@/components/BlogCard";
import { prisma } from "@/lib/prisma";
export default async function BlogList({ lang="ro" }:{ lang?:"ro"|"en" }){
  const posts = await prisma.post.findMany({ where:{ published:true }, orderBy:{ createdAt:"desc" }, take:24 });
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {posts.map(p=>(
        <BlogCard key={p.id}
          href={lang==="en"?\`/en/blog/\${p.slug}\`:\`/blog/\${p.slug}\`}
          title={lang==="en"?(p.titleEn||p.title):p.title}
          excerpt={lang==="en"?(p.excerptEn||p.excerpt):p.excerpt}
          image={p.image||undefined}
          date={p.createdAt}
        />
      ))}
    </div>
  );
}
`);

// 7) Pagini: Home/Stiri/Blog
w("app/page.tsx", `import NewsList from "@/components/NewsList";
export const metadata = { title: "CryptoHub — Știri" };
export default async function Home(){
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Știri</h1>
        <p className="muted mt-1">Actualizări curate din crypto.</p>
      </div>
      <NewsList lang="ro" />
    </div>
  );
}
`);
w("app/stiri/page.tsx", `import NewsList from "@/components/NewsList";
export const metadata = { title: "Știri • CryptoHub" };
export default async function StiriPage(){
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Știri</h1>
        <p className="muted mt-1">Toate știrile publicate.</p>
      </div>
      <NewsList lang="ro" />
    </div>
  );
}
`);
w("app/en/news/page.tsx", `import NewsList from "@/components/NewsList";
export const metadata = { title: "News • CryptoHub" };
export default async function NewsEnPage(){
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>News</h1>
        <p className="muted mt-1">Latest updates.</p>
      </div>
      <NewsList lang="en" />
    </div>
  );
}
`);
w("app/blog/page.tsx", `import BlogList from "@/components/BlogList";
export const metadata = { title: "Blog • CryptoHub" };
export default async function BlogPage(){
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Blog</h1>
        <p className="muted mt-1">Articole, opinii și ghiduri din crypto.</p>
      </div>
      <BlogList lang="ro" />
    </div>
  );
}
`);
w("app/en/blog/page.tsx", `import BlogList from "@/components/BlogList";
export const metadata = { title: "Blog • CryptoHub" };
export default async function BlogEnPage(){
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Blog</h1>
        <p className="muted mt-1">Articles, opinions and guides.</p>
      </div>
      <BlogList lang="en" />
    </div>
  );
}
`);

// 8) Tailwind content globs (app + components + pages)
const tws = ["tailwind.config.ts","tailwind.config.cjs","tailwind.config.js"].find(f=>fs.existsSync(f));
if (tws){
  let txt = fs.readFileSync(tws,"utf8");
  const desired = 'content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}"]';
  if (!/app\/\*\*/.test(txt) || !/components\/\*\*/.test(txt)) {
    txt = txt.replace(/content:\s*\[[^\]]*\]/m, desired);
    fs.writeFileSync(tws, txt, "utf8");
    console.log("✔ updated Tailwind content globs in", tws);
  } else {
    console.log("✔ Tailwind content already OK in", tws);
  }
}

console.log("\\nVariantă B aplicată.");
`);

// Done.
console.log("OK");
