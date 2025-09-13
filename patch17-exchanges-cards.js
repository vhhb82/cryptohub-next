// patch17-exchanges-cards.js — Burse ca grid de carduri (Paper Blue)
const fs = require("fs");
const path = require("path");
const w = (p,c)=>{ const d=path.dirname(p); if(!fs.existsSync(d)) fs.mkdirSync(d,{recursive:true}); fs.writeFileSync(p,c,"utf8"); console.log("✔ wrote",p); };

// 1) Card component
w("components/ExchangeCard.tsx", `type Props = {
  name: string;
  bullets: string[];
  href: string;
  hint?: string;
  brand?: "binance" | "bybit" | "okx";
};
export default function ExchangeCard({ name, bullets, href, hint, brand }: Props) {
  const chip = (brand === "binance" ? "bg-yellow-400"
              : brand === "bybit" ? "bg-amber-500"
              : brand === "okx" ? "bg-neutral-900"
              : "bg-slate-200");
  const letter = (brand === "okx" ? "OKX" : name[0]);
  return (
    <article className="card hover:shadow-sm p-5">
      <div className="flex items-center gap-3">
        <div className={\`h-10 w-10 rounded-lg \${chip} text-white grid place-items-center font-semibold\`}>
          {letter}
        </div>
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

// 2) RO: /burse — grilă 3 carduri
w("app/burse/page.tsx", `import ExchangeCard from "@/components/ExchangeCard";

export const metadata = { title: "Burse • CryptoHub" };

const BINANCE = process.env.BINANCE_AFFILIATE_URL || "https://www.binance.com/";
const BYBIT   = process.env.BYBIT_AFFILIATE_URL   || "https://www.bybit.com/";
const OKX     = process.env.OKX_AFFILIATE_URL     || "https://www.okx.com/";

export default function BursePage(){
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Burse</h1>
        <p className="muted mt-1">Platforme de schimb pe care le folosim și le recomandăm.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <ExchangeCard
          name="Binance"
          brand="binance"
          bullets={[
            "Taxe competitive, lichiditate mare",
            "Spot + Derivate + P2P",
            "Card & Earn opționale"
          ]}
          href={BINANCE}
          hint="Bonusurile depind de promoțiile curente Binance."
        />
        <ExchangeCard
          name="Bybit"
          brand="bybit"
          bullets={[
            "Derivate & lichiditate bună",
            "Copy trading și grid bots",
            "KYC rapid"
          ]}
          href={BYBIT}
        />
        <ExchangeCard
          name="OKX"
          brand="okx"
          bullets={[
            "Spot + Futures, adesea bune listări",
            "Opțiuni, Earn, Web3 wallet",
            "Retrageri pe mai multe rețele"
          ]}
          href={OKX}
        />
      </section>

      <p className="muted text-xs">
        * Tradingul implică risc. Fă-ți propriul research (DYOR).
      </p>
    </div>
  );
}
`);

// 3) EN: /en/exchanges (opțional pentru i18n)
w("app/en/exchanges/page.tsx", `import ExchangeCard from "@/components/ExchangeCard";

export const metadata = { title: "Exchanges • CryptoHub" };

const BINANCE = process.env.BINANCE_AFFILIATE_URL || "https://www.binance.com/";
const BYBIT   = process.env.BYBIT_AFFILIATE_URL   || "https://www.bybit.com/";
const OKX     = process.env.OKX_AFFILIATE_URL     || "https://www.okx.com/";

export default function ExchangesEnPage(){
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Exchanges</h1>
        <p className="muted mt-1">Platforms we use and recommend.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <ExchangeCard
          name="Binance"
          brand="binance"
          bullets={["Low fees, high liquidity","Spot + Derivatives + P2P","Card & Earn available"]}
          href={BINANCE}
          hint="Bonuses depend on Binance current promos."
        />
        <ExchangeCard
          name="Bybit"
          brand="bybit"
          bullets={["Derivatives & good liquidity","Copy trading & grid bots","Fast KYC"]}
          href={BYBIT}
        />
        <ExchangeCard
          name="OKX"
          brand="okx"
          bullets={["Spot + Futures, frequent listings","Options, Earn, Web3 wallet","Multi-network withdrawals"]}
          href={OKX}
        />
      </section>

      <p className="muted text-xs">* Trading involves risk. DYOR.</p>
    </div>
  );
}
`);

console.log("\\nPatch17 applied. Set BINANCE_AFFILIATE_URL, BYBIT_AFFILIATE_URL, OKX_AFFILIATE_URL in .env.local if needed.");
