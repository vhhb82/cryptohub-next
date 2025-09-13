import BlogList from "@/components/BlogList"
export const metadata = { title: "Blog • CryptoHub" }
export default async function BlogEnPage() {
  return (<div className="space-y-6">
    <div><h1 className="text-3xl font-semibold" style={{fontFamily: "var(--font-sora)"}}>Blog</h1>
    <p className="muted mt-1">Articles, opinions and guides.</p></div>
    <BlogList lang="en" />
  </div>)
}