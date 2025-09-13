
// patch14-node.js — Apply design Variant A (Minimal Clean)
// Rulează: node patch14-node.js
const fs = require('fs');
const path = require('path');
function ensureDir(p){ const d = path.dirname(p); if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); }
function write(rel, content){ ensureDir(rel); fs.writeFileSync(rel, content, 'utf8'); console.log("✔ wrote", rel); }

const files = {
  "app/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;
/* ===== Variant A: Minimal Clean theme tokens ===== */
:root{ --bg:255 255 255; --fg:15 23 42; --muted:71 85 105; --card:255 255 255; --border:226 232 240; --accent:37 99 235; --accent-50:239 246 255; }
html, body { height: 100%; }
body{ @apply antialiased; color: rgb(var(--fg)); background-color: rgb(var(--bg)); }
.container{ @apply mx-auto px-4; max-width: 72rem; }
@layer components{
  .btn{ @apply inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition; border-color: rgb(var(--border)); background:white; }
  .btn:hover{ @apply shadow-sm; }
  .btn-primary{ @apply text-white; background: rgb(var(--accent)); border-color: rgb(var(--accent)); }
  .btn-primary:hover{ filter: brightness(0.95); }
  .input{ @apply w-full rounded-xl border px-3 py-2; border-color: rgb(var(--border)); background: rgb(var(--card)); }
  .label{ @apply block mb-1 text-sm font-medium text-slate-700; }
  .card{ @apply rounded-2xl border p-4 bg-white; border-color: rgb(var(--border)); }
  .badge{ @apply inline-flex items-center rounded-full border px-2 py-0.5 text-xs; border-color: rgb(var(--border)); background: rgb(var(--accent-50)); color: rgb(var(--accent)); }
  .muted{ color: rgb(var(--muted)); }
}
header{ position: sticky; top: 0; z-index: 40; background: white; }
.tradingview-ticker { @apply border-b; border-color: rgb(var(--border)); }`,

  "app/layout.tsx": `import "./globals.css"
import Link from "next/link"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import TradingViewTicker from "@/components/TradingViewTicker"
import LangSwitcher from "@/components/LangSwitcher"
import HeaderNav from "@/components/HeaderNav"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })

export const metadata: Metadata = { title: "CryptoHub — Stiri si Blog", description: "Homepage pe Știri + Blog + Admin simplu" }

function TradingViewMark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M3 3h2v18H3V3zm8 6h2v12h-2V9zm8-4h2v16h-2V5z" />
    </svg>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const affiliate = process.env.TRADINGVIEW_AFFILIATE_URL || "https://www.tradingview.com"
  return (
    <html lang="ro" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans">
        <header className="border-b bg-white">
          <div className="container py-4 flex items-center gap-6">
            <Link href="/" className="text-2xl font-semibold" style={{fontFamily: "var(--font-sora)"}}>CryptoHub</Link>
            <HeaderNav />
            <span className="ml-auto"><LangSwitcher /></span>
          </div>
        </header>
        <div className="tradingview-ticker"><TradingViewTicker /></div>
        <main className="container py-8">{children}</main>
        <footer className="container py-10 text-sm opacity-70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} CryptoHub</div>
          <a href={affiliate} target="_blank" rel="noopener" className="inline-flex items-center gap-2"><TradingViewMark /><span>Powered by TradingView</span></a>
        </footer>
      </body>
    </html>
  )
}`,

  "components/NewsCard.tsx": `import Link from "next/link"
export default function NewsCard({ href, title, excerpt, image, date }:{ href:string; title:string; excerpt?:string|null; image?:string|null; date:string|Date }){
  const d = typeof date === "string" ? new Date(date) : date
  return (
    <article className="card hover:shadow-sm transition">
      {image && <img src={image} alt={title} className="mb-3 w-full h-44 object-cover rounded-xl" />}
      <h3 className="text-lg font-semibold leading-snug"><Link href={href} className="hover:underline">{title}</Link></h3>
      {excerpt && <p className="mt-2 text-sm muted">{excerpt}</p>}
      <p className="mt-3 text-xs muted">{d.toLocaleString("ro-RO")}</p>
    </article>
  )
}`,

  "components/BlogCard.tsx": `import Link from "next/link"
export default function BlogCard({ href, title, excerpt, image, date }:{ href:string; title:string; excerpt?:string|null; image?:string|null; date:string|Date }){
  const d = typeof date === "string" ? new Date(date) : date
  return (
    <article className="card hover:shadow-sm transition">
      {image && <img src={image} alt={title} className="mb-3 w-full h-48 object-cover rounded-xl" />}
      <h3 className="text-lg font-semibold leading-snug"><Link href={href} className="hover:underline">{title}</Link></h3>
      {excerpt && <p className="mt-2 text-sm muted">{excerpt}</p>}
      <p className="mt-3 text-xs muted">{d.toLocaleString("ro-RO")}</p>
    </article>
  )
}`,

  "components/NewsList.tsx": `import NewsCard from "@/components/NewsCard"
import { prisma } from "@/lib/prisma"
export default async function NewsList({ lang = "ro" }:{ lang?: "ro" | "en" }){
  const items = await prisma.news.findMany({ where:{ published:true }, orderBy:{ createdAt:"desc" }, take:30 })
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(n => (
        <NewsCard key={n.id} href={lang === "en" ? \`/en/news/\${n.slug}\` : \`/stiri/\${n.slug}\`} title={lang === "en" ? (n.titleEn || n.title) : n.title} excerpt={lang === "en" ? (n.excerptEn || n.excerpt) : n.excerpt} image={n.image || undefined} date={n.createdAt} />
      ))}
    </div>
  )
}`,

  "app/page.tsx": `import NewsList from "@/components/NewsList"
export const metadata = { title: "CryptoHub — Stiri" }
export default async function Home(){
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Știri</h1>
        <p className="muted mt-1">Cele mai noi actualizări din crypto, selectate de tine.</p>
      </div>
      <NewsList lang="ro" />
    </div>
  )
}`,

  "app/stiri/page.tsx": `import NewsList from "@/components/NewsList"
export const metadata = { title: "Știri • CryptoHub" }
export default async function StiriPage(){
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Știri</h1>
          <p className="muted mt-1">Toate știrile publicate.</p>
        </div>
      </div>
      <NewsList lang="ro" />
    </div>
  )
}`,

  "app/en/news/page.tsx": `import NewsList from "@/components/NewsList"
export const metadata = { title: "News • CryptoHub" }
export default async function NewsEnPage(){
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>News</h1>
        <p className="muted mt-1">Latest updates curated by you.</p>
      </div>
      <NewsList lang="en" />
    </div>
  )
}`,
};

Object.entries(files).forEach(([rel, content]) => write(rel, content));

// Tailwind content globs (add app/components/pages if lipsesc)
const twCandidates = ["tailwind.config.ts","tailwind.config.cjs","tailwind.config.js"];
for (const f of twCandidates) {
  if (fs.existsSync(f)) {
    let txt = fs.readFileSync(f, "utf8");
    const desired = 'content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}"]';
    if (!/app\/\*\*/.test(txt) || !/components\/\*\*/.test(txt)) {
      txt = txt.replace(/content:\s*\[[^\]]*\]/m, desired);
      fs.writeFileSync(f, txt, "utf8");
      console.log("✔ updated Tailwind content globs in", f);
    } else {
      console.log("✔ Tailwind content already OK in", f);
    }
    break;
  }
}
console.log("\\nDone.");
