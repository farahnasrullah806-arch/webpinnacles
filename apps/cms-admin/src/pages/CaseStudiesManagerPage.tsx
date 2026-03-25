import { useEffect, useState } from 'react'
import type { CaseStudy } from '@webpinnacles/contracts'
import { apiRequest } from '@/lib/api'
import { useAuth } from '@/lib/auth'

export function CaseStudiesManagerPage() {
  const { session } = useAuth()
  const [items, setItems] = useState<CaseStudy[]>([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!session?.accessToken) return
    apiRequest<CaseStudy[]>('/admin/case-studies', { accessToken: session.accessToken })
      .then(setItems)
      .catch((error) => setStatus(error instanceof Error ? error.message : 'Failed to load case studies'))
  }, [session?.accessToken])

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Case Studies Manager</h1>
      {status ? <p style={{ color: 'var(--muted)' }}>{status}</p> : null}
      <div style={{ display: 'grid', gap: 10 }}>
        {items.map((item) => (
          <article key={item.id} className="card">
            <h2 style={{ marginTop: 0, fontSize: 18 }}>{item.title}</h2>
            <p style={{ color: 'var(--muted)' }}>{item.resultSummary}</p>
            <button className="btn" type="button">
              Edit Case Study
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}
