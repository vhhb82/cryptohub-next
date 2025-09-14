# Configurare Vercel pentru CryptoHub

## Variabile de mediu necesare pe Vercel

Pentru ca aplicația să funcționeze pe Vercel, trebuie să configurezi următoarele variabile de mediu în dashboard-ul Vercel:

### 1. Accesează Vercel Dashboard
- Mergi la https://vercel.com/dashboard
- Selectează proiectul `cryptohub-next`
- Mergi la **Settings** → **Environment Variables**

### 2. Adaugă următoarele variabile:

#### Database (Supabase PostgreSQL)
```
DATABASE_URL = postgresql://postgres:[YOUR-PASSWORD]@db.rnnlpwoitjrmjuxwcaqt.supabase.co:5432/postgres
DIRECT_URL = postgresql://postgres:[YOUR-PASSWORD]@db.rnnlpwoitjrmjuxwcaqt.supabase.co:5432/postgres
```

#### Supabase Configuration
```
SUPABASE_URL = https://rnnlpwoitjrmjuxwcaqt.supabase.co
SUPABASE_SERVICE_ROLE_KEY = [YOUR-SERVICE-ROLE-KEY]
SUPABASE_BUCKET = uploads
```

#### Admin Configuration
```
ADMIN_USER = admin
ADMIN_PASS = [YOUR-ADMIN-PASSWORD]
```

#### Translation (optional)
```
TRANSLATE_PROVIDER = deepl
NEXT_PUBLIC_TRANSLATE_PROVIDER = deepl
DEEPL_API_KEY = [YOUR-DEEPL-KEY]
```

#### TradingView (optional)
```
TRADINGVIEW_AFFILIATE_URL = https://ru.tradingview.com/?aff_id=156512
NEXT_PUBLIC_TRADINGVIEW_AFFILIATE_URL = https://ru.tradingview.com/?aff_id=156512
```

### 3. Unde să găsești valorile:

#### Supabase Database URL și Service Role Key:
1. Mergi la https://supabase.com/dashboard
2. Selectează proiectul `rnnlpwoitjrmjuxwcaqt`
3. Mergi la **Settings** → **Database**
4. Copiază **Connection string** (URI) și înlocuiește `[YOUR-PASSWORD]` cu parola ta
5. Mergi la **Settings** → **API**
6. Copiază **service_role** key (nu anon key!)

#### Supabase Storage Bucket:
1. Mergi la **Storage** în dashboard-ul Supabase
2. Creează un bucket numit `uploads` dacă nu există
3. Setează bucket-ul ca public

### 4. După configurare:
1. **Redeploy** aplicația pe Vercel
2. Testează încărcarea imaginilor din admin
3. Verifică logs-urile Vercel pentru erori

### 5. Troubleshooting:

#### Dacă încă nu funcționează:
- Verifică că toate variabilele sunt setate corect
- Verifică că bucket-ul `uploads` există în Supabase Storage
- Verifică că service role key are permisiuni de write în Storage
- Verifică logs-urile Vercel pentru erori detaliate

#### Pentru debugging:
- Adaugă `console.log` în API routes pentru a vedea valorile variabilelor
- Verifică Network tab în browser pentru request-urile către `/api/upload`
