export const metadata = { title: 'Despre • CryptoHub' }

export default function DesprePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Despre CryptoHub</h1>
      <p className="opacity-80">
        CryptoHub este un proiect de educație și tool-uri pentru trading: știri curate, analize,
        plus produse proprii (scanere, conectori) gândite pentru eficiență.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold mb-2">Ce oferim</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Știri selectate & blog educațional</li>
            <li>Scaner Triunghiular & Inter-Exchange</li>
            <li>Conector TradingView → Altrady/Smart Trading</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">De ce noi</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Experiență practică în automatizare</li>
            <li>Transparență: explicăm logica și limitele</li>
            <li>Fără hype: accent pe risc & execuție</li>
          </ul>
        </div>
      </div>
      <p className="opacity-80">
        Întrebări sau propuneri? Mergi la <a className="underline" href="/contact">Contact</a>.
      </p>
    </div>
  )
}
