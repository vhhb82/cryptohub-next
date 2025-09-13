"use client";
import { useEffect, useRef, useState } from "react";
import { uploadFile, getPublicUrl, deleteFile } from "@/lib/supabase";

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
      // Generate unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name}`;
      const path = `uploads/${filename}`;
      
      // Upload to Supabase Storage
      await uploadFile(file, 'images', path);
      
      // Get public URL
      const publicUrl = getPublicUrl('images', path);
      setUrl(publicUrl); 
      onUploaded?.(publicUrl);
    }catch(err){ 
      alert("Nu am putut încărca imaginea."); 
      console.error(err); 
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
      // Extract path from URL for deletion
      const urlParts = url.split('/');
      const path = urlParts.slice(-2).join('/'); // Get 'uploads/filename'
      
      await deleteFile('images', path); 
      setUrl(null); 
      onRemoved?.(); 
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
          <input ref={inputRef} type="file" accept="image/*" onChange={onPick} disabled={busy} />
          <p className="muted text-xs mt-1">Accept: JPG/PNG/WebP/GIF • max ~5–10MB recomandat</p>
        </div>
      )}
    </div>
  );
}
