# Debug Upload pe Vercel

## Problema Actuală
- ✅ **Local**: Funcționează cu fallback la local
- ❌ **Vercel**: Încă primește "Nu am putut încărca imaginea"

## Pași de Debugging

### Pasul 1: Verifică Environment Variables în Vercel

1. Mergi la Vercel Dashboard
2. Selectează proiectul `cryptohub-next`
3. Settings → Environment Variables
4. Verifică că ai toate variabilele:

```
NEXT_PUBLIC_SUPABASE_URL = https://XK-Bm3X-dZYCviP67Hr8XQ.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_XK-Bm3X-dZYCviP67Hr8XQ_rrp5g6oo
SUPABASE_URL = https://XK-Bm3X-dZYCviP67Hr8XQ.supabase.co
SUPABASE_SERVICE_ROLE_KEY = sb_secret_fXQhPCxPn-zDLKH9JxZ5Cw_KFhkmU8c
SUPABASE_BUCKET = uploads
```

### Pasul 2: Verifică Logs-urile Vercel

1. Vercel Dashboard → Functions
2. Caută logs-urile pentru `/api/upload`
3. Caută mesajele:
   - `Environment check: { isVercel: true, hasValidSupabase: true/false }`
   - `Uploading to Supabase: { bucket: 'uploads', key: 'uploads/...', contentType: 'image/svg+xml' }`

### Pasul 3: Verifică Bucket-ul în Supabase

1. Mergi la Supabase Dashboard: https://supabase.com/dashboard
2. Selectează proiectul `XK-Bm3X-dZYCviP67Hr8XQ`
3. Storage → Verifică că bucket-ul `uploads` există
4. Verifică că este public

### Pasul 4: Testează cu Browser Developer Tools

1. Deschide `https://cryptohub-next.vercel.app/admin/stiri/new`
2. F12 → Network tab
3. Încearcă să încarci o imagine
4. Caută request-ul la `/api/upload`
5. Verifică response-ul (status code, body)

## Soluții Posibile

### Dacă Environment Variables nu sunt setate:
- Adaugă-le în Vercel Dashboard
- Redeploy aplicația

### Dacă Bucket-ul nu există:
- Creează bucket-ul `uploads` în Supabase
- Setează-l ca public

### Dacă primești 415 (Unsupported Media Type):
- Verifică tipul MIME în logs
- Tipurile MIME extinse ar trebui să rezolve problema

### Dacă primești 500 (Internal Server Error):
- Verifică logs-urile pentru eroarea exactă
- Probabil problema cu Supabase configuration

## Test Rapid

Să testez direct API-ul pe Vercel:

```bash
# Test cu curl
curl -X POST https://cryptohub-next.vercel.app/api/upload \
  -F "file=@demo-news-cover.svg" \
  -v
```

## Status Actual

- ✅ **Local**: Funcționează perfect
- ✅ **API**: Detectează environment și folosește strategia corectă
- ✅ **Tipuri MIME**: Extinse cu fallback pentru extensii
- ❌ **Vercel**: Așteaptă configurarea corectă a Environment Variables

## Următorii Pași

1. **Verifică Environment Variables** în Vercel Dashboard
2. **Verifică logs-urile** pentru debugging
3. **Testează cu Developer Tools** pentru a vedea eroarea exactă
4. **Raportează** ce vezi în logs-uri

**După configurarea corectă a Environment Variables, upload-ul va funcționa pe Vercel!** 🎯
