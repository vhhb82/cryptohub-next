export const metadata = { title: 'Contact • CryptoHub' }

export default function ContactPage({ searchParams }: { searchParams: { [k: string]: string } }) {
  const sent = searchParams?.sent === '1'
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Contact</h1>
      {sent && (
        <div className="card border-green-300">
          Mulțumim! Mesajul tău a fost trimis. Îți vom răspunde cât mai curând.
        </div>
      )}
      <form action="/api/contact" method="POST" className="space-y-4">
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <div><label className="label">Nume</label><input className="input" name="name" required placeholder="Numele tău" /></div>
        <div><label className="label">Email</label><input className="input" type="email" name="email" required placeholder="adresa@exemplu.com" /></div>
        <div><label className="label">Subiect (opțional)</label><input className="input" name="subject" placeholder="Despre ce este vorba?" /></div>
        <div><label className="label">Mesaj</label><textarea className="input" name="message" required rows={8} placeholder="Scrie mesajul tău..." /></div>
        <button className="btn" type="submit">Trimite</button>
        <p className="text-sm opacity-70">
          Sau scrie direct: <a className="underline" href="mailto:contact@cryptohub.ro">contact@cryptohub.ro</a>
        </p>
      </form>
    </div>
  )
}
