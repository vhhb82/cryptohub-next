"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";
import TranslateEnButton from "@/components/admin/TranslateEnButton";

export default function NewsForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
    toast.success("Imaginea a fost încărcată cu succes");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Debug: log form data
      console.log('Form data:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
      const response = await fetch('/api/news', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Știrea a fost publicată cu succes!");
        router.push(result.redirect || '/admin');
      } else {
        toast.error(result.error || 'Eroare la publicarea știrii');
      }
    } catch (error) {
      toast.error('Eroare la trimiterea formularului');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Adaugă știre</h1>
        <p className="text-gray-600">Completează câmpurile în română, apoi apasă "Generează EN automat".</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="font-semibold">Română</h2>
          <div>
            <label className="label">Titlu</label>
            <input name="title" className="input" required placeholder="Titlul știrii" />
          </div>
          <div>
            <label className="label">Slug</label>
            <input name="slug" className="input" required placeholder="slug-automat-generat" />
          </div>
          <div>
            <label className="label">Rezumat</label>
            <textarea name="excerpt" className="input" rows={3} placeholder="1-2 fraze despre știre..." />
          </div>
          <div>
            <label className="label">Conținut</label>
            <textarea name="content" className="input" rows={8} required placeholder="Textul complet al știrii..." />
          </div>
          <ImageUploader 
            fieldName="image" 
            label="Imagine (opțional)"
            onUploaded={handleImageUploaded}
            maxSizeMB={5}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">English</h2>
            <TranslateEnButton />
          </div>
          <div>
            <label className="label">Title (EN)</label>
            <input name="titleEn" className="input" placeholder="Title in English" />
          </div>
          <div>
            <label className="label">Excerpt (EN)</label>
            <textarea name="excerptEn" className="input" rows={3} placeholder="1-2 sentences..." />
          </div>
          <div>
            <label className="label">Content (EN)</label>
            <textarea name="contentEn" className="input" rows={8} placeholder="Full text in English" />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-2">
        <input type="checkbox" name="published" defaultChecked id="published" />
        <label htmlFor="published">Publică imediat</label>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Se publică..." : "Publică știrea"}
      </button>
    </form>
  );
}
