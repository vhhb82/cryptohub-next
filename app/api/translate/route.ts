import { NextResponse } from "next/server";

export async function POST(req: Request){
  try{
    const { title, excerpt, content, from = "RO", to = "EN" } = await req.json();
    const key = process.env.DEEPL_API_KEY;
    if(!key) return NextResponse.json({ error: "DEEPL_API_KEY missing" }, { status: 400 });

    const plan = process.env.DEEPL_PLAN === "pro" ? "pro" : "free";
    const endpoint = plan === "pro" ? "https://api.deepl.com/v2/translate" : "https://api-free.deepl.com/v2/translate";

    async function tr(txt?: string){
      if(!txt) return "";
      const body = new URLSearchParams({ text: txt, source_lang: from.toUpperCase(), target_lang: to.toUpperCase() });
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Authorization": "DeepL-Auth-Key " + key, "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        cache: "no-store",
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data?.message || "translate_fail");
      return data.translations?.[0]?.text || "";
    }

    const [titleEn, excerptEn, contentEn] = await Promise.all([tr(title), tr(excerpt), tr(content)]);
    return NextResponse.json({ titleEn, excerptEn, contentEn });
  }catch(err:any){
    return NextResponse.json({ error: err?.message || "translate_fail" }, { status: 500 });
  }
}
