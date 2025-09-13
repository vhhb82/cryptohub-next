# CryptoHub Next.js

Un site modern pentru știri și blog despre criptomonede, construit cu Next.js 14.

## Caracteristici

- 📰 Știri și blog despre criptomonede
- 🎥 Secțiune video cu embed-uri YouTube și TikTok
- 💱 Informații despre burse de criptomonede
- 🛍️ Catalog de produse
- 🌐 Suport multilingv (Română/Engleză)
- 📱 Design responsive
- ⚡ Performanță optimizată cu Next.js

## Tehnologii

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: SQLite cu Prisma
- **Deployment**: Vercel
- **Icons**: Lucide React

## Instalare

1. Clonează repository-ul:
```bash
git clone https://github.com/vhh82/cryptohub-next.git
cd cryptohub-next
```

2. Instalează dependențele:
```bash
npm install
```

3. Configurează baza de date:
```bash
npx prisma generate
npx prisma db push
```

4. Pornește serverul de dezvoltare:
```bash
npm run dev
```

Site-ul va fi disponibil la [http://localhost:3000](http://localhost:3000).

## Deployment

Site-ul este deployat automat pe Vercel când se face push pe branch-ul `main`.

## Structura proiectului

```
├── app/                 # App Router pages
├── components/          # React components
├── data/               # Static data files
├── lib/                # Utility functions
├── prisma/             # Database schema
└── public/             # Static assets
```

## Contribuții

Contribuțiile sunt binevenite! Te rugăm să deschizi un issue sau pull request.