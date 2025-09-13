export type Exchange = {
  id: string
  name: string
  url: string
  perks: string[]
}

export const exchanges: Exchange[] = [
  {
    id: 'binance',
    name: 'Binance',
    url: 'https://www.binance.com/activity/referral-entry/CPA?ref=CPA_008BUATWJ6',
    perks: ['Cel mai mare volum', '600+ monede', 'Comisioane ~0.1%', 'Bonus până la 100 USDT'],
  },
  {
    id: 'bybit',
    name: 'Bybit',
    url: 'https://www.bybit.com/invite?ref=ZZWPQQ',
    perks: ['Derivate populare', 'Lichiditate bună', 'Bonusuri periodice'],
  },
  {
    id: 'okx',
    name: 'OKX',
    url: 'https://okx.com/join/65725967',
    perks: ['Spot + Futures', 'Launchpad/Jumpstart', 'Aplicații puternice'],
  },
  {
    id: 'kucoin',
    name: 'KuCoin',
    url: 'https://www.kucoin.com/r/rf/XN9WZ9NQ',
    perks: ['Lista largă de monede', 'Tranzacționare bot', 'Taxe decente'],
  },
  {
    id: 'mexc',
    name: 'MEXC',
    url: 'https://promote.mexc.com/r/G97gjvQX',
    perks: ['Multe listări noi', 'Promoții des', 'Futures competitive'],
  },
  {
    id: 'bitget',
    name: 'Bitget',
    url: 'https://www.bitget.com/ru/referral/register?clacCode=QFKSAFPY',
    perks: ['Copy trading', 'Bonusuri frecvente', 'UI clar'],
  },
  {
    id: 'phemex',
    name: 'Phemex',
    url: 'https://phemex.com/ru/account/referral/invite-friends-entry?referralCode=I3HKW8',
    perks: ['Perpetuals', 'Tool-uri avansate', 'Campanii cu bonus'],
  },
  {
    id: 'bitmart',
    name: 'BitMart',
    url: 'https://www.bitmart.com/invite/cBhfB3/en',
    perks: ['Listări alternative', 'Bonusuri de înregistrare'],
  },
  {
    id: 'lbank',
    name: 'LBank',
    url: 'https://lbank.com/ref/58RDR',
    perks: ['Listări rapide', 'Taxe mici'],
  },
  {
    id: 'pionex',
    name: 'Pionex',
    url: 'https://www.pionex.com/register',
    perks: ['Boti integrați', 'DCA/GRID simple'],
  },
]
