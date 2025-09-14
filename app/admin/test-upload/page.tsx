"use client";

import UploadThingImageUpload from "@/components/admin/UploadThingImageUpload";
import { useState } from "react";

export default function TestUploadPage() {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleUploaded = (url: string) => {
    setUploadedUrl(url);
    setMessage(`✅ Imagine încărcată cu succes: ${url}`);
  };

  const handleRemoved = () => {
    setUploadedUrl(null);
    setMessage("🗑️ Imagine ștearsă");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Test UploadThing</h1>
      
      {message && (
        <div className={`p-4 rounded mb-6 ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Test Upload Imagine</h2>
          <UploadThingImageUpload
            name="test-image"
            label="Imagine de test"
            onUploaded={handleUploaded}
            onRemoved={handleRemoved}
          />
        </div>

        {uploadedUrl && (
          <div className="card">
            <h3 className="font-semibold mb-2">URL-ul imaginii:</h3>
            <p className="text-sm break-all bg-gray-100 p-2 rounded">
              {uploadedUrl}
            </p>
          </div>
        )}

        <div className="card">
          <h3 className="font-semibold mb-2">Instrucțiuni:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Apasă pe "Alege imaginea"</li>
            <li>Selectează o imagine (JPG, PNG, WebP, GIF)</li>
            <li>Așteaptă să se încarce</li>
            <li>Verifică URL-ul generat</li>
            <li>Testează ștergerea imaginii</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
