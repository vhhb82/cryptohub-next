// patch19-admin-images.js — Admin uploads for News/Posts (local /public/uploads + WebP via sharp)
// Run: node patch19-admin-images.js
const fs = require("fs");
const path = require("path");
const w = (p,c)=>{ const d=path.dirname(p); if(!fs.existsSync(d)) fs.mkdirSync(d,{recursive:true}); fs.writeFileSync(p,c,"utf8"); console.log("✔ wrote",p); };

// 0) .gitignore update
const gi = ".gitignore";
try{
  let txt = fs.existsSync(gi) ? fs.readFileSync(gi,"utf8") : "";
  if(!txt.includes("public/uploads")){
    txt += "\n# uploads\npublic/uploads/\n";
    fs.writeFileSync(gi, txt, "utf8");
    console.log("✔ updated .gitignore");
  }
}catch(e){console.log("ℹ .gitignore not modified", e?.message)}

// keep folder
w("public/uploads/.gitkeep", "");

// 1) lib/uploads.ts — safe filename + sharp conversion
w("lib/uploads.ts", `
import fs from "node:fs/promises";
import fssync from "node:fs";
import path from "node:path";
import sharp from "sharp";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const ALLOWED = new Set(["image/jpeg","image/png","image/webp","image/gif"]);
function sanitizeBase(name: string){
  return name.toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "");
}

export async function ensureDir(){
  if(!fssync.existsSync(UPLOAD_DIR)){
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export async function saveImage(buf: Buffer, mime: string, origName: string){
  if(!ALLOWED.has(mime)) throw new Error("UNSUPPORTED_MIME");
  await ensureDir();
  const base = sanitizeBase(origName || "image");
  const stamp = Date.now();
  const fileBase = base.replace(/\\.[a-z0-9]+$/i, "");
  const fileName = \`\${fileBase}-\${stamp}.webp\`;
  const abs = path.join(UPLOAD_DIR, fileName);

  // Convert to WebP, width max 1600
  const out = await sharp(buf).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  await fs.writeFile(abs, out);
  const rel = "/uploads/" + fileName;
  return rel;
}

export async function deleteImage(relUrl: string){
  // relUrl expected like "/uploads/xxx.webp"
  if(!relUrl || !relUrl.startsWith("/uploads/")) return;
  const abs = path.join(process.cwd(), "public", relUrl.replace(/^\\/+/, ""));
  // security: must remain inside /public/uploads
  const uploadsRoot = path.join(process.cwd(), "public", "uploads");
  const resolved = path.resolve(abs);
  if(!resolved.startsWith(uploadsRoot)) return;
  try{ await fs.unlink(resolved); }catch(_){ /* ignore */ }
}
`);

// 2) API routes
w("app/api/upload/route.ts", `
import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function POST(req: Request){
  try{
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if(!file) return NextResponse.json({ error: "NO_FILE" }, { status: 400 });
    const arrayBuffer = await file.arrayBuffer();
    const { saveImage } = await import("@/lib/uploads");
    const url = await saveImage(Buffer.from(arrayBuffer), file.type, file.name);
    return NextResponse.json({ url });
  }catch(err:any){
    const code = err?.message === "UNSUPPORTED_MIME" ? 415 : 500;
    return NextResponse.json({ error: err?.message || "UPLOAD_FAIL" }, { status: code });
  }
}
`);

w("app/api/upload/delete/route.ts", `
import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function POST(req: Request){
  try{
    const { url } = await req.json() as { url?: string };
    const { deleteImage } = await import("@/lib/uploads");
    await deleteImage(url || "");
    return NextResponse.json({ ok: true });
  }catch(_){
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
`);

// 3) Client component: ImageUpload (preview + hidden input)
w("components/admin/ImageUpload.tsx", `
"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  name?: string;            // form input name (default "image")
  label?: string;
  defaultUrl?: string | null;
  onUploaded?: (url: string) => void;
  onRemoved?: () => void;
};

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
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if(!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setUrl(data.url);
      onUploaded?.(data.url);
    }catch(err){
      alert("Nu am putut încărca imaginea.");
      console.error(err);
    }finally{
      setBusy(false);
      if(inputRef.current) inputRef.current.value = "";
    }
  }

  async function remove(){
    if(!url) return;
    setBusy(true);
    try{
      await fetch("/api/upload/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) });
      setUrl(null);
      onRemoved?.();
    }catch(err){
      console.error(err);
    }finally{
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="label">{label}</label>
      {url ? (
        <div className="card flex items-center gap-3">
          <img src={url} alt="preview" className="h-24 w-24 object-cover rounded-lg border" />
          <div className="flex-1">
            <p className="text-sm break-all">{url}</p>
            <button type="button" onClick={remove} disabled={busy} className="btn-ghost mt-2">Șterge imaginea</button>
          </div>
          {/* hidden input for form submit */}
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
`);

console.log("\\nPatch19 ready. Add <ImageUpload/> în formularele Admin (News & Posts).");
