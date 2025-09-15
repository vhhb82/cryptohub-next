// SimpleUploader.tsx
'use client';

import React from 'react';

/**
 * O versiune și mai simplă – primește fișierul din exterior și îl urcă.
 * Exemplu:
 *   <SimpleUploader>
 *     {(upload) => <input type="file" onChange={(e) => upload(e.target.files?.[0])} />}
 *   </SimpleUploader>
 */
export default function SimpleUploader({
  children,
  onUploaded,
}: {
  children: (upload: (file?: File) => Promise<void>) => React.ReactNode;
  onUploaded?: (url: string) => void;
}) {
  async function upload(file?: File) {
    if (!file) return;
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
    if (!cloud || !preset) {
      alert('Setează NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME și NEXT_PUBLIC_CLOUDINARY_PRESET');
      return;
    }
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', preset as string);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
      method: 'POST',
      body: fd,
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    onUploaded?.(data.secure_url as string);
  }

  return <>{children(upload)}</>;
}
