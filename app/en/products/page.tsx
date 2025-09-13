import ProductCard from "@/components/ProductCard";

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
