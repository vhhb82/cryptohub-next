import "./globals.css"
import Link from "next/link"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import TradingViewTicker from "@/components/TradingViewTicker"
import LangSwitcher from "@/components/LangSwitcher"
import HeaderNav from "@/components/HeaderNav"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })

export const metadata: Metadata = {
  title: "CryptoHub — Stiri si Blog",
  description: "Homepage pe Știri + Blog + Admin simplu",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
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
        <div className="min-h-screen flex">
          {/* Left blue sidebar */}
          <div className="w-16 bg-gradient-to-br from-blue-500 to-blue-900 hidden lg:block"></div>
          
          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            <header className="border-b bg-white">
              <div className="container py-4 flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src="/brand/cryptohub-mark.svg"
                    alt="CryptoHub Logo"
                    width={32}
                    height={32}
                    priority
                  />
                  <span className="text-2xl font-semibold" style={{fontFamily: "var(--font-sora)"}}>
                    CryptoHub
                  </span>
                </Link>
                <HeaderNav />
                <span className="ml-auto"><LangSwitcher /></span>
              </div>
            </header>
            <div className="tradingview-ticker"><TradingViewTicker /></div>
            <main className="container py-8 flex-1">{children}</main>
            <footer className="container py-10 text-sm opacity-70 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>© {new Date().getFullYear()} CryptoHub</div>
              <a href={affiliate} target="_blank" rel="noopener" className="inline-flex items-center gap-2"><TradingViewMark /><span>Powered by TradingView</span></a>
            </footer>
          </div>
          
          {/* Right blue sidebar */}
          <div className="w-16 bg-gradient-to-br from-blue-500 to-blue-900 hidden lg:block"></div>
        </div>
      </body>
    </html>
  )
}
