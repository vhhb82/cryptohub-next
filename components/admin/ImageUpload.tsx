"use client";
import { useEffect, useRef, useState } from "react";
import { cloudinaryConfig } from "@/lib/cloudinary";

type Props = { name?: string; label?: string; defaultUrl?: string | null; onUploaded?: (url: string) => void; onRemoved?: () => void; };

export default function ImageUpload({ name="image", label="Imagine (opțional)", defaultUrl=null, onUploaded, onRemoved }: Props){
  const [url, setUrl] = useState<string | null>(defaultUrl || null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(()=>{ setUrl(defaultUrl || null); }, [defaultUrl]);
  
  async function onPick(e: React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0]; 
    if(!file) return; 
    setBusy(true);
    
    try{
      console.log("Uploading file to Cloudinary:", { name: file.name, type: file.type, size: file.size });
      
      // Test if file is valid
      if (!file.type || file.size === 0) {
        throw new Error("Invalid file");
      }
      
      // Check if Cloudinary is configured
      if (!cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset) {
        throw new Error("Cloudinary nu este configurat. Verifică variabilele de mediu NEXT_PUBLIC_CLOUDINARY_*");
      }
      
      // Upload directly to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      console.log("Cloudinary upload response status:", response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log("Cloudinary upload error response:", errorText);
        throw new Error(`Cloudinary upload failed: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log("Cloudinary upload success result:", result);
      
      setUrl(result.secure_url); 
      onUploaded?.(result.secure_url);
    }catch(err){ 
      console.error("Cloudinary upload error details:", err);
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      alert(`Nu am putut încărca imaginea: ${errorMessage}`); 
    }
    finally{ 
      setBusy(false); 
      if(inputRef.current) inputRef.current.value = ""; 
    }
  }
  
  async function remove(){
    if(!url) return; 
    setBusy(true);
    
    try{ 
      // Extract public_id from Cloudinary URL
      const publicIdMatch = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
      if (publicIdMatch) {
        const publicId = publicIdMatch[1];
        
        // Call Cloudinary delete API
        const response = await fetch('/api/cloudinary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'delete', publicId }),
        });
        
        if (response.ok) {
          setUrl(null); 
          onRemoved?.(); 
        } else {
          console.error("Failed to delete from Cloudinary");
        }
      } else {
        // If not a Cloudinary URL, just remove from state
        setUrl(null);
        onRemoved?.();
      }
    }
    catch(err){ 
      console.error(err); 
    } 
    finally{ 
      setBusy(false); 
    }
  }
  return (
    <div className="space-y-2">
      <label className="label">{label}</label>
      {url ? (
        <div className="card flex items-center gap-3">
          <img src={url} alt="preview" className="h-24 w-24 object-cover rounded-lg border" />
          <div className="flex-1 min-w-0">
            <p className="text-sm break-all">{url}</p>
            <button type="button" onClick={remove} disabled={busy} className="btn-ghost mt-2">Șterge imaginea</button>
          </div>
          <input type="hidden" name={name} value={url} />
        </div>
      ) : (
        <div className="card">
          <input ref={inputRef} type="file" accept="image/*,.svg" onChange={onPick} disabled={busy} />
          <p className="muted text-xs mt-1">Accept: JPG/PNG/WebP/GIF/SVG • max ~5–10MB recomandat</p>
        </div>
      )}
    </div>
  );
}
