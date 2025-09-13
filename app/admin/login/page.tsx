import ImageUpload from "@/components/admin/ImageUpload";
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret })
      })

      if (response.ok) {
        router.push('/admin')
      } else {
        setError('Secret incorect')
      }
    } catch (err) {
      setError('Eroare la autentificare')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Secret Admin</label>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="input"
              required
              placeholder="Introdu secretul admin"
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-full">
            Autentificare
          </button>
        </form>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>Secret implicit: admin123</p>
        </div>
      </div>
    </div>
  )
}

