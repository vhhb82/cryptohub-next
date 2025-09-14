import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { url, path } = await req.json() as { url?: string; path?: string };

  // Check if we're on Vercel (serverless) or local development
  const isVercel = process.env.VERCEL === "1";
  const hasValidSupabase = process.env.SUPABASE_URL && 
                          process.env.SUPABASE_SERVICE_ROLE_KEY && 
                          process.env.SUPABASE_URL.includes('supabase.co') && 
                          !process.env.SUPABASE_URL.includes('rnnlpwoitjrmjuxwcaqt');

  console.log("Delete environment check:", { isVercel, hasValidSupabase, url, path });

  // Try Supabase first (required on Vercel, optional locally)
  if (hasValidSupabase) {
    try {
      const { supabase } = await import("@/lib/supabase");
      const bucket = process.env.SUPABASE_BUCKET || "uploads";

      // dacă nu primim path, îl extragem din URL public
      let key = path;
      if (!key && url) {
        const prefix = `/storage/v1/object/public/${bucket}/`;
        const i = url.indexOf(prefix);
        if (i !== -1) key = url.substring(i + prefix.length);
      }

      console.log("Deleting from Supabase:", { bucket, key });

      if (key) {
        const { error } = await supabase.storage.from(bucket).remove([key]);
        if (error) {
          console.error("Supabase delete error:", error);
          throw error;
        }
      }
      
      console.log("Supabase delete success");
      return NextResponse.json({ ok: true });
    } catch (error) {
      console.error("Supabase delete failed:", error);
      
      // On Vercel, if Supabase fails, we can't fallback to local
      if (isVercel) {
        return NextResponse.json({ 
          error: "SUPABASE_DELETE_FAILED", 
          message: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
      }
      
      // On local, fall through to local delete
      console.log("Falling back to local delete");
    }
  }

  // Local fallback (only works in development)
  if (!isVercel) {
    try {
      const { deleteImage } = await import("@/lib/uploads");
      await deleteImage(url || "");
      console.log("Local delete success");
      return NextResponse.json({ ok: true });
    } catch (error) {
      console.error("Local delete error:", error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  }

  // This should never happen, but just in case
  return NextResponse.json({ error: "NO_DELETE_METHOD" }, { status: 500 });
}
