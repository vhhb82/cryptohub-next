export type Product = {
  id: string
  title: string
  features: string[]
  cta?: { label: string; href: string }
}

export const products: Product[] = [
  {
    id: 'tri-arb',
    title: 'Scanner Triunghiular (Tri-Arb)',
    features: [
      'Detecție bucle profitabile pe aceeași bursă',
      'Taker fees & slippage incluse',
      'Alerte Telegram opționale',
    ],
    cta: { label: 'Cere demo', href: 'mailto:contact@cryptohub.ro?subject=Demo%20Tri-Arb' },
  },
  {
    id: 'inter-ex',
    title: 'Scanner Între Burse (Inter-Exchange)',
    features: [
      'Compară bid/ask multi-exchange',
      'Verifică rețele retrageri compatibile',
      'Threshold dinamic + whitelist monede',
    ],
    cta: { label: 'Cere demo', href: 'mailto:contact@cryptohub.ro?subject=Demo%20Inter-Exchange' },
  },
  {
    id: 'botsignal-ui',
    title: 'UI Conector BotSignal ↔ TradingView',
    features: [
      'Webhook / confirmare manuală',
      'Auto/Manual toggle',
      'Integrare Altrady Smart Trading',
    ],
    cta: { label: 'Scrie-mi', href: 'mailto:contact@cryptohub.ro?subject=Conector%20BotSignal' },
  },
]
