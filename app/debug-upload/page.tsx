"use client";

import { useState } from "react";

export default function DebugUpload() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setResult("Se încarcă...");

    try {
      // Test direct upload la Cloudinary
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", "cryptohub_unsigned");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dopyxebpu/image/upload",
        { method: "POST", body: fd }
      );

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Upload eșuat (${res.status}). ${txt}`);
      }

      const data = await res.json();
      setResult(`✅ SUCCESS: ${data.secure_url}`);
      
      // Test form data
      const testForm = new FormData();
      testForm.append("title", "Test Știre");
      testForm.append("content", "Conținut test");
      testForm.append("image", data.secure_url);
      
      setFormData(testForm);
      
    } catch (err: any) {
      setResult(`❌ ERROR: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testFormSubmit = async () => {
    if (!formData) return;
    
    console.log('Testing form data:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        body: formData,
      });
      
      const result = await res.json();
      console.log('API Response:', result);
      setResult(prev => prev + `\n\nAPI Test: ${res.ok ? 'SUCCESS' : 'FAILED'} - ${JSON.stringify(result)}`);
    } catch (err: any) {
      console.error('API Error:', err);
      setResult(prev => prev + `\n\nAPI Test: ERROR - ${err.message}`);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Debug Upload</h1>
      
      <div className="space-y-6">
        <div className="card">
          <h2 className="font-semibold mb-4">1. Test Upload Direct</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg
                       file:border-0 file:text-sm file:font-semibold file:bg-indigo-50
                       file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
          />
        </div>

        {formData && (
          <div className="card">
            <h2 className="font-semibold mb-4">2. Test Form Submit</h2>
            <button 
              onClick={testFormSubmit}
              className="btn btn-primary"
            >
              Testează Submit la API
            </button>
          </div>
        )}
        
        {result && (
          <div className="card">
            <h2 className="font-semibold mb-4">Rezultat:</h2>
            <pre className="text-sm bg-gray-100 p-3 rounded whitespace-pre-wrap">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
