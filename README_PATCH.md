# CryptoHub – Patch: Cloudinary Upload (Vercel‑safe)

Acest patch adaugă un uploader simplu care funcționează **direct din browser**, fără rute API.
Îl poți folosi în Admin pentru a încărca imagini la știri/postări/produse – funcționează și pe Vercel.

## Pași rapizi

1) În Cloudinary:
   - Creează un **unsigned upload preset** (ex: `cryptohub_unsigned`), `Signing mode: Unsigned`.
   - (Opțional) setează `Asset folder: cryptohub`.

2) Variabile de mediu (Vercel → Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = numele cloudului tău (ex: `dopyxebpu`)
   - `NEXT_PUBLIC_CLOUDINARY_PRESET` = presetul unsigned (ex: `cryptohub_unsigned`)
   - Le pui și în `/.env.local` pentru local.

3) Copiază fișierele din acest patch:
   - `components/CloudinaryUploader.tsx` (sau `components/SimpleUploader.tsx`)
   - (Opțional) `app/admin/test-upload/page.example.tsx` – pagină demo

4) Folosește componenta:
```tsx
'use client';
import { useState } from 'react';
import CloudinaryUploader from '@/components/CloudinaryUploader';

export default function AdminNewsForm() {
  const [imgUrl, setImgUrl] = useState('');
  return (
    <div>
      <CloudinaryUploader onUploaded={(url) => setImgUrl(url)} />
      <input type="text" value={imgUrl} readOnly className="input" />
    </div>
  );
}
```

> **Important**: Nu seta manual `Content-Type` când trimiți `FormData`. Browserul o face corect automat
> cu boundary. Dacă o setezi tu, Vercel va returna `415 Unsupported Media Type` sau `500`.

## Fișiere

- `components/CloudinaryUploader.tsx` – uploader „gata de folosit”
- `components/SimpleUploader.tsx` – variantă minimă, controlată de tine
- `app/admin/test-upload/page.example.tsx` – pagină demo (muți în proiect și scoți `.example`)
- `.env.example` – variabilele necesare

Succes! 🚀
