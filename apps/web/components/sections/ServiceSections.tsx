import type { ServicePage } from '@webpinnacles/contracts'
import { CTASection } from './CTASection'
import { FAQSection } from './FAQSection'
import { ProcessSection } from './ProcessSection'

export function ServiceHero({ service }: { service: ServicePage }) {
  return (
    <section className="section-shell hero-gradient">
      <div className="container-web">
        <p
          className="badge-amber"
          style={{
            display: 'inline-flex',
            borderRadius: 999,
            padding: '6px 12px',
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          {service.resultBadge}
        </p>
        <h1 style={{ marginTop: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}>
          {service.title}
        </h1>
        <p style={{ color: 'var(--ice-muted)', maxWidth: 780 }}>{service.subtitle}</p>
      </div>
    </section>
  )
}

export function ServiceWhatWhy({ service }: { service: ServicePage }) {
  return (
    <section className="section-shell">
      <div
        className="container-web"
        style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
      >
        <article className="card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, fontFamily: 'var(--font-display)' }}>What is this service?</h2>
          <p style={{ color: 'var(--ice-muted)', marginBottom: 0 }}>{service.whatWhy.what}</p>
        </article>
        <article className="card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, fontFamily: 'var(--font-display)' }}>Why it matters</h2>
          <p style={{ color: 'var(--ice-muted)', marginBottom: 0 }}>{service.whatWhy.why}</p>
        </article>
      </div>
    </section>
  )
}

export function ServiceFeatures({ service }: { service: ServicePage }) {
  return (
    <section className="section-shell">
      <div className="container-web">
        <h2 style={{ marginTop: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 3vw, 2.6rem)' }}>
          What We Do
        </h2>
        <div
          style={{
            display: 'grid',
            gap: 14,
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          }}
        >
          {service.features.map((feature) => (
            <article key={feature.title} className="card" style={{ padding: 16 }}>
              <div style={{ fontSize: 20 }}>{feature.icon}</div>
              <h3 style={{ marginBottom: 6 }}>{feature.title}</h3>
              <p style={{ margin: 0, color: 'var(--ice-muted)', fontSize: 14 }}>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServiceCaseStudy({ service }: { service: ServicePage }) {
  return (
    <section className="section-shell">
      <div className="container-web card" style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0, fontFamily: 'var(--font-display)' }}>Proof</h2>
        <h3 style={{ marginBottom: 4 }}>{service.caseStudy.name}</h3>
        <p style={{ color: 'var(--ice-muted)', marginTop: 0 }}>{service.caseStudy.industry}</p>
        <p style={{ color: 'var(--ice-muted)' }}>
          <strong>Before:</strong> {service.caseStudy.before}
        </p>
        <p style={{ color: 'var(--ice-muted)' }}>
          <strong>After:</strong> {service.caseStudy.after}
        </p>
        <p style={{ marginBottom: 0, color: 'var(--ice-muted)' }}>{service.caseStudy.summary}</p>
      </div>
    </section>
  )
}

export function ServicePageSections({ service }: { service: ServicePage }) {
  return (
    <>
      <ServiceHero service={service} />
      <ServiceWhatWhy service={service} />
      <ServiceFeatures service={service} />
      <ProcessSection heading="Our Process" steps={service.process} />
      <ServiceCaseStudy service={service} />
      <FAQSection faqs={service.faqs} heading="Service FAQs" />
      <CTASection
        headline={service.cta.headline}
        primary={{ label: service.cta.primaryCtaLabel, href: service.cta.primaryCtaHref }}
        secondary={
          service.cta.secondaryCtaLabel && service.cta.secondaryCtaHref
            ? { label: service.cta.secondaryCtaLabel, href: service.cta.secondaryCtaHref }
            : undefined
        }
      />
    </>
  )
}
