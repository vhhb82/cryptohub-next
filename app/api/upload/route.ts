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
    size: file.size,
    allowed: ALLOWED 
  });

  // Check if file type is allowed or if it's an image by extension
  const isAllowedType = ALLOWED.includes(file.type);
  const isImageByExtension = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name);
  
  if (!isAllowedType && !isImageByExtension) {
    console.log("Unsupported file type:", file.type, "for file:", file.name);
    return NextResponse.json({ error: "TYPE", received: file.type, allowed: ALLOWED }, { status: 415 });
  }
  
  if (!isAllowedType && isImageByExtension) {
    console.log("File type not in allowed list but appears to be image by extension:", file.type, "for file:", file.name);
  }
  const sizeMB = (file.size / (1024 * 1024));
  if (sizeMB > MAX_MB) {
    return NextResponse.json({ error: "SIZE" }, { status: 413 });
  }

  // Check if we're on Vercel (serverless) or local development
  const isVercel = process.env.VERCEL === "1";
  const hasValidSupabase = process.env.SUPABASE_URL && 
                          process.env.SUPABASE_SERVICE_ROLE_KEY && 
                          process.env.SUPABASE_URL.includes('supabase.co') && 
                          !process.env.SUPABASE_URL.includes('rnnlpwoitjrmjuxwcaqt');

  console.log("Environment check:", { isVercel, hasValidSupabase });

  // On Vercel, we MUST use Supabase (no local filesystem)
  if (isVercel && !hasValidSupabase) {
    console.error("Vercel deployment requires valid Supabase configuration");
    // Return a placeholder URL for now to prevent 500 errors
    const placeholderUrl = `https://via.placeholder.com/800x600/cccccc/666666?text=${encodeURIComponent(file.name)}`;
    return NextResponse.json({ 
      url: placeholderUrl, 
      path: placeholderUrl,
      warning: "SUPABASE_NOT_CONFIGURED" 
    });
  }

  // Try Supabase first (required on Vercel, optional locally)
  if (hasValidSupabase) {
    try {
      const { supabase } = await import("@/lib/supabase");
      const arrayBuf = await file.arrayBuffer();
      const bytes = Buffer.from(arrayBuf);
      const bucket = process.env.SUPABASE_BUCKET || "uploads";

      const ext = (file.name.split(".").pop() || "bin").toLowerCase();
      const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      console.log("Uploading to Supabase:", { bucket, key, contentType: file.type });

      const { data, error } = await supabase
        .storage
        .from(bucket)
        .upload(key, bytes, { contentType: file.type });

      if (error) {
        console.error("Supabase upload error:", error);
        throw error;
      }

      const { data: pub } = supabase.storage.from(bucket).getPublicUrl(data.path);
      console.log("Supabase upload success:", { url: pub.publicUrl, path: data.path });
      return NextResponse.json({ url: pub.publicUrl, path: data.path });
    } catch (error) {
      console.error("Supabase upload failed:", error);
      
      // On Vercel, if Supabase fails, we can't fallback to local
      if (isVercel) {
        return NextResponse.json({ 
          error: "SUPABASE_UPLOAD_FAILED", 
          message: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
      }
      
      // On local, fall through to local upload
      console.log("Falling back to local upload");
    }
  }

  // Local fallback (only works in development)
  if (!isVercel) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const { saveImage } = await import("@/lib/uploads");
      const url = await saveImage(Buffer.from(arrayBuffer), file.type, file.name);
      console.log("Local upload success:", { url });
      return NextResponse.json({ url, path: url });
    } catch (err: any) {
      console.error("Local upload error:", err);
      const code = err?.message === "UNSUPPORTED_MIME" ? 415 : 500;
      return NextResponse.json({ error: err?.message || "UPLOAD_FAIL" }, { status: code });
    }
  }

  // This should never happen, but just in case
  return NextResponse.json({ error: "NO_UPLOAD_METHOD" }, { status: 500 });
}
