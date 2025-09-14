# Configurare Vercel cu PostgreSQL pentru CryptoHub

## Problema actuală
- Local: Funcționează cu SQLite
- Vercel: Nu funcționează pentru că nu ai configurat corect PostgreSQL

## Soluția pas cu pas

### 1. Obține parola PostgreSQL din Supabase

1. Mergi la https://supabase.com/dashboard
2. Selectează proiectul `rnnlpwoitjrmjuxwcaqt`
3. Mergi la **Settings** → **Database**
4. Scroll down la **Connection string**
5. Copiază **URI** și înlocuiește `[YOUR-PASSWORD]` cu parola ta reală

Exemplu:
```
postgresql://postgres:ABC123def456@db.rnnlpwoitjrmjuxwcaqt.supabase.co:5432/postgres
```

### 2. Configurează variabilele pe Vercel

1. Mergi la https://vercel.com/dashboard
2. Selectează proiectul `cryptohub-next`
3. Mergi la **Settings** → **Environment Variables**
4. Adaugă următoarele variabile:

```
DATABASE_URL = postgresql://postgres:ABC123def456@db.rnnlpwoitjrmjuxwcaqt.supabase.co:5432/postgres
DIRECT_URL = postgresql://postgres:ABC123def456@db.rnnlpwoitjrmjuxwcaqt.supabase.co:5432/postgres
SUPABASE_URL = https://rnnlpwoitjrmjuxwcaqt.supabase.co
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubmxwd29pdHJqbWp1d3hjYXF0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzc2NTE2OSwiZXhwIjoyMDczMzQxMTY5fQ._YrMX7xUrVFuY9Z8Y_IqxY0vraLcAmH--Fuv0LJwnoo
SUPABASE_BUCKET = uploads
ADMIN_USER = admin
ADMIN_PASS = Kitaitu82@
```

### 3. Creează bucket-ul în Supabase Storage

1. Mergi la **Storage** în dashboard-ul Supabase
2. Creează un bucket nou numit `uploads`
3. Setează bucket-ul ca **Public**
4. Verifică că service role key are permisiuni de write

### 4. Actualizează schema Prisma pentru Vercel

Înainte de deploy pe Vercel, schimbă înapoi la PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 5. Deploy pe Vercel

1. Commit și push modificările
2. Vercel va face deploy automat
3. Verifică logs-urile Vercel pentru erori

### 6. Testează upload-ul

1. Mergi la `https://cryptohub-next.vercel.app/admin/stiri/new`
2. Încearcă să încarci o imagine
3. Verifică console-ul browser-ului pentru erori

## Troubleshooting

### Dacă încă nu funcționează:

1. **Verifică logs-urile Vercel**:
   - Mergi la Vercel Dashboard → Functions
   - Uită-te la logs pentru `/api/upload`

2. **Verifică variabilele de mediu**:
   - Asigură-te că toate variabilele sunt setate corect
   - Verifică că nu ai spații în plus

3. **Verifică Supabase Storage**:
   - Bucket-ul `uploads` există și este public
   - Service role key are permisiuni

4. **Testează API-ul direct**:
   ```bash
   curl -X POST https://cryptohub-next.vercel.app/api/upload \
     -F "file=@test-image.jpg"
   ```

### Pentru debugging:

Adaugă logging în `app/api/upload/route.ts`:
```typescript
console.log("Environment check:", {
  hasSupabaseUrl: !!process.env.SUPABASE_URL,
  hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  bucket: process.env.SUPABASE_BUCKET
});
```

## Status actual:
- ✅ Local: Funcționează cu SQLite
- ✅ API upload: Funcționează local
- ⏳ Vercel: Trebuie configurat cu PostgreSQL
- ⏳ Supabase Storage: Trebuie configurat bucket-ul
