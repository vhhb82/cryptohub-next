import { createVideoAction } from "@/app/admin/actions";

export const metadata = { title: "Admin • Adaugă video" };

export default function NewVideoPage(){
  return (
    <form action={createVideoAction} className="space-y-6">
      <h1 className="text-2xl font-semibold">Adaugă video</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div><label className="label">Titlu</label><input name="title" className="input" required /></div>
          <div><label className="label">Sursă</label>
            <select name="source" className="input">
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>
          <div><label className="label">URL Video</label><input name="url" className="input" placeholder="https://www.youtube.com/watch?v=..." required /></div>
        </div>
        <div className="space-y-3">
          <div><label className="label">Title (EN) — opțional</label><input name="titleEn" className="input" /></div>
        </div>
      </div>
      <button className="btn-primary">Publică video</button>
    </form>
  );
}
