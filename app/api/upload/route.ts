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
