interface ProcessSectionProps {
  heading?: string
  steps: Array<{ step: number; title: string; description: string }>
}

export function ProcessSection({ heading = 'How We Build Your Growth Machine', steps }: ProcessSectionProps) {
  return (
    <section className="section-shell">
      <div className="container-web">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 3vw, 2.8rem)', marginTop: 0 }}>
          {heading}
        </h2>
        <div
          style={{
            display: 'grid',
            gap: 14,
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          }}
        >
          {steps.map((item) => (
            <article key={item.step} className="card" style={{ padding: 20 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--amber)',
                  letterSpacing: '0.08em',
                  fontSize: 12,
                  marginBottom: 8,
                }}
              >
                {String(item.step).padStart(2, '0')}
              </div>
              <h3 style={{ marginTop: 0, fontFamily: 'var(--font-display)' }}>{item.title}</h3>
              <p style={{ marginBottom: 0, color: 'var(--ice-muted)', fontSize: 14 }}>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
