import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { url, path } = await req.json() as { url?: string; path?: string };

  console.log("Delete request:", { url, path });

  // For Base64 images, we don't need to delete anything from storage
  // The image data is stored in the database and will be removed when the record is deleted
  if (url && url.startsWith('data:')) {
    console.log("Base64 image delete - no action needed");
    return NextResponse.json({ ok: true, method: "base64" });
  }

  // For other types of URLs, we can't delete them in this simplified approach
  console.log("Non-Base64 image delete - no action taken");
  return NextResponse.json({ ok: true, method: "noop" });
}
