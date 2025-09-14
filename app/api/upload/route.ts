import { NextResponse } from "next/server";

// Compatibil cu Vercel Edge Runtime
export const runtime = "edge";

const MAX_MB = 2; // Foarte redus pentru Vercel Edge Runtime
const MAX_BYTES = MAX_MB * 1024 * 1024;

// Helper function pentru Base64 encoding compatibil cu Edge Runtime
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  
  // Pentru fișiere foarte mici, folosește metoda simplă
  if (bytes.length < 1024) {
    const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
    return btoa(binary);
  }
  
  // Pentru fișiere mai mari, folosește chunks foarte mici
  const chunks = [];
  const chunkSize = 1024; // Chunks foarte mici pentru Edge Runtime
  
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
    if (file.size > MAX_BYTES) {
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
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Verifică din nou dimensiunea după arrayBuffer
      if (arrayBuffer.byteLength > MAX_BYTES) {
        return NextResponse.json({ 
          error: "FILE_TOO_LARGE", 
          message: `Fișierul este prea mare. Maxim ${MAX_MB}MB permis.` 
        }, { status: 413 });
      }
      
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
    } catch (bufferError) {
      console.error("Buffer processing error:", bufferError);
      return NextResponse.json({ 
        error: "BUFFER_PROCESSING_FAILED", 
        message: "Eroare la procesarea fișierului. Încearcă cu o imagine mai mică." 
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ 
      error: "UPLOAD_FAILED", 
      message: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
