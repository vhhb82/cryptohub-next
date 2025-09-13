export const metadata = {
  title: "Știre demo • CryptoHub",
  description: "Pagină demo de știre cu imagine pentru test.",
};

export default function DemoNewsPage() {
  const date = new Date().toLocaleString("ro-RO");
  return (
    <article className="space-y-5">
      <header className="space-y-3">
        <div className="badge">Știre</div>
        <h1 className="text-3xl font-semibold leading-tight" style={{fontFamily: "var(--font-sora)"}}>
          Știre demo: cum arată un articol cu imagine în CryptoHub
        </h1>
        <p className="muted text-sm">Publicat: {date}</p>
      </header>

      <img
        src="/uploads/demo-news-cover.svg"
        alt="Demo cover"
        className="w-full rounded-xl border"
      />

      <div className="prose prose-slate max-w-none">
        <p>
          Aceasta este o pagină <strong>demo</strong> pentru a testa afișarea unei știri cu imagine.
          Imaginea este un SVG simplu salvat în <code>/public/uploads</code>. Poți înlocui fișierul cu
          o imagine reală încărcată din Admin sau copiată manual.
        </p>
        <p>
          Stilul este <em>Paper Blue</em>: fundal deschis, carduri cu border fin, badge albastru.
          Dacă nu vezi acest stil, verifică importul <code>./globals.css</code> în <code>app/layout.tsx</code>,
          și globs în <code>tailwind.config.*</code>.
        </p>
        <h2>Ce verifici pe această pagină</h2>
        <ul>
          <li>Randarea titlului și a datei.</li>
          <li>Încărcarea imaginii din <code>/uploads</code>.</li>
          <li>Tipografia de bază pentru paragrafe și liste.</li>
        </ul>
        <p className="muted">
          După ce confirmi, poți șterge acest demo sau îl poți folosi ca șablon pentru știri reale.
        </p>
      </div>
    </article>
  );
}
