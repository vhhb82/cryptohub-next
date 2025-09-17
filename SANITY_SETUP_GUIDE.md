# Ghid de configurare Sanity CMS pentru CryptoHub

## Pași pentru configurarea Sanity CMS

### 1. Creează un proiect Sanity

1. Mergi la [sanity.io](https://sanity.io) și creează un cont
2. Creează un nou proiect:
   - Nume: `cryptohub-cms`
   - Dataset: `production`
   - Template: `Clean project with no predefined schemas`

### 2. Configurează variabilele de mediu

Adaugă în fișierul `.env.local`:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

### 3. Obține API Token

1. În dashboard-ul Sanity, mergi la `API` → `Tokens`
2. Creează un nou token cu permisiuni `Editor`
3. Copiază token-ul și adaugă-l în `.env.local`

### 4. Rulează Sanity Studio

```bash
npm run sanity:dev
```

Aceasta va deschide Sanity Studio la `http://localhost:3333`

### 5. Configurează schema

Schema-urile sunt deja configurate în:
- `sanity/schemas/news.ts` - pentru știri
- `sanity/schemas/post.ts` - pentru postări blog
- `sanity/schemas/video.ts` - pentru videoclipuri

### 6. Deploy Sanity Studio (opțional)

```bash
npm run sanity:deploy
```

## Avantajele integrării cu Sanity

### ✅ Rezolvarea problemelor cu imaginile
- **Încărcare directă**: Imaginile se încarcă direct în Sanity
- **Optimizare automată**: Sanity optimizează automat imaginile
- **CDN global**: Imaginile sunt servite prin CDN-ul Sanity
- **Formate moderne**: Suport pentru WebP, AVIF

### ✅ Interfață de administrare modernă
- **Editor vizual**: Editor WYSIWYG pentru conținut
- **Preview live**: Preview în timp real
- **Gestionare media**: Biblioteca de imagini organizată
- **Versionare**: Istoricul modificărilor

### ✅ Funcționalități avansate
- **Conținut structurat**: Suport pentru blocuri de conținut
- **Multilingv**: Suport nativ pentru conținut în mai multe limbi
- **API GraphQL**: API modern pentru frontend
- **Webhooks**: Notificări pentru modificări

## Migrarea datelor existente

Pentru a migra datele existente din Prisma către Sanity:

1. **Exportă datele din Prisma**:
```bash
# Creează un script de migrare
node scripts/migrate-to-sanity.js
```

2. **Importă în Sanity**:
- Folosește Sanity Studio pentru a importa manual
- Sau creează un script de import automat

## Testarea integrării

1. **Rulează aplicația**:
```bash
npm run dev
```

2. **Testează crearea de conținut**:
- Mergi la `/admin`
- Creează o știre nouă
- Verifică că imaginea se încarcă corect

3. **Verifică afișarea**:
- Mergi la `/stiri`
- Verifică că știrile se afișează corect
- Testează paginile de detaliu

## Suport și documentație

- [Documentația Sanity](https://www.sanity.io/docs)
- [Sanity Studio](https://www.sanity.io/studio)
- [Sanity Client](https://www.sanity.io/docs/js-client)
