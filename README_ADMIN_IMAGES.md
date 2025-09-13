# Admin – upload imagini (News & Posts)

Ce include:
- API upload: `POST /api/upload` (salvează WebP optimizat în `/public/uploads`)
- API delete: `POST /api/upload/delete`
- Helper: `lib/uploads.ts` (sharp, validare, convertire)
- Componentă React: `components/admin/ImageUpload.tsx` (preview + hidden input)
- Placeholder: `public/uploads/.gitkeep`

## Instalare
1) Copiază folderele peste proiect (păstrează structura).
2) Instalează dependența imaginilor:
   ```bash
   npm i sharp
   ```
3) Integrează în formular:
   ```tsx
   import ImageUpload from "@/components/admin/ImageUpload";

   <ImageUpload name="image" label="Imagine (opțional)" />
   ```
4) Repornește dev serverul:
   ```bash
   npm run dev
   ```
