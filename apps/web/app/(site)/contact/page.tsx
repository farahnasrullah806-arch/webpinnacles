import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'
import { JsonLd } from '@/components/seo/JsonLd'
import { submitContactForm } from './actions'
import { getBreadcrumbSchema } from '@/lib/schema/common'
import { getLocalBusinessSchema } from '@/lib/schema/organization'

export const metadata: Metadata = {
  title: 'Book Your Free 20-Minute Marketing Audit',
  description:
    'Book a free 20-minute growth audit with WebPinnacles. Get a clear plan for more leads, higher ROAS, and a full appointment calendar.',
  alternates: { canonical: 'https://webpinnacles.com/contact/' },
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={getLocalBusinessSchema()} />
      <JsonLd data={getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact/' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Book Your Free 20-Minute Growth Audit',
          url: 'https://webpinnacles.com/contact/',
        }}
      />
      <section className="section-shell hero-gradient">
        <div className="container-web">
          <h1 style={{ marginTop: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4.6vw,4rem)' }}>
            Book Your Free 20-Minute Growth Audit
          </h1>
          <p style={{ color: 'var(--ice-muted)', maxWidth: 800 }}>
            We’ll review your marketing, find the gaps, and show where your next 100 clients are hiding.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div
          className="container-web"
          style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          <ContactForm action={submitContactForm} />
          <aside className="card" style={{ padding: 20 }}>
            <h2 style={{ marginTop: 0, fontFamily: 'var(--font-display)' }}>What to Expect</h2>
            <ul style={{ color: 'var(--ice-muted)', paddingLeft: 18 }}>
              <li>20-minute discovery call</li>
              <li>Audit of current ads and local SEO presence</li>
              <li>Growth plan within 48 hours</li>
              <li>No pressure sales call</li>
            </ul>
            <h3 style={{ fontFamily: 'var(--font-display)' }}>Contact Direct</h3>
            <p style={{ color: 'var(--ice-muted)', marginBottom: 2 }}>team@webpinnacles.com</p>
            <p style={{ color: 'var(--ice-muted)', marginTop: 0 }}>WhatsApp: +1-000-000-0000</p>
          </aside>
        </div>
      </section>
    </>
  )
}
