# 🔑 DeepL API Key Setup

## ❌ Problema Actuală

API key-ul `BTU5cWUwZxKDH1xDm` returnează eroarea **"Forbidden"**, ceea ce înseamnă că:

1. **Key-ul este invalid** sau expirat
2. **Nu are permisiuni** pentru traducere
3. **Contul nu este activat** corect

## ✅ Soluția Temporară

Am configurat **mock translations** care funcționează perfect pentru development:

- ✅ **Traduceri realiste** pentru termeni crypto
- ✅ **Fără erori** de API
- ✅ **Funcțional** imediat

## 🔧 Pentru DeepL Real (Opțional)

### **Pasul 1: Creează Cont DeepL**
1. Accesează: https://www.deepl.com/pro
2. Creează cont gratuit (500k chars/lună)
3. Confirmă email-ul

### **Pasul 2: Obține API Key**
1. Mergi la: https://www.deepl.com/account/summary
2. Copiază **API Key** din secțiunea "API"
3. Key-ul arată ca: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:fx`

### **Pasul 3: Configurează în .env**
```bash
DEEPL_API_KEY=your-real-api-key-here
DEEPL_PLAN=free
```

### **Pasul 4: Activează DeepL Real**
În `app/api/translate/route.ts`, comentează liniile 47-54 și decomentează liniile 58-66.

## 🎯 Status Actual

- ✅ **Mock translations** - Funcționale
- ✅ **Buton EN** - Funcțional pe tot site-ul
- ✅ **Toate paginile EN** - Disponibile
- ⚠️ **DeepL API** - Necesită key valid

## 🧪 Testează Acum

1. **Traducere**: `http://localhost:3000/admin/stiri/new`
2. **Buton EN**: `http://localhost:3000/` → apasă "EN"
3. **Paginile EN**: `/en/news`, `/en/blog`, etc.

---

**🎉 Totul funcționează perfect cu mock translations!**
