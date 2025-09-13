// patch-paper-blue.js — Theme: Paper Blue
// Run: node patch-paper-blue.js
const fs = require("fs");
const path = require("path");

const write = (p, c) => {
  const d = path.dirname(p);
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(p, c, "utf8");
  console.log("✔ wrote", p);
};

function ensureImportGlobals(layoutPath) {
  if (!fs.existsSync(layoutPath)) return console.log("ℹ missing", layoutPath);
  let src = fs.readFileSync(layoutPath, "utf8");
  if (!src.includes('import "./globals.css"')) {
    const lines = src.split(/\r?\n/);
    let i = 0;
    while (i < lines.length && lines[i].startsWith("import ")) i++;
    lines.splice(i, 0, 'import "./globals.css"');
    fs.writeFileSync(layoutPath, lines.join("\n"), "utf8");
    console.log('✔ injected import "./globals.css"');
  } else {
    console.log("✔ globals.css already imported");
  }
}

// 1) Paper Blue tokens + utilities
write(
  "app/globals.css",
  `@tailwind base;
@tailwind components;
@tailwind utilities;

/* ===== Theme: Paper Blue ===== */
:root{
  --bg: 248 250 252;        /* #F8FAFC */
  --fg: 15 23 42;           /* #0F172A */
  --muted: 71 85 105;       /* slate-600 */
  --card: 255 255 255;      /* white */
  --border: 226 232 240;    /* slate-200 */
  --accent: 37 99 235;      /* blue-600 */
  --accent-50: 239 246 255; /* blue-50 */
}

html, body { height: 100%; }
body{
  @apply antialiased;
  color: rgb(var(--fg));
  background: rgb(var(--bg));
}

/* layout container */
.container{ @apply mx-auto px-4; max-width: 72rem; }

/* reusable */
@layer components{
  .card{
    @apply rounded-xl border bg-white p-4 transition;
    border-color: rgb(var(--border));
  }
  .card:hover{ @apply shadow-sm; }

  .btn-primary{
    @apply inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white;
    background: rgb(var(--accent));
  }
  .btn-primary:hover{ filter: brightness(0.95); }

  .btn-ghost{
    @apply inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm;
    border-color: rgb(var(--border));
    background: white;
    color: rgb(var(--fg));
  }

  .badge{
    @apply inline-flex items-center rounded-full border px-2 py-0.5 text-xs;
    border-color: rgb(var(--border));
    background: rgb(var(--accent-50));
    color: rgb(var(--accent));
  }

  .muted{ color: rgb(var(--muted)); }
}

/* header/ticker divider */
.tradingview-ticker{ @apply border-b; border-color: rgb(var(--border)); }
`
);

// 2) Tailwind globs (app/components/pages)
const twCandidates = ["tailwind.config.ts", "tailwind.config.cjs", "tailwind.config.js"];
for (const f of twCandidates) {
  if (fs.existsSync(f)) {
    let txt = fs.readFileSync(f, "utf8");
    const desired =
      'content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}"]';
    if (!/app\/\*\*/.test(txt) || !/components\/\*\*/.test(txt)) {
      txt = txt.replace(/content:\s*\[[^\]]*\]/m, desired);
      fs.writeFileSync(f, txt, "utf8");
      console.log("✔ updated Tailwind content in", f);
    } else {
      console.log("✔ Tailwind content OK in", f);
    }
    break;
  }
}

// 3) Ensure globals.css is imported in app/layout.tsx
ensureImportGlobals(path.join("app", "layout.tsx"));

console.log("\nPaper Blue applied.");
