# Bilingv (RO/EN) – Setup rapid

1. Migrare DB (câmpuri EN):
   ```bash
   npx prisma db push
   ```

2. Cheie traducere (opțional) pentru butonul „Generează EN” în admin:
   - DeepL: `.env.local`
     ```
     TRANSLATE_PROVIDER=deepl
     DEEPL_API_KEY=YOUR_KEY
     ```
   - Google Translate v2:
     ```
     TRANSLATE_PROVIDER=google
     GOOGLE_API_KEY=YOUR_KEY
     ```

3. Rute publice:
   - RO: `/stiri`, `/blog`
   - EN: `/en/news`, `/en/blog`

4. Comutator EN/RO: în header.

5. Fallback: dacă nu ai completat EN, paginile EN afișează textul în română.
