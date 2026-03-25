const wins = [
  'Roofing Co. → 340% leads',
  'Dental Clinic → 180% inquiries',
  'Fitness Studio → 2.4x booked calls',
  'Real Estate Team → 4.1x ROAS',
  'HVAC Company → 61% lower CPL',
]

export function MarqueeSection() {
  const doubled = [...wins, ...wins]
  return (
    <section style={{ overflow: 'hidden', borderBlock: '1px solid var(--border)', paddingBlock: 14 }}>
      <div className="marquee-track">
        {doubled.map((win, index) => (
          <span
            key={`${win}-${index}`}
            style={{
              marginInline: 20,
              color: 'var(--ice-muted)',
              fontSize: 14,
              whiteSpace: 'nowrap',
            }}
          >
            {win}
          </span>
        ))}
      </div>
    </section>
  )
}
