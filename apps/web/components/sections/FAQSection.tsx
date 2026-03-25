'use client'

import * as Accordion from '@radix-ui/react-accordion'
import type { Faq } from '@webpinnacles/contracts'

interface FAQSectionProps {
  faqs: Faq[]
  heading?: string
}

export function FAQSection({ faqs, heading = 'Frequently Asked Questions' }: FAQSectionProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="section-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container-web">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem,3vw,2.7rem)', marginTop: 0 }}>
          {heading}
        </h2>
        <Accordion.Root type="single" collapsible>
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={faq.id}
              value={`faq-${faq.id}`}
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <Accordion.Trigger
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '18px 0',
                  color: 'var(--ice)',
                  background: 'transparent',
                  border: 0,
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                <span>
                  {String(index + 1).padStart(2, '0')}. {faq.question}
                </span>
                <span style={{ color: 'var(--amber)' }}>+</span>
              </Accordion.Trigger>
              <Accordion.Content>
                <p style={{ marginTop: 0, paddingBottom: 18, color: 'var(--ice-muted)' }}>{faq.answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
