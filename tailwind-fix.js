// tailwind-fix.js — repară pipeline-ul Tailwind pentru Next.js (App Router)
const fs = require("fs");
const path = require("path");

function write(p, content) {
  const d = path.dirname(p);
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(p, content, "utf8");
  console.log("✔ wrote", p);
}

function ensureImportGlobals(layoutPath) {
  if (!fs.existsSync(layoutPath)) return console.log("ℹ nu există", layoutPath);
  let src = fs.readFileSync(layoutPath, "utf8");
  if (!src.includes('import "./globals.css"')) {
    // pune importul imediat după alte importuri
    const lines = src.split(/\r?\n/);
    let insertAt = 0;
    while (insertAt < lines.length && lines[insertAt].startsWith("import ")) insertAt++;
    lines.splice(insertAt, 0, 'import "./globals.css"');
    src = lines.join("\n");
    fs.writeFileSync(layoutPath, src, "utf8");
    console.log("✔ injectat import \"./globals.css\" în", layoutPath);
  } else {
    console.log("✔ import deja prezent în", layoutPath);
  }
}

// 1) postcss.config.js
write(
  "postcss.config.js",
  `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`
);

// 2) tailwind.config.ts (merge și ca .js dacă preferi)
write(
  "tailwind.config.ts",
  `import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
`
);

// 3) app/globals.css (Variantă B: Soft + Violet)
write(
  "app/globals.css",
  `@tailwind base;
@tailwind components;
@tailwind utilities;

:root{
  --bg: 247 248 252;
  --fg: 17 24 39;
  --muted: 71 85 105;
  --card: 255 255 255;
  --border: 228 231 236;
  --accent: 124 58 237;
  --accent-50: 245 243 255;
}

html, body { height: 100%; }
body{ @apply antialiased; color: rgb(var(--fg)); background: rgb(var(--bg)); }
.container{ @apply mx-auto px-4; max-width: 70rem; }

@layer components{
  .btn{ @apply inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition; background: rgb(var(--accent)); color: white; }
  .btn:hover{ filter: brightness(0.95); }
  .btn-ghost{ @apply inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm; border-color: rgb(var(--border)); background: white; color: rgb(var(--fg)); }
  .badge{ @apply inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium; background: rgb(var(--accent-50)); color: rgb(var(--accent)); }
  .muted{ color: rgb(var(--muted)); }
  .card-soft{ @apply rounded-2xl bg-white shadow-sm; }
  .card-hover{ @apply transition; }
  .card-hover:hover{ transform: translateY(-2px); box-shadow: 0 8px 24px rgba(17,24,39,.08); }
}

.border-b-soft{ border-bottom: 1px solid rgb(var(--border)); }
.tradingview-ticker{ @apply border-b-soft; }
`
);

// 4) asigură importul în app/layout.tsx
ensureImportGlobals(path.join("app", "layout.tsx"));

console.log("\nTailwind fix applied.");
