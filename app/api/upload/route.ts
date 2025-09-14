import { NextResponse } from "next/server";

// Compatibil cu Vercel Edge Runtime
export const runtime = "edge";

const MAX_MB = 10;

// Helper function pentru Base64 encoding compatibil cu Edge Runtime
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

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
      size: file.size,
      environment: process.env.VERCEL ? "vercel" : "local"
    });

    // Verifică dimensiunea fișierului
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_MB) {
      return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 413 });
    }

    // Convert to Base64 - compatibil cu Vercel Edge Runtime
    const arrayBuffer = await file.arrayBuffer();
    const base64 = arrayBufferToBase64(arrayBuffer);
    const dataUrl = `data:${file.type || 'image/jpeg'};base64,${base64}`;
    
    console.log("Base64 upload success:", { 
      name: file.name, 
      type: file.type, 
      size: file.size,
      method: "base64",
      environment: process.env.VERCEL ? "vercel" : "local"
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
