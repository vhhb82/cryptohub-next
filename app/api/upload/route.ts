import { NextResponse } from "next/server";

// Compatibil cu Vercel Edge Runtime
export const runtime = "edge";

const MAX_MB = 5; // Redus pentru Vercel Edge Runtime

// Helper function pentru Base64 encoding compatibil cu Edge Runtime
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunks = [];
  
  // Procesează în chunks pentru a evita limitele Edge Runtime
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.slice(i, i + chunkSize);
    const binary = Array.from(chunk, byte => String.fromCharCode(byte)).join('');
    chunks.push(binary);
  }
  
  return btoa(chunks.join(''));
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
      return NextResponse.json({ 
        error: "FILE_TOO_LARGE", 
        message: `Fișierul este prea mare. Maxim ${MAX_MB}MB permis.` 
      }, { status: 413 });
    }

    // Verifică tipul de fișier
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 
      'image/svg+xml', 'image/svg'
    ];
    
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
      return NextResponse.json({ 
        error: "UNSUPPORTED_MEDIA_TYPE", 
        message: "Tip de fișier nesuportat. Folosește JPG, PNG, WebP, GIF sau SVG." 
      }, { status: 415 });
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
