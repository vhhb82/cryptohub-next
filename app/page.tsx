import NewsList from "@/components/NewsList"

export const metadata = { title: "CryptoHub • Știri" }

export default async function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" style={{fontFamily: "var(--font-sora)"}}>Știri</h1>
        <p className="muted mt-1">Cele mai noi actualizări din crypto, selectate de tine.</p>
      </div>
      <NewsList lang="ro" />
    </div>
  )
}