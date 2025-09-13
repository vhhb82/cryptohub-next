import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST(req: Request){
  try{
    const { url } = await req.json() as { url?: string };
    const { deleteImage } = await import("@/lib/uploads");
    await deleteImage(url || "");
    return NextResponse.json({ ok: true });
  }catch(_){
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
