import ImageUpload from "@/components/admin/ImageUpload";
export const metadata = { title: 'Adaugă Video • Admin' }

export default function NewVideo() {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">Adaugă Video</h1>
      <form action="/api/videos" method="POST" className="space-y-4">
        <div>
          <label className="label">Platformă</label>
          <select name="platform" className="input" required defaultValue="youtube">
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>
        <div>
          <label className="label">ID Video</label>
          <input className="input" name="videoId" required placeholder="ex: dQw4w9WgXcQ (YouTube) sau 7362268380... (TikTok)" />
        </div>
        <div>
          <label className="label">Titlu</label>
          <input className="input" name="title" required placeholder="Titlul clipului" />
        </div>
        <div>
          <label className="label">URL original (opțional)</label>
          <input className="input" name="url" placeholder="Linkul complet către video" />
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="published" defaultChecked />
          <span>Publică imediat</span>
        </label>
        <button className="btn" type="submit">Salvează</button>
      </form>
      <p className="text-sm opacity-70">
        <strong>YouTube:</strong> ID-ul este ce vine după <code>v=</code> sau în URL-ul scurt (ex: <code>dQw4w9WgXcQ</code>).<br/>
        <strong>TikTok:</strong> ID-ul este numărul din link (ex: <code>.../video/7362268380107646213</code>).
      </p>
    </div>
  )
}
