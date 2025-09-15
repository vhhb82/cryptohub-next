import "./globals.css"
import Link from "next/link"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import TradingViewTicker from "@/components/TradingViewTicker"
import LangSwitcher from "@/components/LangSwitcher"
import HeaderNav from "@/components/HeaderNav"

// Force rebuild to clear /api/upload cache

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })

export const metadata: Metadata = {
  title: "CryptoHub • Știri & Blog",
  description: "Homepage pe Știri + Blog + Admin simplu",
}

function TradingViewMark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M3 3h2v18H3V3zm8 6h2v12h-2V9zm8-4h2v16h-2V5z" />
    </svg>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const affiliate = process.env.TRADINGVIEW_AFFILIATE_URL || "https://www.tradingview.com"
  return (
    <html lang="ro" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans">
        <header>
          <div className="container py-4 flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/brand/cryptohub-logo.svg" 
                alt="CryptoHub" 
                className="logo h-8 w-8"
              />
              <span className="text-2xl font-semibold" style={{fontFamily: "var(--font-sora)"}}>
                CryptoHub
              </span>
            </Link>
            <HeaderNav />
            <span className="ml-auto"><LangSwitcher /></span>
          </div>
        </header>

        <div className="tradingview-ticker">
          <TradingViewTicker />
        </div>

        <main className="container py-8">{children}</main>
        <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-10">
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img 
                src="/brand/cryptohub-logo.svg" 
                alt="CryptoHub" 
                className="logo h-6 w-6"
              />
              <span>© {new Date().getFullYear()} CryptoHub</span>
            </div>
            <a href={affiliate} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-blue-100 transition-colors">
              <TradingViewMark />
              <span>Powered by TradingView</span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}