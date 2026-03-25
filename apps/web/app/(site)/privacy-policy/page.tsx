import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schema/common'

export const metadata: Metadata = {
  title: 'Privacy Policy — WebPinnacles',
  description: 'Privacy policy for WebPinnacles.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: { canonical: 'https://webpinnacles.com/privacy-policy/' },
}

const sections = [
  {
    id: 'information-collected',
    title: 'Information Collected',
    body: 'We collect contact details, business context, and usage data necessary to deliver services and respond to requests.',
  },
  {
    id: 'how-we-use-it',
    title: 'How We Use It',
    body: 'Data is used to communicate, improve services, process inquiries, and provide marketing performance support.',
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: 'We use essential and analytics cookies. You can manage cookie preferences through your browser and consent manager.',
  },
  {
    id: 'third-parties',
    title: 'Third Parties',
    body: 'We may use providers such as analytics, CRM, and email delivery services under contractual safeguards.',
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    body: 'Depending on jurisdiction (including GDPR/CCPA), you may request access, correction, deletion, or portability of your data.',
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    body: 'For privacy requests, contact team@webpinnacles.com.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy-policy/' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Privacy Policy — WebPinnacles',
          url: 'https://webpinnacles.com/privacy-policy/',
        }}
      />
      <section className="section-shell">
        <div className="container-web" style={{ display: 'grid', gap: 18, gridTemplateColumns: 'minmax(0, 1fr) minmax(220px, 280px)' }}>
          <article>
            <h1 style={{ marginTop: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
              Privacy Policy — WebPinnacles
            </h1>
            <p style={{ color: 'var(--ice-muted)' }}>Last updated: March 24, 2026</p>
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 style={{ fontFamily: 'var(--font-display)' }}>{section.title}</h2>
                <p style={{ color: 'var(--ice-muted)' }}>{section.body}</p>
              </section>
            ))}
          </article>
          <aside className="card" style={{ padding: 16, position: 'sticky', top: 90, height: 'fit-content' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginTop: 0 }}>On This Page</h2>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {sections.map((section) => (
                <li key={section.id} style={{ marginBottom: 6 }}>
                  <a href={`#${section.id}`} style={{ color: 'var(--ice-muted)' }}>
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  )
}
