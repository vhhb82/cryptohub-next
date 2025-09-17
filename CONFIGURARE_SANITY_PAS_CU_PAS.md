# 🚀 Configurare Sanity CMS - Pas cu Pas

## Pasul 1: Creează cont și proiect Sanity

1. **Mergi la [sanity.io](https://sanity.io)** și creează un cont
2. **Creează un nou proiect**:
   - Nume: `CryptoHub CMS`
   - Dataset: `production`
   - Template: `Clean project with no predefined schemas`

## Pasul 2: Configurează variabilele de mediu

1. **Copiază fișierul de configurare**:
   ```bash
   cp SANITY_CONFIG_TEMPLATE.env .env.local
   ```

2. **Completează valorile în `.env.local`**:
   ```env
   # Obține aceste valori din dashboard-ul Sanity
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_actual_api_token
   ```

### Cum să obții valorile:

#### Project ID:
- În dashboard-ul Sanity → Settings → API → Project ID

#### API Token:
- În dashboard-ul Sanity → API → Tokens
- Creează un nou token cu permisiuni `Editor`
- Copiază token-ul

## Pasul 3: Rulează Sanity Studio

```bash
npm run sanity:dev
```

Aceasta va deschide Sanity Studio la `http://localhost:3333`

## Pasul 4: Testează aplicația

```bash
npm run dev
```

Aceasta va deschide aplicația la `http://localhost:3000`

## Pasul 5: Migrează datele existente (opțional)

Dacă ai date existente în Prisma:

```bash
node scripts/migrate-to-sanity.js
```

## ✅ Verificări finale

1. **Sanity Studio funcționează** la `http://localhost:3333`
2. **Aplicația funcționează** la `http://localhost:3000`
3. **Poți crea conținut nou** în Sanity Studio
4. **Conținutul se afișează** în aplicație

## 🎯 Ce să testezi

### În Sanity Studio:
- [ ] Creează o știre nouă
- [ ] Adaugă o imagine
- [ ] Scrie conținut
- [ ] Publică știrea

### În aplicație:
- [ ] Mergi la `/stiri` - vezi știrea nouă
- [ ] Click pe știre - vezi pagina de detaliu
- [ ] Verifică că imaginea se afișează corect

## 🔧 Dacă ai probleme

### Eroare "Project ID not found":
- Verifică că `NEXT_PUBLIC_SANITY_PROJECT_ID` este corect în `.env.local`

### Eroare "Unauthorized":
- Verifică că `SANITY_API_TOKEN` este corect și are permisiuni `Editor`

### Sanity Studio nu se deschide:
- Verifică că nu ai alte procese pe portul 3333
- Rulează `npm run sanity:dev` din directorul proiectului

### Imaginile nu se afișează:
- Verifică că ai configurat corect `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Verifică că imaginile sunt încărcate în Sanity Studio

## 🎉 Succes!

Dacă totul funcționează, ai rezolvat problema cu încărcarea imaginilor și ai o interfață de administrare modernă!
