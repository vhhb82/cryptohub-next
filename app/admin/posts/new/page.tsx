import { createPostAction } from "@/app/admin/actions";
import TranslateEnButton from "@/components/admin/TranslateEnButton";
import ImageUploader from "@/components/ImageUploader";

export const metadata = { title: "Admin • Adaugă postare" };

export default function NewNewsPage(){
  return (
    <form action={createPostAction} className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Adaugă postare</h1>
        <p className="muted">Completează câmpurile în română, apoi apasă “Generează EN automat”.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="font-semibold">Română</h2>
          <div><label className="label">Titlu</label><input name="title" className="input" required /></div>
          <div><label className="label">Slug</label><input name="slug" className="input" required /></div>
          <div><label className="label">Rezumat</label><textarea name="excerpt" className="input" rows={3} /></div>
          <div><label className="label">Conținut</label><textarea name="content" className="input" rows={8} /></div>
          <ImageUploader fieldName="image" label="Imagine (opțional)" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">English</h2>
            <TranslateEnButton />
          </div>
          <div><label className="label">Title (EN)</label><input name="titleEn" className="input" /></div>
          <div><label className="label">Excerpt (EN)</label><textarea name="excerptEn" className="input" rows={3} /></div>
          <div><label className="label">Content (EN)</label><textarea name="contentEn" className="input" rows={8} /></div>
        </div>
      </section>

      <button className="btn-primary">Publică postarea</button>
    </form>
  );
}
