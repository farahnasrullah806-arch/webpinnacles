import type { Metadata } from 'next'
import { CTASection } from '@/components/sections/CTASection'
import { JsonLd } from '@/components/seo/JsonLd'
import { getCaseStudies } from '@/lib/cms'
import { getBreadcrumbSchema } from '@/lib/schema/common'

export const metadata: Metadata = {
  title: 'Case Studies: Paid Ads, SEO & Funnel Results',
  description:
    'See how WebPinnacles helped service businesses increase leads by 340%, improve ROAS, and fill their appointment calendars.',
  alternates: { canonical: 'https://webpinnacles.com/services/case-studies/' },
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()
  const featured = caseStudies.find((item) => item.featured) ?? caseStudies[0]
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: caseStudies.map((caseStudy, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        name: caseStudy.title,
        about: caseStudy.servicesUsed.join(', '),
        result: caseStudy.resultSummary,
      },
    })),
  }

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Case Studies', url: '/services/case-studies/' },
        ])}
      />
      <JsonLd data={itemListSchema} />
      <section className="section-shell hero-gradient">
        <div className="container-web">
          <h1 style={{ marginTop: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.6vw, 4rem)' }}>
            Real Results for Real Service Businesses
          </h1>
          <p style={{ color: 'var(--ice-muted)', maxWidth: 800 }}>
            No cherry-picked vanity numbers. We measure outcomes by qualified appointments, show rates, and revenue.
          </p>
        </div>
      </section>

      {featured ? (
        <section className="section-shell">
          <div className="container-web card" style={{ padding: 24 }}>
            <p style={{ margin: 0, color: 'var(--amber)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Featured
            </p>
            <h2 style={{ marginTop: 4, fontFamily: 'var(--font-display)' }}>{featured.title}</h2>
            <p style={{ color: 'var(--ice-muted)' }}>{featured.resultSummary}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {featured.metrics.map((metric) => (
                <div key={metric.label} className="card" style={{ padding: 12, minWidth: 120 }}>
                  <div style={{ color: 'var(--amber)', fontFamily: 'var(--font-mono)' }}>{metric.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--ice-muted)' }}>{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-shell">
        <div className="container-web" style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {caseStudies.map((item) => (
            <article key={item.id} className="card" style={{ padding: 18 }}>
              <p style={{ margin: 0, color: 'var(--ice-muted)', fontSize: 12 }}>{item.industry}</p>
              <h3 style={{ marginTop: 6 }}>{item.title}</h3>
              <p style={{ color: 'var(--ice-muted)', marginBottom: 8 }}>{item.resultSummary}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {item.servicesUsed.map((service) => (
                  <span key={service} className="badge-amber" style={{ borderRadius: 999, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                    {service}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        headline="Want Results Like These in Your Pipeline?"
        primary={{ label: 'Book Free Audit', href: '/contact' }}
      />
    </>
  )
}
