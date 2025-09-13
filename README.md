# CryptoHub Next (Știri + Blog + Admin simplu)

**Stack**: Next.js 14 (App Router) + Tailwind + Prisma (SQLite) + Basic Auth

## Setup (Windows)
1. Dezarhivează.
2. În folder:
   ```bash
   npm install
   copy .env.example .env.local
   # editează .env.local și setează:
   # ADMIN_USER=admin
   # ADMIN_PASS=parola_ta
   npm run prisma:push
   npm run dev
   ```
3. http://localhost:3000 → prima pagină este **/stiri**.
4. http://localhost:3000/admin → prompt user/parolă (Basic Auth).

## Deploy
- Orice hosting Node 18+ (ex. Hostinger/VPS).
- Setează variabilele de mediu `ADMIN_USER`, `ADMIN_PASS`, `DATABASE_URL`.
- Rulează `npm run prisma:push` pe server, apoi `npm run start`.

## Note
- Datele se salvează în `prisma/dev.db` (SQLite).
- Admin simplu pentru adăugare știri/postări.
