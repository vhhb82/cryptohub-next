export const metadata = { title: "Tailwind Smoke Test" };
export default function TwTest(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Smoke test Tailwind</h1>
      <div className="badge">Badge</div>
      <button className="btn-primary">Buton Primary</button>
      <div className="card"><p className="muted">Card Paper Blue cu border fin.</p></div>
      <div className="grid grid-cols-3 gap-2">
        <div className="h-3 bg-blue-600 rounded"></div>
        <div className="h-3 bg-slate-200 rounded"></div>
        <div className="h-3 bg-white rounded border"></div>
      </div>
    </div>
  );
}
