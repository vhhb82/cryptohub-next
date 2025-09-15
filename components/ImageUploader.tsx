"use client";

import { useMemo, useState } from "react";
import { cloudinaryConfig } from "@/lib/cloudinary";

type Props = {
  fieldName?: string;
  onUploaded?: (url: string) => void;
  maxSizeMB?: number;
  className?: string;
  label?: string;
  required?: boolean;
};

export default function ImageUploader({
  fieldName = "imageUrl",
  onUploaded,
  maxSizeMB = 8,
  className,
  label = "Imagine (opțional)",
  required = false,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canUpload = useMemo(() => {
    const can = Boolean(cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset);
    console.log('ImageUploader: Cloudinary config:', {
      cloudName: cloudinaryConfig.cloudName,
      uploadPreset: cloudinaryConfig.uploadPreset,
      canUpload: can
    });
    return can;
  }, []);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Selectează o imagine (JPG/PNG/WebP).");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Fișierul e prea mare (> ${maxSizeMB}MB).`);
      return;
    }
    if (!canUpload) {
      setError("Configul Cloudinary lipsește (NEXT_PUBLIC_CLOUDINARY_*).");
      return;
    }

    setStatus("uploading");
    setPreview(URL.createObjectURL(file));

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", cloudinaryConfig.uploadPreset!);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        { method: "POST", body: fd }
      );

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Upload eșuat (${res.status}). ${txt}`);
      }

      const data = await res.json();
      const secureUrl: string = data.secure_url;
      console.log('ImageUploader: Upload successful, URL:', secureUrl);
      setUrl(secureUrl);
      setStatus("done");
      onUploaded?.(secureUrl);
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Upload eșuat.");
    }
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg
                   file:border-0 file:text-sm file:font-semibold file:bg-indigo-50
                   file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
      />

      <input type="hidden" name={fieldName} value={url} key={url} />
      {url && <div className="text-xs text-green-600 mt-1">✅ URL salvat: {url.substring(0, 50)}...</div>}
      {!url && <div className="text-xs text-gray-500 mt-1">⚠️ Nu s-a încărcat nicio imagine</div>}

      {preview && (
        <div className="mt-3">
          <img
            src={preview}
            alt="preview"
            className="h-36 w-auto rounded-lg border border-gray-200 object-cover"
          />
        </div>
      )}

      <div className="mt-2 text-xs text-gray-500">
        {status === "uploading" && "Se încarcă…"}
        {status === "done" && url && (
          <span className="text-green-600">Încărcat. URL salvat în formular.</span>
        )}
        {status === "error" && error && <span className="text-red-600">{error}</span>}
      </div>
    </div>
  );
}