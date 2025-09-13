# Admin refăcut – create + upload imagini + traducere EN + ștergere + produse + video

## Ce include
- Upload imagini local (`/public/uploads`) cu conversie WebP (`sharp`)
- Formulare noi pentru: Știri, Postări (cu imagine), Produse, Video
- Traducere automată RO→EN (buton) prin DeepL (dacă `DEEPL_API_KEY` este setat)
- Acțiuni de ștergere robuste (server actions) pentru Știri/Postări/Produse/Video
- Pagină `/admin` care listează totul și are link-uri pentru adăugare

## Setup rapid
1. Copiază fișierele peste proiect:
   - `components/admin/*`
   - `app/admin/*`
   - `app/api/upload/*`, `lib/uploads.ts`
   - `app/api/translate/route.ts` (DeepL)
2. Instalează dependența pentru imagini:
   ```bash
   npm i sharp
   ```
3. (Opțional) DeepL pentru traducere EN:
   În `.env.local`:
   ```
   DEEPL_API_KEY=...
   DEEPL_PLAN=free   # sau pro
   ```
4. Repornește dev serverul:
   ```bash
   npm run dev
   ```

## Notă despre Prisma
- Codul presupune modele: `news`, `post`, `video` existente cu câmpuri `title, slug, excerpt, content, image, titleEn, excerptEn, contentEn, published` (după caz).
- Pentru `product` se încearcă grațios — dacă modelul nu există, creează-l în Prisma sau ignoră secțiunea.
- După ce ajustezi schema, rulează `npx prisma generate && npx prisma migrate dev`.
