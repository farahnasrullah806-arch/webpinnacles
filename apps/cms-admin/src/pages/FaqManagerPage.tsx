import { useEffect, useState } from 'react'
import type { Faq } from '@webpinnacles/contracts'
import { apiRequest } from '@/lib/api'
import { useAuth } from '@/lib/auth'

export function FaqManagerPage() {
  const { session } = useAuth()
  const [scope, setScope] = useState('homepage')
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!session?.accessToken) return
    apiRequest<Faq[]>(`/admin/faqs?scope=${scope}`, { accessToken: session.accessToken })
      .then(setFaqs)
      .catch((error) => setStatus(error instanceof Error ? error.message : 'Failed to load FAQs'))
  }, [scope, session?.accessToken])

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h1 style={{ margin: 0 }}>FAQ Manager</h1>
      <label>
        Scope
        <input className="input" value={scope} onChange={(event) => setScope(event.target.value)} />
      </label>
      {status ? <p style={{ margin: 0, color: 'var(--muted)' }}>{status}</p> : null}
      <div style={{ display: 'grid', gap: 8 }}>
        {faqs.map((faq) => (
          <article key={faq.id} className="card">
            <p style={{ marginTop: 0, color: 'var(--muted)', fontSize: 12 }}>{faq.scope}</p>
            <h2 style={{ marginTop: 0, fontSize: 18 }}>{faq.question}</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 0 }}>{faq.answer}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
