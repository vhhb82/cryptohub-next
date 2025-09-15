// app/admin/test-upload/page.example.tsx
'use client';

import React, { useState } from 'react';
import CloudinaryUploader from '@/components/CloudinaryUploader';

export default function TestUploadPage() {
  const [url, setUrl] = useState('');

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Test Cloudinary Upload</h1>
      <CloudinaryUploader onUploaded={setUrl} />
      {url ? (
        <div className="mt-4">
          <div className="text-sm text-gray-600 mb-1">URL încărcat:</div>
          <code className="block text-xs break-all p-2 bg-gray-50 rounded border">{url}</code>
        </div>
      ) : null}
    </div>
  );
}
