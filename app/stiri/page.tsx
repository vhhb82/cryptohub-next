import NewsList from "@/components/NewsList"
export const metadata = { title: "Știri • CryptoHub" }
export default async function StiriPage(){
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Știri</h1>
          <p className="muted mt-1">Toate știrile publicate.</p>
        </div>
      </div>
      <NewsList lang="ro" />
    </div>
  )
}
