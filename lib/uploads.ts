import fs from "node:fs/promises";
import fssync from "node:fs";
import path from "node:path";
import sharp from "sharp";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED = new Set(["image/jpeg","image/png","image/webp","image/gif"]);

function sanitizeBase(name: string){
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^[-.]+|[-.]+$/g, "");
}

export async function ensureDir(){
  if(!fssync.existsSync(UPLOAD_DIR)){ await fs.mkdir(UPLOAD_DIR, { recursive: true }); }
}

export async function saveImage(buf: Buffer, mime: string, origName: string){
  if(!ALLOWED.has(mime)) throw new Error("UNSUPPORTED_MIME");
  await ensureDir();
  const base = sanitizeBase(origName || "image");
  const stamp = Date.now();
  const fileBase = base.replace(/\.[a-z0-9]+$/i, "");
  const fileName = `${fileBase}-${stamp}.webp`;
  const abs = path.join(UPLOAD_DIR, fileName);
  const out = await sharp(buf).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  await fs.writeFile(abs, out);
  return "/uploads/" + fileName;
}

export async function deleteImage(relUrl: string){
  if(!relUrl || !relUrl.startsWith("/uploads/")) return;
  const abs = path.join(process.cwd(), "public", relUrl.replace(/^\/+/, ""));
  const uploadsRoot = path.join(process.cwd(), "public", "uploads");
  const resolved = path.resolve(abs);
  if(!resolved.startsWith(uploadsRoot)) return;
  try{ await fs.unlink(resolved); }catch(_){}
}
