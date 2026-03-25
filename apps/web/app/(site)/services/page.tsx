import type { Metadata } from 'next'
import { CTASection } from '@/components/sections/CTASection'
import { JsonLd } from '@/components/seo/JsonLd'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { getCaseStudies, getServices } from '@/lib/cms'
import { getBreadcrumbSchema } from '@/lib/schema/common'

export const metadata: Metadata = {
  title: 'Digital Marketing Services for Service-Based Businesses',
  description:
    'One agency. Every channel that converts: paid ads, local SEO, funnels & CRM, and appointment setting.',
  alternates: { canonical: 'https://webpinnacles.com/services/' },
}

export default async function ServicesHubPage() {
  const [services, caseStudies] = await Promise.all([getServices(), getCaseStudies()])
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        url: `https://webpinnacles.com/services/${service.slug}/`,
      },
    })),
  }

  return (
    <>
      <JsonLd data={getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services/' }])} />
      <JsonLd data={itemListSchema} />
      <section className="section-shell hero-gradient">
        <div className="container-web">
          <p
            className="badge-amber"
            style={{ display: 'inline-flex', borderRadius: 999, padding: '6px 12px', fontSize: 11, fontWeight: 700 }}
          >
            Everything You Need to Scale
          </p>
          <h1 style={{ marginTop: 10, marginBottom: 8, fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.6vw, 4rem)' }}>
            One Agency. Every Channel That Converts.
          </h1>
          <p style={{ color: 'var(--ice-muted)', maxWidth: 780 }}>
            We combine paid acquisition, local search, CRM automation, and appointment-setting into one integrated growth engine.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-web" style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              icon="⚡"
              title={service.title}
              description={service.subtitle}
              forWho={['Medical', 'Real Estate', 'Fitness', 'Home Services']}
              outcomes={[service.resultBadge]}
              href={`/services/${service.slug}`}
            />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="container-web card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, fontFamily: 'var(--font-display)' }}>Case Study Preview</h2>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {caseStudies.slice(0, 2).map((caseStudy) => (
              <article key={caseStudy.id} className="card" style={{ padding: 16 }}>
                <p style={{ margin: '0 0 4px', color: 'var(--ice-muted)', fontSize: 12 }}>{caseStudy.industry}</p>
                <h3 style={{ marginTop: 0 }}>{caseStudy.title}</h3>
                <p style={{ marginBottom: 0, color: 'var(--ice-muted)' }}>{caseStudy.resultSummary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Need a Unified Growth System Instead of Fragmented Vendors?"
        primary={{ label: 'Book Free Audit', href: '/contact' }}
        secondary={{ label: 'See Case Studies', href: '/services/case-studies' }}
      />
    </>
  )
}
