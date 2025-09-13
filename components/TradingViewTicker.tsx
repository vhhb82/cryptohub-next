'use client'
import { useEffect, useRef } from 'react'

type Symbol = { proName: string; title?: string }

export default function TradingViewTicker({
  symbols = [
    { proName: 'BINANCE:BTCUSDT', title: 'BTC/USDT' },
    { proName: 'BINANCE:ETHUSDT', title: 'ETH/USDT' },
    { proName: 'BINANCE:BNBUSDT', title: 'BNB/USDT' },
    { proName: 'BINANCE:XRPUSDT', title: 'XRP/USDT' },
    { proName: 'BINANCE:SOLUSDT', title: 'SOL/USDT' },
    { proName: 'BINANCE:ADAUSDT', title: 'ADA/USDT' },
    { proName: 'BINANCE:DOGEUSDT', title: 'DOGE/USDT' },
    { proName: 'BINANCE:TRXUSDT', title: 'TRX/USDT' },
    { proName: 'BINANCE:MATICUSDT', title: 'MATIC/USDT' },
    { proName: 'BINANCE:DOTUSDT', title: 'DOT/USDT' },
  ],
  theme = 'light',
  transparent = false,
}: {
  symbols?: Symbol[]
  theme?: 'light' | 'dark'
  transparent?: boolean
}) {
  const container = useRef<HTMLDivElement>(null)
  const affiliate = (process.env.NEXT_PUBLIC_TRADINGVIEW_AFFILIATE_URL as string) || 'https://www.tradingview.com'

  useEffect(() => {
    if (!container.current) return

    // Clear and (re)mount the widget
    container.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.async = true
    script.type = 'text/javascript'

    const config = {
      symbols,
      showSymbolLogo: true,
      colorTheme: theme,
      isTransparent: transparent,
      displayMode: 'adaptive',
      locale: 'ro'
    }

    script.innerHTML = JSON.stringify(config)
    container.current.appendChild(script)

    return () => {
      if (container.current) container.current.innerHTML = ''
    }
  }, [symbols, theme, transparent])

  return (
    <div className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container py-1">
        <div className="tradingview-widget-container" ref={container}>
          <div className="tradingview-widget-container__widget" />
          <div className="tradingview-widget-copyright text-xs opacity-60">
            <a href={affiliate} rel="noopener nofollow" target="_blank">Ticker Tape</a> de la TradingView
          </div>
        </div>
      </div>
    </div>
  )
}
