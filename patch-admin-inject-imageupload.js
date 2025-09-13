// patch-admin-inject-imageupload.js
// Scanează app/admin/**/*.tsx și înlocuiește <input name="image" ...> cu <ImageUpload ... />
// Adaugă automat importul, creează ImageUpload dacă lipsește, și adaugă pagini template dacă nu găsește nimic.
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const adminDir = path.join(root, 'app', 'admin');

function findFiles(dir, exts = ['.tsx', '.ts']) {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) res = res.concat(findFiles(p, exts));
    else if (exts.includes(path.extname(entry.name))) res.push(p);
  }
  return res;
}

function ensureImageUpload() {
  const compPath = path.join(root, 'components', 'admin', 'ImageUpload.tsx');
  if (!fs.existsSync(compPath)) {
    fs.mkdirSync(path.dirname(compPath), { recursive: true });
    fs.writeFileSync(compPath, `"use client";
import { useEffect, useRef, useState } from "react";
type Props = { name?: string; label?: string; defaultUrl?: string | null; onUploaded?: (url: string) => void; onRemoved?: () => void; };
export default function ImageUpload({ name="image", label="Imagine (opțional)", defaultUrl=null, onUploaded, onRemoved }: Props){
  const [url, setUrl] = useState<string | null>(defaultUrl || null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(()=>{ setUrl(defaultUrl || null); }, [defaultUrl]);
  async function onPick(e: React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0]; if(!file) return; setBusy(true);
    try{
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if(!res.ok) throw new Error("Upload failed");
      const data = await res.json(); setUrl(data.url); onUploaded?.(data.url);
    }catch(err){ alert("Nu am putut încărca imaginea."); console.error(err); }
    finally{ setBusy(false); if(inputRef.current) inputRef.current.value = ""; }
  }
  async function remove(){
    if(!url) return; setBusy(true);
    try{ await fetch("/api/upload/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) }); setUrl(null); onRemoved?.(); }
    catch(err){ console.error(err); } finally{ setBusy(false); }
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
`, 'utf8');
    console.log('✔ created components/admin/ImageUpload.tsx');
  } else {
    console.log('✔ ImageUpload component exists');
  }
}

function patchFile(file) {
  let src = fs.readFileSync(file, 'utf8');
  const before = src;

  // 1) Add import if missing
  if (!src.includes('components/admin/ImageUpload')) {
    // insert after other imports
    const lines = src.split(/\r?\n/);
    let i = 0;
    while (i < lines.length && lines[i].startsWith('import ')) i++;
    lines.splice(i, 0, 'import ImageUpload from "@/components/admin/ImageUpload";');
    src = lines.join('\n');
  }

  // 2) Replace any <input ... name="image" ...> region with ImageUpload
  // This is a simple heuristic: replace the first occurrence
  const reInput = /<input[^>]*name=["']image["'][^>]*\/?>/im;
  if (reInput.test(src)) {
    src = src.replace(reInput, `<ImageUpload name="image" label="Imagine (opțional)" />`);
  } else {
    // Try to replace a block with label + input
    const reBlock = /(.*label[^<]*imagin[^<]*<\/label>[\s\S]{0,200})<input[^>]*name=["']image["'][^>]*\/?>/im;
    if (reBlock.test(src)) {
      src = src.replace(reBlock, `<ImageUpload name="image" label="Imagine (opțional)" />`);
    }
  }

  if (src !== before) {
    fs.writeFileSync(file, src, 'utf8');
    console.log('✔ patched', path.relative(root, file));
    return true;
  }
  return false;
}

function ensureTemplatesIfNoPatch() {
  const pages = [
    { rel: path.join('app','admin','stiri','new','page.tsx'),
      content: `import ImageUpload from "@/components/admin/ImageUpload";
export default function NewStirePage(){
  return (
    <form action="/admin/stiri/create" method="post" className="space-y-4">
      <div><label className="label">Titlu</label><input name="title" className="input" required /></div>
      <div><label className="label">Slug</label><input name="slug" className="input" required /></div>
      <div><label className="label">Rezumat</label><textarea name="excerpt" className="input" /></div>
      <ImageUpload name="image" label="Imagine (opțional)" />
      <div><label className="label">Conținut</label><textarea name="content" className="input" rows={6} /></div>
      <button className="btn-primary">Publică știrea</button>
    </form>
  );
}`},
    { rel: path.join('app','admin','posts','new','page.tsx'),
      content: `import ImageUpload from "@/components/admin/ImageUpload";
export default function NewPostPage(){
  return (
    <form action="/admin/posts/create" method="post" className="space-y-4">
      <div><label className="label">Titlu</label><input name="title" className="input" required /></div>
      <div><label className="label">Slug</label><input name="slug" className="input" required /></div>
      <div><label className="label">Rezumat</label><textarea name="excerpt" className="input" /></div>
      <ImageUpload name="image" label="Imagine (opțional)" />
      <div><label className="label">Conținut</label><textarea name="content" className="input" rows={6} /></div>
      <button className="btn-primary">Publică postarea</button>
    </form>
  );
}`},
  ];
  let created = 0;
  for (const p of pages) {
    const abs = path.join(root, p.rel);
    if (!fs.existsSync(abs)) {
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, p.content, 'utf8');
      console.log('✔ created', p.rel);
      created++;
    }
  }
  if (created > 0) {
    console.log('ℹ Nu am găsit câmpul image în paginile existente, am generat pagini template cu ImageUpload.');
  }
}

(function main(){
  ensureImageUpload();

  let patched = 0;
  const files = findFiles(adminDir);
  for (const f of files) {
    if (patchFile(f)) patched++;
  }
  if (patched === 0) ensureTemplatesIfNoPatch();

  console.log(`\nDone. Patched files: ${patched}`);
  console.log(`Repornește dev serverul după patch.`);
})();