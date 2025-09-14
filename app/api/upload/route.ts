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
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "NO_FILE" }, { status: 400 });
    }

    console.log("Upload request:", { 
      name: file.name, 
      type: file.type, 
      size: file.size
    });

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
    console.error("Upload error:", error);
    return NextResponse.json({ 
      error: "UPLOAD_FAILED", 
      message: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
