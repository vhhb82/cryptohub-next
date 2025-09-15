import AutoTranslateEn from '@/components/AutoTranslateEn'
import ImageUploader from "@/components/ImageUploader";

export default function NewNews() {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">Adaugă Știre</h1>
      <form action="/api/news" method="POST" className="space-y-6">
        <section className="space-y-4 card">
          <h2 className="text-lg font-semibold">Română</h2>
          <div><label className="label">Titlu</label><input className="input" name="title" required placeholder="Titlul știrii" /></div>
          <div><label className="label">Rezumat (opțional)</label><input className="input" name="excerpt" placeholder="1-2 fraze..." /></div>
          <div><label className="label">URL imagine (opțional)</label><ImageUploader fieldName="image" label="Imagine (opțional)" /></div>
          <div><label className="label">Conținut</label><textarea className="input" name="content" required rows={10} placeholder="Textul complet..." /></div>
        </section>

        <section className="space-y-4 card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">English</h2>
            <AutoTranslateEn />
          </div>
          <div><label className="label">Title (EN)</label><input className="input" name="titleEn" placeholder="Title in English" /></div>
          <div><label className="label">Excerpt (EN)</label><input className="input" name="excerptEn" placeholder="1-2 sentences..." /></div>
          <div><label className="label">Content (EN)</label><textarea className="input" name="contentEn" rows={10} placeholder="Full text in English" /></div>
        </section>

        <label className="flex items-center gap-2"><input type="checkbox" name="published" defaultChecked /><span>Publică imediat</span></label>
        <button className="btn" type="submit">Salvează</button>
      </form>
    </div>
  )
}
