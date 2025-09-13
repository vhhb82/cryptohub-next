# CryptoHub brand (blue/white)

Fișiere:
- `public/brand/cryptohub-logo.svg`  — logo orizontal (icon + wordmark)
- `public/brand/cryptohub-mark.svg`  — iconiță pătrată (monogram CH)
- `public/favicon.svg`                — favicon

## Integrare rapidă (Next.js App Router)

1) Copiază aceste fișiere în proiect.
2) În `app/layout.tsx`, adaugă/editează metadata pentru icon:
   ```ts
   export const metadata = {
     title: "CryptoHub",
     icons: {
       icon: "/favicon.svg",
       shortcut: "/favicon.svg",
     },
   };
   ```
3) În navbar, poți folosi logo-ul orizontal:
   ```tsx
   <a href="/" className="inline-flex items-center gap-3">
     <img src="/brand/cryptohub-mark.svg" alt="CryptoHub" className="h-7 w-7" />
     <img src="/brand/cryptohub-logo.svg" alt="CryptoHub" className="hidden sm:block h-8" />
   </a>
   ```

*Notă:* `favicon.svg` este suportat în browsere moderne. Dacă vrei și `.ico`/PNG pentru compatibilitate maximă,
îmi spui și îți generez și variantele `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`.
