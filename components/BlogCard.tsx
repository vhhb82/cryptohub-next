import Link from "next/link"
export default function BlogCard({ href, title, excerpt, image, date }:{ href:string; title:string; excerpt?:string|null; image?:string|null; date:string|Date }){
  const d = typeof date === "string" ? new Date(date) : date
  return (
    <article className="card hover:shadow-sm transition">
      {image && <img src={image} alt={title} className="mb-3 w-full h-48 object-cover rounded-xl" />}
      <h3 className="text-lg font-semibold leading-snug"><Link href={href} className="hover:underline">{title}</Link></h3>
      {excerpt && <p className="mt-2 text-sm muted">{excerpt}</p>}
      <p className="mt-3 text-xs muted">{d.toLocaleString("ro-RO")}</p>
    </article>
  )
}
