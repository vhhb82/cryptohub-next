
import ExchangeCard from "@/components/ExchangeCard";

export const metadata = { title: "Burse • CryptoHub" };

const BINANCE = "https://www.binance.com/activity/referral-entry/CPA?ref=CPA_008BUATWJ6";
const BYBIT   = "https://www.bybit.com/invite?ref=ZZWPQQ";
const OKX     = "https://okx.com/join/65725967";
const KUCOIN  = "https://www.kucoin.com/r/rf/XN9WZ9NQ";
const BITMART = "https://www.bitmart.com/invite/cBhfB3/en";
const GATEIO  = "https://www.gate.com/signup/VGRMULPAVA?ref_type=103&utm_cmp=PEYEQdSb";
const MEXC    = "https://promote.mexc.com/r/G97gjvQX";
const BITGET  = "https://www.bitget.com/ru/referral/register?clacCode=QFKSAFPY&from=%2Fru%2Fevents%2Freferral-all-program&source=events&utmSource=PremierInviter";
const HTX     = "https://www.htx.com/invite/ru-ru/1f?invite_code=ib3pc223";
const LBANK   = "https://lbank.com/ref/58RDR";
const PHEMEX  = "https://phemex.com/ru/account/referral/invite-friends-entry?referralCode=I3HKW8";

export default function BursePage(){
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Burse</h1>
        <p className="muted mt-1">Platforme de schimb pe care le folosim și le recomandăm.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <ExchangeCard name="Binance" logo="/brand/binance.svg" href={BINANCE}
          bullets={["Taxe competitive, lichiditate mare","Spot + Derivate + P2P","Card & Earn opționale"]}
          hint="Bonusurile depind de promoțiile curente Binance." />
        <ExchangeCard name="Bybit" logo="/brand/bybit.svg" href={BYBIT}
          bullets={["Derivate & lichiditate bună","Copy trading și grid bots","KYC rapid"]} />
        <ExchangeCard name="OKX" logo="/brand/okx.svg" href={OKX}
          bullets={["Spot + Futures, listări bune","Opțiuni, Earn, Web3 wallet","Retrageri multi-rețea"]} />
        <ExchangeCard name="KuCoin" logo="/brand/kucoin.svg" href={KUCOIN}
          bullets={["Spot + Futures + Earn","Bots integrați","Listări altcoin rapide"]} />
        <ExchangeCard name="Bitget" logo="/brand/bitget.svg" href={BITGET}
          bullets={["Copy trading popular","Futures & spot","Campanii frecvente"]} />
        <ExchangeCard name="MEXC" logo="/brand/mexc.svg" href={MEXC}
          bullets={["Multe listări altcoin","Taxe mici","Launchpad"]} />
        <ExchangeCard name="Gate.io" logo="/brand/gateio.svg" href={GATEIO}
          bullets={["Mii de perechi","Startup/IEO","Funcții pro"]}
        />
        <ExchangeCard name="BitMart" logo="/brand/bitmart.svg" href={BITMART}
          bullets={["Listări variate","Earn & staking","UI simplă"]} />
        <ExchangeCard name="HTX" logo="/brand/htx.svg" href={HTX}
          bullets={["Global exchange","Margin & futures","Liquid staking"]} />
        <ExchangeCard name="LBank" logo="/brand/lbank.svg" href={LBANK}
          bullets={["Listări altcoin","Spot + futures","Promoții dese"]} />
        <ExchangeCard name="Phemex" logo="/brand/phemex.svg" href={PHEMEX}
          bullets={["Derivate & spot","Fees ok","App mobil solid"]} />
      </section>

      <p className="muted text-xs">* Tranzacționarea implică risc. Fă-ți propriul research (DYOR).</p>
    </div>
  );
}
