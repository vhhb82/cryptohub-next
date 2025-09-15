"use client";

import { useState } from "react";
import { cloudinaryConfig } from "@/lib/cloudinary";

export default function TestUploadSimple() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setResult("Se încarcă...");

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", cloudinaryConfig.uploadPreset!);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        { method: "POST", body: fd }
      );

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Upload eșuat (${res.status}). ${txt}`);
      }

      const data = await res.json();
      setResult(`✅ SUCCESS: ${data.secure_url}`);
    } catch (err: any) {
      setResult(`❌ ERROR: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Test Upload Simplu</h1>
      
      <div className="card max-w-md">
        <h2 className="font-semibold mb-4">Configurație Cloudinary:</h2>
        <div className="text-sm space-y-1">
          <div>Cloud Name: {cloudinaryConfig.cloudName || "❌ LIPSEȘTE"}</div>
          <div>Upload Preset: {cloudinaryConfig.uploadPreset || "❌ LIPSEȘTE"}</div>
        </div>
      </div>

      <div className="card max-w-md mt-6">
        <h2 className="font-semibold mb-4">Test Upload:</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg
                     file:border-0 file:text-sm file:font-semibold file:bg-indigo-50
                     file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
        />
        
        {result && (
          <div className={`mt-4 p-3 rounded text-sm ${
            result.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
