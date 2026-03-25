import type { Metadata } from 'next'
import { CTASection } from '@/components/sections/CTASection'
import { JsonLd } from '@/components/seo/JsonLd'
import { getPage } from '@/lib/cms'
import { getBreadcrumbSchema } from '@/lib/schema/common'
import { getOrganizationSchema } from '@/lib/schema/organization'

export const metadata: Metadata = {
  title: 'The Marketing Agency Built for Businesses That Win by Appointments',
  description:
    'WebPinnacles is a results-driven marketing agency specializing in appointment-setting, paid ads, and local SEO for service businesses.',
  alternates: { canonical: 'https://webpinnacles.com/about/' },
}

export default async function AboutPage() {
  const page = await getPage('about')
  const values = ['Results > Reports', 'Clarity > Complexity', 'Revenue > Impressions']

  return (
    <>
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'About', url: '/about/' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About WebPinnacles',
          url: 'https://webpinnacles.com/about/',
        }}
      />
      <section className="section-shell hero-gradient">
        <div className="container-web">
          <h1 style={{ marginTop: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4.6vw,4rem)' }}>
            {page.title}
          </h1>
          <p style={{ color: 'var(--ice-muted)', maxWidth: 820 }}>
            We built WebPinnacles to replace vanity marketing with systems that reliably generate qualified appointments.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-web card" style={{ padding: 24 }}>
          <blockquote style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3vw,2.5rem)' }}>
            “Vanity metrics are not our style.”
          </blockquote>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-web" style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {values.map((value) => (
            <article key={value} className="card" style={{ padding: 20 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 24 }}>{value}</h2>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="container-web card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, fontFamily: 'var(--font-display)' }}>Why WebPinnacles Exists</h2>
          <p style={{ color: 'var(--ice-muted)' }}>
            Service businesses were forced to choose between disconnected specialists and generic agencies. We built one integrated growth team that owns strategy, execution, and accountability.
          </p>
        </div>
      </section>

      <CTASection headline="Ready to Stop Guessing?" primary={{ label: 'Book Free Audit', href: '/contact' }} />
    </>
  )
}
