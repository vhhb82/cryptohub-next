# 🖼️ Test Upload Imagine - Instrucțiuni

## 🎯 Problema Identificată
Știrea se publică cu succes, dar imaginea nu se încarcă în baza de date.

## 🔍 Debugging Aplicat

### **1. Logging Adăugat**
- ✅ **Formular**: Logging în `app/admin/stiri/new/page.tsx`
- ✅ **API**: Logging în `app/api/news/route.ts`
- ✅ **Componenta**: Feedback vizual în `ImageUploader`

### **2. Pagini de Test Create**
- ✅ **Test Simplu**: `http://localhost:3000/test-upload-simple`
- ✅ **Test Admin**: `http://localhost:3000/admin/test-upload`

## 🧪 Pași de Testare

### **Pasul 1: Test Upload Simplu**
1. Accesează: `http://localhost:3000/test-upload-simple`
2. Verifică configurația Cloudinary
3. Încearcă să încarci o imagine
4. Verifică dacă primești URL-ul

### **Pasul 2: Test în Admin**
1. Accesează: `http://localhost:3000/admin/stiri/new`
2. Completează formularul
3. Încarcă o imagine
4. Verifică în consolă (F12) ce se loghează
5. Publică știrea
6. Verifică în consolă ce primește API-ul

### **Pasul 3: Verificare Baza de Date**
1. Accesează: `http://localhost:3000/stiri`
2. Verifică dacă știrea apare
3. Verifică dacă imaginea se afișează

## 🔧 Configurație Cloudinary

### **Variabile de Mediu (.env.local):**
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dopyxebpu
NEXT_PUBLIC_CLOUDINARY_PRESET=cryptohub_unsigned
```

### **Verificare Configurație:**
- ✅ Cloud Name: `dopyxebpu`
- ✅ Upload Preset: `cryptohub_unsigned`
- ✅ Componenta: `ImageUploader` cu input hidden
- ✅ API: Primește câmpul `image`

## 🐛 Posibile Probleme

### **1. Upload Preset**
- Verifică dacă preset-ul `cryptohub_unsigned` există în Cloudinary
- Verifică dacă este setat ca "Unsigned"

### **2. CORS**
- Cloudinary ar trebui să accepte upload-uri directe
- Verifică dacă nu există restricții

### **3. Form Data**
- Verifică dacă input-ul hidden se populează corect
- Verifică dacă FormData include câmpul `image`

## 📊 Logging

### **În Browser (F12 Console):**
```
Form data:
title: Test Știre
content: Conținut test
image: https://res.cloudinary.com/dopyxebpu/image/upload/v1234567890/test.jpg
```

### **În Terminal (Server):**
```
API received form data:
title: Test Știre
content: Conținut test
image: https://res.cloudinary.com/dopyxebpu/image/upload/v1234567890/test.jpg
Image value: https://res.cloudinary.com/dopyxebpu/image/upload/v1234567890/test.jpg
```

## ✅ Rezultat Așteptat

După testare, ar trebui să vezi:
1. **Upload-ul funcționează** (URL generat)
2. **Formularul include URL-ul** (în logging)
3. **API-ul primește URL-ul** (în logging)
4. **Știrea se salvează cu imaginea** (în baza de date)
5. **Imaginea se afișează** (pe pagina de știri)

---

**Testează acum și raportează rezultatele!**
