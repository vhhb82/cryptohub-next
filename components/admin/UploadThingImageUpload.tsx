"use client";

import { UploadButton } from "@uploadthing/react";
import { useState } from "react";
import type { OurFileRouter } from "@/lib/uploadthing";

type Props = {
  name?: string;
  label?: string;
  defaultUrl?: string | null;
  onUploaded?: (url: string) => void;
  onRemoved?: () => void;
};

export default function UploadThingImageUpload({
  name = "image",
  label = "Imagine (opțional)",
  defaultUrl = null,
  onUploaded,
  onRemoved,
}: Props) {
  const [url, setUrl] = useState<string | null>(defaultUrl || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadComplete = (res: any) => {
    console.log("Upload complete:", res);
    if (res && res[0] && res[0].url) {
      setUrl(res[0].url);
      onUploaded?.(res[0].url);
    }
    setIsUploading(false);
  };

  const handleUploadError = (error: Error) => {
    console.error("Upload error:", error);
    alert(`Eroare la upload: ${error.message}`);
    setIsUploading(false);
  };

  const handleRemove = () => {
    setUrl(null);
    onRemoved?.();
  };

  return (
    <div className="space-y-2">
      <label className="label">{label}</label>
      
      {url ? (
        <div className="card flex items-center gap-3">
          <img 
            src={url} 
            alt="preview" 
            className="h-24 w-24 object-cover rounded-lg border" 
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm break-all text-gray-600">{url}</p>
            <button 
              type="button" 
              onClick={handleRemove}
              className="btn-ghost mt-2 text-red-600 hover:text-red-800"
            >
              Șterge imaginea
            </button>
          </div>
          <input type="hidden" name={name} value={url} />
        </div>
      ) : (
        <div className="card">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            onUploadBegin={() => setIsUploading(true)}
            appearance={{
              button: "ut-ready:bg-blue-500 ut-uploading:cursor-not-allowed rounded-r-none bg-blue-500 text-white hover:bg-blue-600",
              allowedContent: "hidden",
            }}
            content={{
              button: isUploading ? "Se încarcă..." : "Alege imaginea",
            }}
          />
          <p className="muted text-xs mt-1">
            Accept: JPG/PNG/WebP/GIF • max 4MB
          </p>
        </div>
      )}
    </div>
  );
}
