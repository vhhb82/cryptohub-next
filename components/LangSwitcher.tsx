'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function mapPath(pathname: string, toEn: boolean) {
  const maps: Array<[RegExp, (...args: string[]) => string]> = [
    [/^\/stiri(\/.*)?$/, (a) => `/en/news${a || ''}`],
    [/^\/blog(\/.*)?$/,  (a) => `/en/blog${a || ''}`],
    [/^\/despre(\/.*)?$/, (a) => `/en/about${a || ''}`],
    [/^\/contact(\/.*)?$/, (a) => `/en/contact${a || ''}`],
    [/^\/video(\/.*)?$/, (a) => `/en/video${a || ''}`],
    [/^\/produse(\/.*)?$/, (a) => `/en/products${a || ''}`],
    [/^\/burse(\/.*)?$/, (a) => `/en/exchanges${a || ''}`],
    [/^\/(en)(\/news)(\/.*)?$/, (_a, _b, c) => `/stiri${c || ''}`],
    [/^\/(en)(\/blog)(\/.*)?$/, (_a, _b, c) => `/blog${c || ''}`],
    [/^\/(en)(\/about)(\/.*)?$/, (_a, _b, c) => `/despre${c || ''}`],
    [/^\/(en)(\/contact)(\/.*)?$/, (_a, _b, c) => `/contact${c || ''}`],
    [/^\/(en)(\/video)(\/.*)?$/, (_a, _b, c) => `/video${c || ''}`],
    [/^\/(en)(\/products)(\/.*)?$/, (_a, _b, c) => `/produse${c || ''}`],
    [/^\/(en)(\/exchanges)(\/.*)?$/, (_a, _b, c) => `/burse${c || ''}`],
  ]
  for (const [re, fn] of maps) {
    const m = pathname.match(re)
    if (m) return fn(...m.slice(1))
  }
  // generic prefix/slice
  return toEn ? `/en${pathname === '/' ? '' : pathname}` : pathname.replace(/^\/en/, '') || '/'
}

export default function LangSwitcher() {
  const pathname = usePathname() || '/'
  const isEn = pathname.startsWith('/en')

  const toEN = mapPath(pathname, true)
  const toRO = mapPath(pathname, false)

  const base = 'px-3 py-1 rounded-xl border text-sm'
  const active = base + ' bg-black text-white border-black'
  const inactive = base + ' hover:bg-black/5'

  return (
    <div className="flex items-center gap-2">
      {isEn ? (
        <>
          <Link href={toRO} className={inactive}>RO</Link>
          <span className={active} aria-current="page">EN</span>
        </>
      ) : (
        <>
          <span className={active} aria-current="page">RO</span>
          <Link href={toEN} className={inactive}>EN</Link>
        </>
      )}
    </div>
  )
}
