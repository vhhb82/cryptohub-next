export const metadata = { title: 'Contact • CryptoHub' }

export default function ContactEn() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Contact</h1>
      <form action="/api/contact" method="POST" className="space-y-4">
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <div><label className="label">Name</label><input className="input" name="name" required placeholder="Your name" /></div>
        <div><label className="label">Email</label><input className="input" type="email" name="email" required placeholder="you@example.com" /></div>
        <div><label className="label">Subject (optional)</label><input className="input" name="subject" placeholder="What is it about?" /></div>
        <div><label className="label">Message</label><textarea className="input" name="message" required rows={8} placeholder="Write your message..." /></div>
        <button className="btn" type="submit">Send</button>
      </form>
    </div>
  )
}
