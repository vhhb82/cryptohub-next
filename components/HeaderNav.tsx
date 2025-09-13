'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ro from '@/i18n/ro'
import en from '@/i18n/en'

export default function HeaderNav() {
  const pathname = usePathname() || '/'
  const isEn = pathname.startsWith('/en')
  const t = isEn ? en : ro

  // map links based on locale
  const links = isEn
    ? [
        { href: '/en/news', label: t.news },
        { href: '/en/blog', label: t.blog },
        { href: '/en/exchanges', label: t.exchanges },
        { href: '/en/products', label: t.products },
        { href: '/en/video', label: t.video },
        { href: '/en/about', label: t.about },
        { href: '/en/contact', label: t.contact },
      ]
    : [
        { href: '/stiri', label: t.news },
        { href: '/blog', label: t.blog },
        { href: '/burse', label: t.exchanges },
        { href: '/produse', label: t.products },
        { href: '/video', label: t.video },
        { href: '/despre', label: t.about },
        { href: '/contact', label: t.contact },
      ]

  return (
    <nav className="flex flex-wrap gap-4 items-center">
      {links.map(l => (
        <Link key={l.href} href={l.href} className="hover:underline">{l.label}</Link>
      ))}
    </nav>
  )
}
