import NewsList from "@/components/NewsList"
export const metadata = { title: "News • CryptoHub" }
export default async function NewsEnPage(){
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>News</h1>
        <p className="muted mt-1">Latest updates curated by you.</p>
      </div>
      <NewsList lang="en" />
    </div>
  )
}
