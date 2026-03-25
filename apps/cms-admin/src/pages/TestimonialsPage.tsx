import { useEffect, useState } from 'react'
import type { Testimonial } from '@webpinnacles/contracts'
import { apiRequest } from '@/lib/api'

export function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])

  useEffect(() => {
    apiRequest<Testimonial[]>('/public/testimonials?featured=true')
      .then(setItems)
      .catch(() => null)
  }, [])

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Testimonials</h1>
      <div style={{ display: 'grid', gap: 10 }}>
        {items.map((item) => (
          <article key={item.id} className="card">
            <h2 style={{ marginTop: 0, fontSize: 17 }}>{item.clientName}</h2>
            <p style={{ color: 'var(--muted)' }}>{item.quote}</p>
            <p style={{ marginBottom: 0, color: 'var(--amber)' }}>{item.resultMetric}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
