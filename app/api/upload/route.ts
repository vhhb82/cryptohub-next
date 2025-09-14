import { NextResponse } from "next/server";

export const runtime = "nodejs"; // folosim Buffer

const ALLOWED = [
  "image/jpeg", 
  "image/jpg", 
  "image/png", 
  "image/webp", 
  "image/gif",
  "image/svg+xml",
  "image/svg",
  "application/xml",
  "text/xml",
  "application/octet-stream",
  "text/plain"
];
const MAX_MB = 10;

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "NO_FILE" }, { status: 400 });

  console.log("Upload request:", { 
    name: file.name, 
    type: file.type, 
    size: file.size
  });

  // Check if it's an image by extension
  const isImageByExtension = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name);
  
  if (!isImageByExtension) {
    console.log("Not an image file:", file.name);
    return NextResponse.json({ error: "NOT_IMAGE" }, { status: 415 });
  }

  const sizeMB = (file.size / (1024 * 1024));
  if (sizeMB > MAX_MB) {
    return NextResponse.json({ error: "SIZE" }, { status: 413 });
  }

  try {
    // Convert to Base64 - 100% functional solution
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const dataUrl = `data:${file.type || 'image/jpeg'};base64,${base64}`;
    
    console.log("Base64 upload success:", { 
      name: file.name, 
      type: file.type, 
      size: file.size,
      method: "base64" 
    });
    
    return NextResponse.json({ 
      url: dataUrl, 
      path: dataUrl,
      method: "base64",
      name: file.name,
      type: file.type
    });
  } catch (error) {
    console.error("Base64 upload error:", error);
    return NextResponse.json({ 
      error: "UPLOAD_FAILED", 
      message: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
