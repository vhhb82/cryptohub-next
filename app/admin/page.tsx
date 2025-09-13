import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteNewsAction, deletePostAction, deleteProductAction, deleteVideoAction } from "./actions";

export const metadata = { title: "Admin • CryptoHub" };

export default async function AdminPage(){
  const [news, posts, products, videos] = await Promise.all([
    prisma.news.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.post.findMany({ orderBy: { createdAt: "desc" } }).catch(()=>[] as any[]),
    // @ts-ignore
    prisma.product?.findMany?.({ orderBy: { createdAt: "desc" } }).catch(()=>[] as any[]) ?? [],
    prisma.video.findMany({ orderBy: { createdAt: "desc" } }).catch(()=>[] as any[]),
  ]);

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold" style={{fontFamily:"var(--font-sora)"}}>Admin</h1>
        <div className="flex gap-4 text-sm">
          <Link href="/admin/stiri/new" className="text-blue-700 hover:underline">+ Știre</Link>
          <Link href="/admin/posts/new" className="text-blue-700 hover:underline">+ Postare</Link>
          <Link href="/admin/products/new" className="text-blue-700 hover:underline">+ Produs</Link>
          <Link href="/admin/video/new" className="text-blue-700 hover:underline">+ Video</Link>
        </div>
      </header>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Știri</h2>
        {!news.length && <p className="muted">Nimic încă.</p>}
        <ul className="space-y-2">
          {news.map(n => (
            <li key={n.id} className="flex items-center justify-between">
              <div className="min-w-0">
                <Link href={"/stiri/" + n.slug} className="hover:underline">{n.title}</Link>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="muted">{n.published ? "publicat" : "draft"}</span>
                <form action={deleteNewsAction}>
                  <input type="hidden" name="id" value={String(n.id)} />
                  <DeleteButton>Șterge</DeleteButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Postări</h2>
        {!posts.length && <p className="muted">Nimic încă.</p>}
        <ul className="space-y-2">
          {posts.map(p => (
            <li key={p.id} className="flex items-center justify-between">
              <div className="min-w-0"><Link href={"/blog/" + p.slug} className="hover:underline">{p.title}</Link></div>
              <div className="flex items-center gap-4 text-sm">
                <span className="muted">{p.published ? "publicat" : "draft"}</span>
                <form action={deletePostAction}><input type="hidden" name="id" value={String(p.id)} /><DeleteButton>Șterge</DeleteButton></form>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Produse</h2>
        {!products.length && <p className="muted">Nimic încă.</p>}
        <ul className="space-y-2">
          {products.map((p:any) => (
            <li key={p.id} className="flex items-center justify-between">
              <div className="min-w-0">{p.title}</div>
              <div className="flex items-center gap-4 text-sm">
                <span className="muted">{p.published ? "publicat" : "draft"}</span>
                <form action={deleteProductAction}><input type="hidden" name="id" value={String(p.id)} /><DeleteButton>Șterge</DeleteButton></form>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Video</h2>
        {!videos.length && <p className="muted">Nimic încă.</p>}
        <ul className="space-y-2">
          {videos.map(v => (
            <li key={v.id} className="flex items-center justify-between">
              <div className="min-w-0"><span className="muted">[{v.source}]</span> {v.title}</div>
              <div className="flex items-center gap-4 text-sm">
                <span className="muted">{v.published ? "publicat" : "draft"}</span>
                <form action={deleteVideoAction}><input type="hidden" name="id" value={String(v.id)} /><DeleteButton>Șterge</DeleteButton></form>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
