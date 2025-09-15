# 🚀 Ghid de Deployment pe Vercel

## 📋 Variabile de Mediu Necesare

Configurează următoarele variabile în Vercel Dashboard:

### 🔧 Cloudinary
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dopyxebpu
NEXT_PUBLIC_CLOUDINARY_PRESET=cryptohub_unsigned
CLOUDINARY_CLOUD_NAME=dopyxebpu
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 🌐 DeepL Translation
```
DEEPL_API_KEY=b8ce161e-e447-478c-bbd8-c2cfa310ff57:fx
DEEPL_PLAN=free
```

### 🗄️ Database
```
DATABASE_URL=your_postgresql_url_here
```

### 🔐 Admin
```
ADMIN_SECRET=your_admin_secret_here
```

## 🛠️ Pași pentru Deployment

### 1. Conectează Repository-ul
- Mergi la [Vercel Dashboard](https://vercel.com/dashboard)
- Apasă "New Project"
- Conectează repository-ul GitHub

### 2. Configurează Variabilele de Mediu
- În proiect, mergi la "Settings" → "Environment Variables"
- Adaugă toate variabilele de mai sus

### 3. Configurează Build Settings
- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Output Directory: `.next`

### 4. Deploy
- Apasă "Deploy"
- Așteaptă finalizarea build-ului

## 🔍 Verificări Post-Deploy

### ✅ Testează Funcționalitățile
1. **Homepage**: `https://your-app.vercel.app/`
2. **Admin Panel**: `https://your-app.vercel.app/admin`
3. **Adaugă Știre**: `https://your-app.vercel.app/admin/stiri/new`
4. **Testează Traducerea**: Completează formularul și apasă "Generează EN automat"
5. **Testează Upload Imagine**: Încarcă o imagine în formular

### 🐛 Debugging
- Verifică logs în Vercel Dashboard
- Testează API endpoints direct
- Verifică variabilele de mediu

## 📝 Note Importante

- **Database**: Folosește PostgreSQL pe Vercel (nu SQLite)
- **Images**: Cloudinary trebuie configurat cu preset-ul corect
- **Translation**: DeepL API key trebuie să fie valid
- **Admin**: Setează un secret puternic pentru admin

## 🆘 Probleme Comune

### ❌ Imagini nu se încarcă
- Verifică `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- Verifică `NEXT_PUBLIC_CLOUDINARY_PRESET`
- Verifică că preset-ul este "unsigned"

### ❌ Traducerea nu funcționează
- Verifică `DEEPL_API_KEY`
- Verifică că API key-ul este valid
- Verifică logs pentru erori

### ❌ Database errors
- Verifică `DATABASE_URL`
- Verifică că folosești PostgreSQL (nu SQLite)
- Verifică că tabelele sunt create

## 🎯 Status Actual

- ✅ **Stiluri**: Configurate și funcționale
- ✅ **Cloudinary**: Configurat pentru upload imagini
- ✅ **DeepL**: Configurat pentru traducere
- ✅ **Next.js**: Configurat pentru imagini externe
- ⚠️ **Database**: Necesită PostgreSQL pe Vercel
- ⚠️ **Environment Variables**: Trebuie configurate în Vercel
