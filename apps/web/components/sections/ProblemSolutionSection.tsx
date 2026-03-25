export function ProblemSolutionSection() {
  const problems = [
    'Traffic comes in, but your calendar stays inconsistent.',
    'Attribution is messy, so scaling feels risky.',
    'Sales teams waste time on unqualified leads.',
  ]
  const solutions = [
    'Appointment-first funnel architecture across ads + landing pages.',
    'Unified reporting tied to qualified calls and revenue outcomes.',
    'Qualification and follow-up automation to protect your calendar.',
  ]

  return (
    <section className="section-shell">
      <div
        className="container-web"
        style={{
          display: 'grid',
          gap: 20,
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        <article className="card" style={{ padding: 24 }}>
          <h3 style={{ color: 'var(--error)', marginTop: 0, fontFamily: 'var(--font-display)' }}>The Problem</h3>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--ice-muted)' }}>
            {problems.map((item) => (
              <li key={item} style={{ marginBottom: 8 }}>
                {item}
              </li>
            ))}
          </ul>
        </article>
        <article className="card" style={{ padding: 24 }}>
          <h3 style={{ color: 'var(--success)', marginTop: 0, fontFamily: 'var(--font-display)' }}>Our Approach</h3>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--ice-muted)' }}>
            {solutions.map((item) => (
              <li key={item} style={{ marginBottom: 8 }}>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
