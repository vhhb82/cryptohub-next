'use client'
export default function DeleteButton({
  action, label = 'Șterge',
}: { action: string; label?: string }) {
  return (
    <form action={action} method="POST" onSubmit={(e) => {
      if (!confirm('Sigur vrei să ștergi? Operația nu poate fi anulată.')) {
        e.preventDefault();
      }
    }} className="inline">
      <input type="hidden" name="_method" value="DELETE" />
      <button type="submit" className="btn text-red-600 border-red-200 hover:shadow">
        {label}
      </button>
    </form>
  )
}
