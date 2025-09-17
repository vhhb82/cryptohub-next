import Link from "next/link"
import SanityImage from "./SanityImage"

export default function NewsCard({
  href,
  title,
  excerpt,
  image,
  date,
}: {
  href: string
  title: string
  excerpt?: string | null
  image?: any
  date: string | Date
}) {
  const d = typeof date === "string" ? new Date(date) : date
  return (
    <article className="card hover:shadow-sm transition">
      {image && (
        <SanityImage 
          image={image} 
          alt={title} 
          width={400}
          height={176}
          className="mb-3 w-full h-44 object-cover rounded-xl" 
        />
      )}
      <h3 className="text-lg font-semibold leading-snug">
        <Link href={href} className="hover:underline">{title}</Link>
      </h3>
      {excerpt && <p className="mt-2 text-sm muted">{excerpt}</p>}
      <p className="mt-3 text-xs muted">{d.toLocaleString("ro-RO")}</p>
    </article>
  )
}