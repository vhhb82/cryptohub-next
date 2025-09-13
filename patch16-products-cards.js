// patch16-products-cards.js — Products as soft cards + Recommended tools
// Run: node patch16-products-cards.js
const fs = require("fs");
const path = require("path");
const w = (p,c)=>{const d=path.dirname(p); if(!fs.existsSync(d)) fs.mkdirSync(d,{recursive:true}); fs.writeFileSync(p,c,"utf8"); console.log("✔ wrote",p);};

// 1) ProductCard component (reusable)
w("components/ProductCard.tsx", `type Props = {
  title: string;
  bullets: string[];
  cta: { label: string; href: string; external?: boolean };
  badge?: string;
};
export default function ProductCard({ title, bullets, cta, badge }: Props) {
  return (
    <article className="card-soft card-hover p-5">
      {badge && <div className="badge mb-2">{badge}</div>}
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <a
        href={cta.href}
        target={cta.external ? "_blank" : undefined}
        rel={cta.external ? "noopener" : undefined}
        className="btn mt-4 inline-flex"
      >
        {cta.label}
      </a>
    </article>
  );
}
`);

// 2) RO: /produse
w("app/produse/page.tsx", `import ProductCard from "@/components/ProductCard";

export const metadata = { title: "Produse • CryptoHub" };

const TV = process.env.TRADINGVIEW_AFFILIATE_URL || "https://www.tradingview.com";
const AL = process.env.ALTRADY_AFFILIATE_URL || "https://app.altrady.com";

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Produse</h1>
        <p className="muted mt-1">Tool-urile noastre pentru trading și automatizare.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <ProductCard
          title="Scanner Triunghiular (Tri-Arb)"
          bullets={[
            "Detecție bucle profitabile pe aceeași bursă",
            "Taker fees & slippage incluse",
            "Alerte Telegram opționale",
          ]}
          cta={{ label: "Cere demo", href: "/contact" }}
          badge="Proiect propriu"
        />
        <ProductCard
          title="Scanner între Burse (Inter-Exchange)"
          bullets={[
            "Compară bid/ask multi-exchange",
            "Verifică rețele retrageri compatibile",
            "Threshold dinamic + whitelist monede",
          ]}
          cta={{ label: "Cere demo", href: "/contact" }}
          badge="Proiect propriu"
        />
        <ProductCard
          title="UI Conector BotSignal → TradingView"
          bullets={[
            "Webhook / confirmare manuală",
            "Auto/Manual toggle",
            "Integrare Altrady Smart Trading",
          ]}
          cta={{ label: "Scrie-mi", href: "/contact" }}
          badge="Integrare"
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Tool-uri recomandate</h2>
        <p className="muted">Instrumente pe care le folosim și le recomandăm.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <ProductCard
            title="TradingView (abonamente/afi­liat)"
            bullets={[
              "Charting avansat",
              "Alerts & watchlists",
              "Marketplace indicatori",
            ]}
            cta={{ label: "Încearcă TradingView", href: TV, external: true }}
            badge="Recomandat"
          />
          <ProductCard
            title="Altrady (Smart Trading)"
            bullets={[
              "Smart Trading",
              "Bot Signal",
              "Portofolii multi-exchange",
            ]}
            cta={{ label: "Încearcă Altrady", href: AL, external: true }}
            badge="Recomandat"
          />
        </div>
      </section>
    </div>
  );
}
`);

// 3) EN: /en/products (optional, pentru i18n)
w("app/en/products/page.tsx", `import ProductCard from "@/components/ProductCard";

export const metadata = { title: "Products • CryptoHub" };

const TV = process.env.TRADINGVIEW_AFFILIATE_URL || "https://www.tradingview.com";
const AL = process.env.ALTRADY_AFFILIATE_URL || "https://app.altrady.com";

export default function ProductsEnPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Products</h1>
        <p className="muted mt-1">Our own tools for trading and automation.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <ProductCard
          title="Triangular Scanner (Tri-Arb)"
          bullets={[
            "Find profitable triangular loops",
            "Taker fees & slippage included",
            "Optional Telegram alerts",
          ]}
          cta={{ label: "Request demo", href: "/contact" }}
          badge="In-house"
        />
        <ProductCard
          title="Inter-Exchange Scanner"
          bullets={[
            "Compare bid/ask across exchanges",
            "Check compatible withdrawal networks",
            "Dynamic threshold + whitelist",
          ]}
          cta={{ label: "Request demo", href: "/contact" }}
          badge="In-house"
        />
        <ProductCard
          title="UI Connector BotSignal → TradingView"
          bullets={[
            "Webhook / manual confirm",
            "Auto/Manual toggle",
            "Integrates Altrady Smart Trading",
          ]}
          cta={{ label: "Contact us", href: "/contact" }}
          badge="Integration"
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Recommended tools</h2>
        <p className="muted">Products we use and recommend.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <ProductCard
            title="TradingView (affiliate)"
            bullets={["Advanced charting","Alerts & watchlists","Indicators marketplace"]}
            cta={{ label: "Try TradingView", href: TV, external: true }}
            badge="Recommended"
          />
          <ProductCard
            title="Altrady (Smart Trading)"
            bullets={["Smart Trading","Bot Signal","Multi-exchange portfolios"]}
            cta={{ label: "Try Altrady", href: AL, external: true }}
            badge="Recommended"
          />
        </div>
      </section>
    </div>
  );
}
`);

// 4) (opțional) schelet curat pentru /burse fără blocuri TV/Altrady
if (!fs.existsSync("app/burse/page.tsx")) {
  fs.mkdirSync("app/burse", { recursive: true });
}
if (true) {
  fs.writeFileSync("app/burse/page.tsx", `export const metadata = { title: "Burse • CryptoHub" };
export default function BursePage(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Burse</h1>
      <div className="card-soft p-5">
        <ul className="list-disc pl-5 space-y-1">
          <li><a className="text-blue-700 underline" href="https://www.binance.com/" target="_blank" rel="noopener">Binance</a></li>
          <li><a className="text-blue-700 underline" href="https://www.bybit.com/" target="_blank" rel="noopener">Bybit</a></li>
          <li><a className="text-blue-700 underline" href="https://www.okx.com/" target="_blank" rel="noopener">OKX</a></li>
        </ul>
      </div>
    </div>
  );
}
`);
  console.log("✔ wrote app/burse/page.tsx");
}

console.log("\\nPatch16 applied. Set env vars if needed: TRADINGVIEW_AFFILIATE_URL, ALTRADY_AFFILIATE_URL.");
