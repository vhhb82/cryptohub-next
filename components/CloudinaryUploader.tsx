// CloudinaryUploader.tsx
'use client';

import React, { useState } from 'react';

/**
 * Very small, dependency‑free uploader that works on Vercel.
 * Uses Cloudinary unsigned upload preset.
 *
 * Required env vars in your Next.js app (add to Vercel → Settings → Environment Variables
 * AND to your local .env.local):
 *  - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 *  - NEXT_PUBLIC_CLOUDINARY_PRESET
 *
 * Usage:
 *   <CloudinaryUploader onUploaded={(url) => setImageUrl(url)} />
 */
export default function CloudinaryUploader({
  onUploaded,
  label = 'Alege imaginea…',
  accept = 'image/*',
}: {
  onUploaded?: (url: string) => void;
  label?: string;
  accept?: string;
}) {
  const [preview, setPreview] = useState<string>('');
  const [busy, setBusy] = useState(false);
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!cloud || !preset) {
      alert('Lipsesc variabilele NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME sau NEXT_PUBLIC_CLOUDINARY_PRESET.');
      return;
    }
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('upload_preset', preset as string);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error('Upload a eșuat: ' + txt);
      }

      const data = await res.json();
      const url = data.secure_url as string;
      setPreview(url);
      onUploaded?.(url);
    } catch (err: any) {
      console.error(err);
      alert(err?.message ?? 'Upload error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="inline-flex items-center gap-2">
        <input
          type="file"
          accept={accept}
          disabled={busy}
          onChange={handleChange}
          className="block text-sm file:mr-3 file:py-2 file:px-3 file:rounded-md file:border file:border-gray-300 file:bg-white file:text-gray-700 hover:file:bg-gray-50 cursor-pointer"
        />
        <span className="text-sm text-gray-600">{busy ? 'Încărc…' : label}</span>
      </label>

      {preview ? (
        <div className="mt-2">
          <img
            src={preview}
            alt="Preview"
            className="max-h-48 rounded-md border border-gray-200"
          />
          <p className="text-xs text-gray-500 break-all mt-1">{preview}</p>
        </div>
      ) : null}
    </div>
  );
}
