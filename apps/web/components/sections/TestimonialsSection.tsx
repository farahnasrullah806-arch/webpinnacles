import type { Testimonial } from '@webpinnacles/contracts'

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="section-shell">
      <div className="container-web">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 3vw, 2.8rem)', marginTop: 0 }}>
          Client Results and Reviews
        </h2>
        <div
          style={{
            display: 'grid',
            gap: 14,
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          }}
        >
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="card" style={{ padding: 20 }}>
              <div style={{ color: 'var(--amber)' }}>{'★'.repeat(testimonial.rating)}</div>
              <p style={{ color: 'var(--ice-muted)' }}>{testimonial.quote}</p>
              <p style={{ marginBottom: 0 }}>
                <strong>{testimonial.clientName}</strong> · {testimonial.businessName}
              </p>
              <span style={{ color: 'var(--success)', fontSize: 12, fontWeight: 700 }}>
                {testimonial.resultMetric}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
