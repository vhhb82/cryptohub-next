// patch-paper-blue-rescue.js — hard-fix pentru tema Paper Blue + smoke test
const fs = require("fs"); const path = require("path");
const w = (p,c)=>{ const d=path.dirname(p); if(!fs.existsSync(d)) fs.mkdirSync(d,{recursive:true}); fs.writeFileSync(p,c,"utf8"); console.log("✔ wrote",p); };

function ensureImportGlobals(layoutPath) {
  if (!fs.existsSync(layoutPath)) { console.log("ℹ lipsește", layoutPath); return; }
  let src = fs.readFileSync(layoutPath, "utf8");
  if (!src.includes('import "./globals.css"')) {
    const lines = src.split(/\r?\n/); let i=0; while(i<lines.length && lines[i].startsWith("import ")) i++;
    lines.splice(i,0,'import "./globals.css"'); fs.writeFileSync(layoutPath, lines.join("\n"), "utf8");
    console.log('✔ injectat import "./globals.css" în app/layout.tsx');
  } else { console.log("✔ import globals.css deja prezent"); }
}

// 0) postcss + tailwind globs
w("postcss.config.js", `module.exports={plugins:{tailwindcss:{},autoprefixer:{}}};`);
const twc = ["tailwind.config.ts","tailwind.config.cjs","tailwind.config.js"].find(f=>fs.existsSync(f));
if (twc) {
  let txt = fs.readFileSync(twc,"utf8");
  const desired = 'content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}"]';
  if (!/app\/\*\*/.test(txt) || !/components\/\*\*/.test(txt)) {
    txt = txt.replace(/content:\s*\[[^\]]*\]/m, desired);
    fs.writeFileSync(twc, txt, "utf8"); console.log("✔ actualizat Tailwind content în", twc);
  } else { console.log("✔ Tailwind content OK în", twc); }
} else {
  w("tailwind.config.ts", `import type { Config } from "tailwindcss";
export default { ${'content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}"],'}
  theme:{extend:{}}, plugins:[], } satisfies Config;`);
}

// 1) tema Paper Blue + utilitare de bază
w("app/globals.css", `@tailwind base; @tailwind components; @tailwind utilities;
/* Paper Blue */
:root{ --bg:248 250 252; --fg:15 23 42; --muted:71 85 105; --card:255 255 255; --border:226 232 240; --accent:37 99 235; --accent-50:239 246 255; }
html,body{height:100%} body{ @apply antialiased; color:rgb(var(--fg)); background:rgb(var(--bg)); }
.container{ @apply mx-auto px-4; max-width:72rem; }
@layer components{
  .card{ @apply rounded-xl border bg-white p-4 transition; border-color:rgb(var(--border)); }
  .card:hover{ @apply shadow-sm; }
  .btn-primary{ @apply inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white; background:rgb(var(--accent)); }
  .btn-ghost{ @apply inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm; border-color:rgb(var(--border)); background:white; color:rgb(var(--fg)); }
  .badge{ @apply inline-flex items-center rounded-full border px-2 py-0.5 text-xs; border-color:rgb(var(--border)); background:rgb(var(--accent-50)); color:rgb(var(--accent)); }
  .muted{ color:rgb(var(--muted)); }
}
.tradingview-ticker{ @apply border-b; border-color:rgb(var(--border)); }`);

// 2) injectează importul în layout
ensureImportGlobals(path.join("app","layout.tsx"));

// 3) NewsList cu fallback vizibil dacă nu există știri
w("components/NewsList.tsx", `import NewsCard from "@/components/NewsCard"; import { prisma } from "@/lib/prisma";
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
          href={lang==="en"?\`/en/news/\${n.slug}\`:\`/stiri/\${n.slug}\`}
          title={lang==="en"?(n.titleEn||n.title):n.title}
          excerpt={lang==="en"?(n.excerptEn||n.excerpt):n.excerpt}
          image={n.image||undefined}
          date={n.createdAt}
        />
      ))}
    </div>
  );
}`);

// 4) pagină de smoke test: /debug/tw
w("app/debug/tw/page.tsx", `export const metadata = { title: "Tailwind Smoke Test" };
export default function TwTest(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Smoke test Tailwind</h1>
      <div className="badge">Badge</div>
      <button className="btn-primary">Buton Primary</button>
      <div className="card"><p className="muted">Card Paper Blue cu border fin.</p></div>
      <div className="grid grid-cols-3 gap-2">
        <div className="h-3 bg-blue-600 rounded"></div>
        <div className="h-3 bg-slate-200 rounded"></div>
        <div className="h-3 bg-white rounded border"></div>
      </div>
    </div>
  );
}
`);

console.log("\nRescue patch applied. Accesează /debug/tw pentru verificare.");
