import ProductCard from "@/components/ProductCard";

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
