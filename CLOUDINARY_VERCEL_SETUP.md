# Configurarea Cloudinary cu Vercel

## 1. Configurarea Cloudinary

### Pasul 1: Creează cont Cloudinary
1. Mergi la [cloudinary.com](https://cloudinary.com)
2. Creează un cont gratuit
3. Notează-ți `Cloud Name`, `API Key` și `API Secret` din Dashboard

### Pasul 2: Creează Upload Preset
1. În Dashboard, mergi la **Settings** → **Upload**
2. Scroll down la **Upload presets**
3. Click **Add upload preset**
4. Configurează:
   - **Preset name**: `cryptohub_unsigned` (sau numele dorit)
   - **Signing Mode**: `Unsigned` (IMPORTANT!)
   - **Folder**: `cryptohub` (opțional, pentru organizare)
   - **Resource Type**: `Image`
   - **Access Mode**: `Public`

## 2. Configurarea Vercel

### Pasul 1: Adaugă Environment Variables
În Vercel Dashboard, mergi la proiectul tău → **Settings** → **Environment Variables** și adaugă:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_PRESET=cryptohub_unsigned
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Pasul 2: Redeploy
După ce adaugi variabilele, fă un redeploy al aplicației.

## 3. Testarea Integrării

### Test Local
1. Creează fișierul `.env.local` cu variabilele de mai sus
2. Rulează `npm run dev`
3. Mergi la `/admin/stiri/new` și încearcă să încarci o imagine

### Test Production
1. Mergi la aplicația ta pe Vercel
2. Încearcă să încarci o imagine din admin panel
3. Verifică în Cloudinary Dashboard că imaginea a fost încărcată

## 4. Funcționalități Disponibile

### Upload Direct (Browser → Cloudinary)
- Componenta `ImageUploader` face upload direct din browser
- Nu trece prin server-ul tău (mai rapid)
- Folosește unsigned upload preset

### API Routes (Server-side)
- `/api/cloudinary` pentru operațiuni server-side
- Ștergere imagini
- Transformări avansate
- Folosește API Key/Secret pentru securitate

### Helper Functions
- `getCloudinaryUrl()` - generează URL-uri cu transformări
- `extractPublicId()` - extrage public_id din URL

## 5. Exemple de Utilizare

### În componente React:
```tsx
import ImageUploader from '@/components/ImageUploader';

<ImageUploader 
  fieldName="imageUrl"
  onUploaded={(url) => console.log('Uploaded:', url)}
  maxSizeMB={5}
  label="Imagine articol"
  required={true}
/>
```

### În API routes:
```tsx
import { cloudinary } from '@/lib/cloudinary';

// Șterge imagine
await cloudinary.uploader.destroy(publicId);

// Generează URL cu transformări
const url = cloudinary.url(publicId, {
  width: 300,
  height: 200,
  crop: 'fill'
});
```

## 6. Troubleshooting

### Eroare: "Configul Cloudinary lipsește"
- Verifică că variabilele `NEXT_PUBLIC_CLOUDINARY_*` sunt setate
- Asigură-te că ai făcut redeploy după adăugarea variabilelor

### Eroare: "Upload eșuat (400)"
- Verifică că upload preset este configurat ca "Unsigned"
- Verifică că numele preset-ului este corect

### Eroare: "Upload eșuat (401)"
- Verifică că API Key și Secret sunt corecte
- Asigură-te că nu folosești variabilele publice pentru operațiuni server-side

## 7. Optimizări

### Transformări Automatice
Poți configura transformări în upload preset:
- Resize automat
- Optimizare calitate
- Format conversion (WebP)
- Watermark

### CDN Global
Cloudinary oferă CDN global pentru imagini, deci vor fi încărcate rapid din orice locație.

### Backup și Versioning
Cloudinary păstrează automat backup-uri și versiuni ale imaginilor.
