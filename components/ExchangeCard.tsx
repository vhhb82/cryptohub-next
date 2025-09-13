
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
