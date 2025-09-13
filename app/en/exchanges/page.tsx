
import ExchangeCard from "@/components/ExchangeCard";
export const metadata = { title: "Exchanges • CryptoHub" };

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

export default function ExchangesEnPage(){
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Exchanges</h1>
        <p className="muted mt-1">Platforms we use and recommend.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <ExchangeCard name="Binance" logo="/brand/binance.svg" href={BINANCE}
          bullets={["Low fees, high liquidity","Spot + Derivatives + P2P","Card & Earn available"]} />
        <ExchangeCard name="Bybit" logo="/brand/bybit.svg" href={BYBIT}
          bullets={["Derivatives & solid liquidity","Copy trading & grid bots","Fast KYC"]} />
        <ExchangeCard name="OKX" logo="/brand/okx.svg" href={OKX}
          bullets={["Spot + Futures, frequent listings","Options, Earn, Web3 wallet","Multi-network withdrawals"]} />
        <ExchangeCard name="KuCoin" logo="/brand/kucoin.svg" href={KUCOIN}
          bullets={["Spot + Futures + Earn","Built-in bots","Fast altcoin listings"]} />
        <ExchangeCard name="Bitget" logo="/brand/bitget.svg" href={BITGET}
          bullets={["Popular copy trading","Futures & spot","Frequent promos"]} />
        <ExchangeCard name="MEXC" logo="/brand/mexc.svg" href={MEXC}
          bullets={["Lots of altcoin listings","Low fees","Launchpad"]} />
        <ExchangeCard name="Gate.io" logo="/brand/gateio.svg" href={GATEIO}
          bullets={["Many pairs","Startup/IEO","Pro features"]} />
        <ExchangeCard name="BitMart" logo="/brand/bitmart.svg" href={BITMART}
          bullets={["Varied listings","Earn & staking","Simple UI"]} />
        <ExchangeCard name="HTX" logo="/brand/htx.svg" href={HTX}
          bullets={["Global exchange","Margin & futures","Liquid staking"]} />
        <ExchangeCard name="LBank" logo="/brand/lbank.svg" href={LBANK}
          bullets={["Altcoin listings","Spot + futures","Regular promos"]} />
        <ExchangeCard name="Phemex" logo="/brand/phemex.svg" href={PHEMEX}
          bullets={["Derivatives & spot","Good fees","Solid mobile app"]} />
      </section>

      <p className="muted text-xs">* Trading involves risk. DYOR.</p>
    </div>
  );
}
