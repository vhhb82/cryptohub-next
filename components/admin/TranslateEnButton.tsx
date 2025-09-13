"use client";
import { useState } from "react";
export default function TranslateEnButton(){
  const [busy, setBusy] = useState(false);
  async function handle(){
    const title = (document.querySelector('input[name="title"]') as HTMLInputElement)?.value || "";
    const excerpt = (document.querySelector('textarea[name="excerpt"]') as HTMLTextAreaElement)?.value || "";
    const content = (document.querySelector('textarea[name="content"]') as HTMLTextAreaElement)?.value || "";
    setBusy(true);
    try{
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, excerpt, content, from: "RO", to: "EN" }),
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data?.error || "translate_fail");
      (document.querySelector('input[name="titleEn"]') as HTMLInputElement).value = data.titleEn || "";
      (document.querySelector('textarea[name="excerptEn"]') as HTMLTextAreaElement).value = data.excerptEn || "";
      (document.querySelector('textarea[name="contentEn"]') as HTMLTextAreaElement).value = data.contentEn || "";
      alert("Traducere completă.");
    }catch(err:any){
      alert("Traducerea a eșuat: " + (err?.message || ""));
      console.error(err);
    }finally{ setBusy(false); }
  }
  return <button type="button" onClick={handle} className="btn-ghost" disabled={busy}>{busy ? "Traduc..." : "Generează EN automat"}</button>;
}
