"use client";
import { useEffect, useRef, useState } from "react";

type Props = { name?: string; label?: string; defaultUrl?: string | null; onUploaded?: (url: string) => void; onRemoved?: () => void; };

export default function ImageUpload({ name="image", label="Imagine (opțional)", defaultUrl=null, onUploaded, onRemoved }: Props){
  const [url, setUrl] = useState<string | null>(defaultUrl || null);
  const [path, setPath] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(()=>{ setUrl(defaultUrl || null); }, [defaultUrl]);
  
  async function onPick(e: React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0]; 
    if(!file) return; 
    setBusy(true);
    
    try{
      // Create FormData for upload
      const formData = new FormData();
      formData.append('file', file);
      
      console.log("Uploading file:", { name: file.name, type: file.type, size: file.size });
      
      // Test if file is valid
      if (!file.type || file.size === 0) {
        throw new Error("Invalid file");
      }
      
      // Upload to local API route
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      console.log("Upload response status:", response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log("Upload error response:", errorText);
        let error;
        try {
          error = JSON.parse(errorText);
        } catch {
          error = { error: errorText };
        }
        throw new Error(error.error || 'Upload failed');
      }
      
      const result = await response.json();
      console.log("Upload success result:", result);
      setUrl(result.url); 
      setPath(result.path);
      onUploaded?.(result.url);
    }catch(err){ 
      console.error("Upload error details:", err);
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
      // Call delete API
      const response = await fetch('/api/upload/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, path }),
      });
      
      if (response.ok) {
        setUrl(null); 
        setPath(null);
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
