# Configurare Finală Vercel - CryptoHub Image Upload

## Status Actual
- ✅ **Local**: Funcționează perfect cu SQLite și upload local
- ✅ **API Upload**: Testat și funcționează
- ❌ **Vercel**: Eroare 415 Unsupported Media Type

## Problema Identificată

Din logs-urile Vercel, problema este **415 Unsupported Media Type** pentru `POST /api/upload`. Aceasta înseamnă că:

1. **Tipul MIME** al fișierului nu este recunoscut
2. **API-ul respinge** fișierul înainte să ajungă la procesare

## Soluția Completă

### 1. Deploy cu Logging Îmbunătățit

Am adăugat logging detaliat în `app/api/upload/route.ts` care va afișa:
- Numele fișierului
- Tipul MIME primit
- Mărimea fișierului
- Lista de tipuri permise

### 2. Configurare Vercel

#### Variabile de mediu necesare pe Vercel:

```
DATABASE_URL = postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL = postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
SUPABASE_URL = https://[PROJECT-REF].supabase.co
SUPABASE_SERVICE_ROLE_KEY = [SERVICE-ROLE-KEY]
SUPABASE_BUCKET = uploads
ADMIN_USER = admin
ADMIN_PASS = Kitaitu82@
```

#### Schema Prisma pentru Vercel:

Înainte de deploy, schimbă înapoi la PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 3. Testare Pas cu Pas

#### Pasul 1: Deploy cu logging
1. Commit modificările cu logging-ul îmbunătățit
2. Deploy pe Vercel
3. Încearcă să încarci o imagine
4. Verifică logs-urile Vercel pentru mesajele de logging

#### Pasul 2: Analizează logs-urile
În logs-urile Vercel vei vedea:
```
Upload request: { name: "file.svg", type: "image/svg+xml", size: 1234, allowed: [...] }
```

Dacă vezi `Unsupported file type: [tip]`, atunci știi exact ce tip MIME cauzează problema.

#### Pasul 3: Corectează tipul MIME
Dacă tipul MIME nu este în lista `ALLOWED`, adaugă-l:

```typescript
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "tipul-problematic"];
```

### 4. Tipuri MIME Comune pentru Imagini

```typescript
const ALLOWED = [
  "image/jpeg",
  "image/jpg", 
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/bmp",
  "image/tiff"
];
```

### 5. Troubleshooting Avansat

#### Dacă încă primești 415:

1. **Verifică browser-ul**:
   - Deschide Developer Tools (F12)
   - Mergi la Network tab
   - Încearcă upload-ul
   - Uită-te la request-ul către `/api/upload`
   - Verifică header-ul `Content-Type`

2. **Verifică componenta ImageUpload**:
   - Asigură-te că `accept="image/*,.svg"` este setat corect
   - Verifică că fișierul este valid

3. **Testează cu fișiere diferite**:
   - Încearcă cu JPG, PNG, SVG
   - Verifică care funcționează și care nu

### 6. Soluția de Urgență

Dacă vrei să funcționeze imediat, poți dezactiva validarea tipului MIME temporar:

```typescript
// Comentează validarea temporar
// if (!ALLOWED.includes(file.type)) {
//   return NextResponse.json({ error: "TYPE" }, { status: 415 });
// }
```

**⚠️ ATENȚIE**: Aceasta nu este o soluție sigură pentru producție!

## Următorii Pași

1. **Deploy** cu logging-ul îmbunătățit
2. **Testează** upload-ul pe Vercel
3. **Verifică logs-urile** pentru tipul MIME exact
4. **Corectează** lista ALLOWED dacă este necesar
5. **Testează din nou** până funcționează

## Status Final
- ✅ Local: Funcționează
- ✅ API: Funcționează cu logging
- ⏳ Vercel: Așteaptă deploy cu logging pentru debugging
