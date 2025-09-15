import { createProductAction } from "@/app/admin/actions";
import TranslateEnButton from "@/components/admin/TranslateEnButton";
import ImageUploader from "@/components/ImageUploader";

export const metadata = { title: "Admin • Adaugă produs" };

export default function NewProductPage(){
  return (
    <form action={createProductAction} className="space-y-6">
      <h1 className="text-2xl font-semibold">Adaugă produs</h1>
      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="font-semibold">Română</h2>
          <div><label className="label">Titlu</label><input name="title" className="input" required /></div>
          <div><label className="label">Bullets (RO) — câte o linie</label><textarea name="bullets" className="input" rows={6} placeholder="• funcție A
• funcție B" /></div>
          <div><label className="label">Link / CTA URL</label><input name="href" className="input" placeholder="https://..." /></div>
          <ImageUploader fieldName="image" label="Imagine (opțional)" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between"><h2 className="font-semibold">English</h2><TranslateEnButton /></div>
          <div><label className="label">Title (EN)</label><input name="titleEn" className="input" /></div>
          <div><label className="label">Bullets (EN) — câte o linie</label><textarea name="bulletsEn" className="input" rows={6} /></div>
        </div>
      </section>
      <button className="btn-primary">Publică produsul</button>
    </form>
  );
}
