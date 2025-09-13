import BlogList from "@/components/BlogList"
export const metadata = { title: "Blog • CryptoHub" }
export default async function BlogPage() {
  return (<div className="space-y-6">
    <div><h1 className="text-3xl font-semibold" style={{fontFamily: "var(--font-sora)"}}>Blog</h1>
    <p className="muted mt-1">Articole, opinii și ghiduri din crypto.</p></div>
    <BlogList lang="ro" />
  </div>)
}