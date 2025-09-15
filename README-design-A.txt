Design Variant A — Minimal Clean

Ce adaugă:
- tokens de culoare în `app/globals.css` + componente `.btn`, `.card`, `.input`, `.badge`.
- fonturi Inter + Sora (în `app/layout.tsx`).
- carduri pentru Știri/Blog (`components/NewsCard.tsx`, `components/BlogCard.tsx`).
- listă reutilizabilă pentru știri (`components/NewsList.tsx`).
- homepage `/` = feed de Știri (curat) + pagini actualizate pentru `/stiri` și `/en/news`.

Cum aplici:
1) Rulezi acest script (creează/actualizează fișierele).
2) `npm run dev`.
3) Verifică `/`, `/stiri`, `/en/news`.

Notă:
- Stilurile `.btn`, `.input`, `.card` se aplică în tot proiectul, inclusiv în Admin.
