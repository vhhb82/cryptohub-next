"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";

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

  const handleUploaded = (newUrl: string) => {
    setUrl(newUrl);
    onUploaded?.(newUrl);
  };

  const handleRemove = () => {
    setUrl(null);
    onRemoved?.();
  };

  return (
    <div className="space-y-2">
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
        <ImageUploader
          fieldName={name}
          label={label}
          onUploaded={handleUploaded}
          maxSizeMB={4}
        />
      )}
    </div>
  );
}
