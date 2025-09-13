# Icon set (PNG + ICO) — Blue/White

Fișiere:
- public/apple-touch-icon.png  (180x180)
- public/icon-192.png          (192x192)
- public/icon-512.png          (512x512)
- public/favicon.ico           (16/32/48/64)
- public/site.webmanifest      (manifest PWA simplu)

## Integrare (Next.js App Router)
1) Copiază aceste fișiere în `public/`.
2) În `app/layout.tsx`, adaugă:
   ```ts
   export const metadata = {
     icons: {
       icon: ["/favicon.svg", "/favicon.ico"],
       apple: "/apple-touch-icon.png",
     },
     manifest: "/site.webmanifest",
     themeColor: "#1E3A8A",
   };
   ```
3) (opțional) adaugă `<link rel="manifest" href="/site.webmanifest" />` în `<head>` dacă nu folosești `metadata.manifest`.
