// patch18-exchanges-all.js — Re-add ALL exchanges + SVG logos (Paper Blue)
// Run: node patch18-exchanges-all.js
const fs = require("fs");
const path = require("path");
const w = (p,c)=>{ const d=path.dirname(p); if(!fs.existsSync(d)) fs.mkdirSync(d,{recursive:true}); fs.writeFileSync(p,c,"utf8"); console.log("✔ wrote",p); };

// ---------- 1) ExchangeCard component (cu logo SVG) ----------
w("components/ExchangeCard.tsx", `
type Props = {
  name: string;
  bullets: string[];
  href: string;
  logo: string;        // /brand/*.svg
  hint?: string;
};
export default function ExchangeCard({ name, bullets, href, logo, hint }: Props) {
  return (
    <article className="card hover:shadow-sm p-5 h-full">
      <div className="flex items-center gap-3">
        <img src={logo} alt={name} className="h-10 w-10 rounded-lg" />
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      {hint && <p className="muted mt-2 text-xs">{hint}</p>}
      <a href={href} target="_blank" rel="noopener" className="btn-primary mt-4 inline-flex">
        Deschide cont
      </a>
    </article>
  );
}
`);

// ---------- 2) Logo-uri SVG minimaliste (culori apropiate de brand) ----------
const logos = {
  binance:  { color:"#F3BA2F", text:"B" },
  bybit:    { color:"#F0B90B", text:"β" },
  okx:      { color:"#000000", text:"OKX", textColor:"#fff" },
  kucoin:   { color:"#31C77F", text:"K" },
  bitmart:  { color:"#00D0B5", text:"BM" },
  gateio:   { color:"#E74141", text:"G" },
  mexc:     { color:"#24D18C", text:"M" },
  bitget:   { color:"#2AB8A6", text:"BG" },
  htx:      { color:"#0E74FF", text:"H" },
  lbank:    { color:"#C7A14B", text:"LB" },
  phemex:   { color:"#2C7CF6", text:"PX" },
};
for (const [name, spec] of Object.entries(logos)) {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <rect rx="10" width="40" height="40" fill="${spec.color}"/>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle"
        font-family="Inter, Arial, sans-serif" font-size="${spec.text.length>2?14:18}"
        font-weight="700" fill="${spec.textColor || "#001014"}">${spec.text}</text>
</svg>`.trim();
  w(`public/brand/${name}.svg`, svg);
}

// ---------- 3) RO: /burse — TOATE bursele (linkuri din .env sau fallback-urile tale) ----------
const FALLBACK = {
  BINANCE_AFFILIATE_URL: "https://www.binance.com/activity/referral-entry/CPA?ref=CPA_008BUATWJ6",
  BYBIT_AFFILIATE_URL:   "https://www.bybit.com/invite?ref=ZZWPQQ",
  OKX_AFFILIATE_URL:     "https://okx.com/join/65725967",
  KUCOIN_AFFILIATE_URL:  "https://www.kucoin.com/r/rf/XN9WZ9NQ",
  BITMART_AFFILIATE_URL: "https://www.bitmart.com/invite/cBhfB3/en",
  GATEIO_AFFILIATE_URL:  "https://www.gate.com/signup/VGRMULPAVA?ref_type=103&utm_cmp=PEYEQdSb",
  MEXC_AFFILIATE_URL:    "https://promote.mexc.com/r/G97gjvQX",
  // (în fișier aveai "https:https://..." — corectăm automat)
  BITGET_AFFILIATE_URL:  "https://www.bitget.com/ru/referral/register?clacCode=QFKSAFPY&from=%2Fru%2Fevents%2Freferral-all-program&source=events&utmSource=PremierInviter",
  HTX_AFFILIATE_URL:     "https://www.htx.com/invite/ru-ru/1f?invite_code=ib3pc223",
  LBANK_AFFILIATE_URL:   "https://lbank.com/ref/58RDR",
  PHEMEX_AFFILIATE_URL:  "https://phemex.com/ru/account/referral/invite-friends-entry?referralCode=I3HKW8",
};

function envOr(k){ return process.env[k] || FALLBACK[k]; }

w("app/burse/page.tsx", `
import ExchangeCard from "@/components/ExchangeCard";

export const metadata = { title: "Burse • CryptoHub" };

const BINANCE = "${envOr("BINANCE_AFFILIATE_URL")}";
const BYBIT   = "${envOr("BYBIT_AFFILIATE_URL")}";
const OKX     = "${envOr("OKX_AFFILIATE_URL")}";
const KUCOIN  = "${envOr("KUCOIN_AFFILIATE_URL")}";
const BITMART = "${envOr("BITMART_AFFILIATE_URL")}";
const GATEIO  = "${envOr("GATEIO_AFFILIATE_URL")}";
const MEXC    = "${envOr("MEXC_AFFILIATE_URL")}";
const BITGET  = "${envOr("BITGET_AFFILIATE_URL")}";
const HTX     = "${envOr("HTX_AFFILIATE_URL")}";
const LBANK   = "${envOr("LBANK_AFFILIATE_URL")}";
const PHEMEX  = "${envOr("PHEMEX_AFFILIATE_URL")}";

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
`);

// ---------- 4) EN: /en/exchanges ----------
w("app/en/exchanges/page.tsx", `
import ExchangeCard from "@/components/ExchangeCard";
export const metadata = { title: "Exchanges • CryptoHub" };

const BINANCE = "${envOr("BINANCE_AFFILIATE_URL")}";
const BYBIT   = "${envOr("BYBIT_AFFILIATE_URL")}";
const OKX     = "${envOr("OKX_AFFILIATE_URL")}";
const KUCOIN  = "${envOr("KUCOIN_AFFILIATE_URL")}";
const BITMART = "${envOr("BITMART_AFFILIATE_URL")}";
const GATEIO  = "${envOr("GATEIO_AFFILIATE_URL")}";
const MEXC    = "${envOr("MEXC_AFFILIATE_URL")}";
const BITGET  = "${envOr("BITGET_AFFILIATE_URL")}";
const HTX     = "${envOr("HTX_AFFILIATE_URL")}";
const LBANK   = "${envOr("LBANK_AFFILIATE_URL")}";
const PHEMEX  = "${envOr("PHEMEX_AFFILIATE_URL")}";

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
`);

console.log("\\nPatch18 applied. Tip: poți seta/edita linkurile în .env.local (BINANCE_*, BYBIT_*, OKX_*, KUCOIN_*, BITMART_*, GATEIO_*, MEXC_*, BITGET_*, HTX_*, LBANK_*, PHEMEX_*).");
