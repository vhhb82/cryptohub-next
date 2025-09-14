# Configurarea Noilor Credențiale Supabase

## Status Actual
- ✅ **API**: Modificat pentru a detecta environment și a folosi strategia corectă
- ✅ **Local**: Funcționează perfect cu fallback la local
- ✅ **Tipuri MIME**: Extinse cu fallback pentru extensii
- ⏳ **Supabase**: Așteaptă configurarea noilor credențiale

## Pași pentru Configurarea Supabase

### Pasul 1: Creează Fișierul .env.local

Creează fișierul `.env.local` în root-ul proiectului cu următorul conținut:

```env
# Database (SQLite pentru development local)
DATABASE_URL="file:./prisma/dev.db"

# Supabase Client (required for Storage and Auth)
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-NEW-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-NEW-ANON-KEY]"

# Supabase Server-side (for API routes)
SUPABASE_URL="https://[YOUR-NEW-PROJECT-REF].supabase.co"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-NEW-SERVICE-ROLE-KEY]"
SUPABASE_BUCKET="uploads"

# TradingView (optional)
TRADINGVIEW_AFFILIATE_URL="https://www.tradingview.com"
```

### Pasul 2: Înlocuiește Credențialele

Înlocuiește următoarele cu credențialele tale noi:

- `[YOUR-NEW-PROJECT-REF]` - Referința noului proiect Supabase
- `[YOUR-NEW-ANON-KEY]` - Cheia anonimă nouă
- `[YOUR-NEW-SERVICE-ROLE-KEY]` - Cheia de service role nouă

### Pasul 3: Creează Bucket-ul în Supabase

1. Mergi la Supabase Dashboard
2. Storage → Create Bucket
3. Nume: `uploads`
4. Public: ✅ (pentru acces public la imagini)

### Pasul 4: Configurează RLS Policies

În Supabase → Storage → Policies pentru bucket-ul `uploads`:

```sql
-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'uploads');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');

-- Allow service role to manage files
CREATE POLICY "Service role full access" ON storage.objects
FOR ALL USING (auth.role() = 'service_role');
```

### Pasul 5: Testează Local

După ce ai configurat `.env.local`:

1. Restart serverul: `npm run dev`
2. Testează upload-ul în admin panel
3. Verifică logs-urile pentru mesajele de debugging

### Pasul 6: Deploy pe Vercel

1. Adaugă credențialele în Vercel Dashboard → Settings → Environment Variables
2. Deploy modificările
3. Testează upload-ul pe Vercel

## Logs-uri de Debugging

### Mesaje Pozitive:
```
Environment check: { isVercel: false, hasValidSupabase: true }
Uploading to Supabase: { bucket: 'uploads', key: 'uploads/...', contentType: 'image/svg+xml' }
Supabase upload success: { url: 'https://...', path: 'uploads/...' }
```

### Mesaje de Eroare:
```
Environment check: { isVercel: false, hasValidSupabase: false }
Supabase upload failed: [error details]
```

## Troubleshooting

### Dacă primești "hasValidSupabase: false":
- Verifică că `SUPABASE_URL` și `SUPABASE_SERVICE_ROLE_KEY` sunt setate corect
- Verifică că URL-ul nu conține `rnnlpwoitjrmjuxwcaqt` (invalid)

### Dacă primești eroare de upload:
- Verifică că bucket-ul `uploads` există în Supabase
- Verifică RLS policies
- Verifică că `SUPABASE_SERVICE_ROLE_KEY` este corect

### Dacă primești 415:
- Verifică tipul MIME în logs
- Tipurile MIME extinse ar trebui să rezolve problema

## Status Final

- ✅ **Local**: Funcționează cu fallback la local
- ✅ **API**: Detectează environment și folosește strategia corectă
- ✅ **Tipuri MIME**: Extinse cu fallback pentru extensii
- ⏳ **Supabase**: Așteaptă configurarea noilor credențiale

## Următorii Pași

1. **Creează `.env.local`** cu noile credențiale
2. **Configurează bucket-ul** în Supabase
3. **Testează local** upload-ul
4. **Deploy pe Vercel** cu credențialele noi

**După configurarea noilor credențiale, upload-ul va funcționa perfect atât local cât și pe Vercel!** 🎯
