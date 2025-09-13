'use client'
import { useState } from 'react'

export default function AutoTranslateEn({
  fromFields = { title: 'title', excerpt: 'excerpt', content: 'content' },
  toFields = { title: 'titleEn', excerpt: 'excerptEn', content: 'contentEn' },
}: {
  fromFields?: { title: string; excerpt: string; content: string }
  toFields?: { title: string; excerpt: string; content: string }
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [provider, setProvider] = useState<string | null>(null)

  const translate = async (text: string) => {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ text }),
    })
    const data = await res.json()
    if (!data.ok) throw new Error(data.error || 'Translate failed')
    return data.text as string
  }

  const detectProvider = () => {
    const p = process.env.NEXT_PUBLIC_TRANSLATE_PROVIDER || process.env.TRANSLATE_PROVIDER || ''
    return p || 'auto'
  }

  const handle = async () => {
    try {
      setError(null); setLoading(true); setProvider(detectProvider())

      const get = (name: string) => (document.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLTextAreaElement)?.value || ''
      const set = (name: string, value: string) => {
        const el = document.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLTextAreaElement | null
        if (el) el.value = value
      }

      const roTitle = get(fromFields.title)
      const roExcerpt = get(fromFields.excerpt)
      const roContent = get(fromFields.content)

      if (roTitle) set(toFields.title, await translate(roTitle))
      if (roExcerpt) set(toFields.excerpt, await translate(roExcerpt))
      if (roContent) set(toFields.content, await translate(roContent))
    } catch (e: any) {
      setError(e.message || 'Eroare traducere')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button type="button" className="btn" onClick={handle} disabled={loading}>
        {loading ? 'Traduc…' : 'Generează EN automat'}
      </button>
      {provider && <span className="text-xs opacity-60">({provider})</span>}
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  )
}
