import { ButtonLink } from '@/components/ui/Button'

interface CTASectionProps {
  headline: string
  trustLine?: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}

export function CTASection({ headline, trustLine, primary, secondary }: CTASectionProps) {
  return (
    <section className="section-shell">
      <div
        className="container-web card"
        style={{
          padding: 'clamp(1.4rem,3.4vw,3rem)',
          background:
            'radial-gradient(circle at 80% 20%, rgba(245,166,35,0.2), transparent 35%), var(--surface)',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', marginTop: 0 }}>
          {headline}
        </h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
          {secondary ? (
            <ButtonLink href={secondary.href} variant="secondary">
              {secondary.label}
            </ButtonLink>
          ) : null}
        </div>
        {trustLine ? <p style={{ marginBottom: 0, color: 'var(--ice-muted)', marginTop: 12 }}>{trustLine}</p> : null}
      </div>
    </section>
  )
}
