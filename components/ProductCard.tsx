type Props = {
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
