import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsStrip } from '@/components/sections/StatsStrip'
import { ServicesGridSection } from '@/components/sections/ServicesGridSection'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'
import { MarqueeSection } from '@/components/sections/MarqueeSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'
import { JsonLd } from '@/components/seo/JsonLd'
import { getFaqs, getPage, getServices, getTestimonials } from '@/lib/cms'
import { getBreadcrumbSchema } from '@/lib/schema/common'
import { getLocalBusinessSchema, getOrganizationSchema } from '@/lib/schema/organization'

export const metadata: Metadata = {
  title: 'Marketing Agency for Service Businesses | WebPinnacles',
  description:
    'We help service-based businesses book more appointments with Paid Ads, Local SEO, and high-converting funnels. Book your free 20-min growth audit.',
  alternates: {
    canonical: 'https://webpinnacles.com/',
  },
}

const fallbackSteps = [
  { step: 1, title: 'Discovery', description: 'We audit your acquisition stack and appointment economics.' },
  { step: 2, title: 'Strategy', description: 'We prioritize channels with the strongest expected ROI.' },
  { step: 3, title: 'Launch', description: 'We deploy campaigns, funnels, and tracking with QA.' },
  { step: 4, title: 'Optimize', description: 'We improve booked-call quality and revenue outcomes weekly.' },
]

function getSectionProps<T>(sections: Array<{ type: string; props: unknown }>, type: string): T | null {
  const section = sections.find((item) => item.type === type)
  return (section?.props as T) ?? null
}

export default async function HomePage() {
  const [homepage, services, homepageFaqs, testimonials] = await Promise.all([
    getPage('home'),
    getServices(),
    getFaqs('homepage'),
    getTestimonials(true),
  ])

  const hero = getSectionProps<{
    eyebrow: string
    headline: string
    subhead: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
  }>(homepage.sections, 'hero')

  const stats = getSectionProps<{
    items: Array<{ value: number; suffix: string; label: string; prefix?: string }>
  }>(homepage.sections, 'stats')

  return (
    <>
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getLocalBusinessSchema()} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Digital Marketing Agency for Service Businesses | WebPinnacles',
          url: 'https://webpinnacles.com/',
        }}
      />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', url: '/' },
        ])}
      />

      <HeroSection
        eyebrow={hero?.eyebrow ?? 'Appointment-Driven Growth Agency'}
        headline={hero?.headline ?? 'We Make Every Dollar Work Overtime'}
        highlightedWord="Dollar Work"
        subhead={
          hero?.subhead ??
          'Paid ads, local SEO, and high-converting funnels built specifically for service businesses.'
        }
        primaryCta={hero?.primaryCta ?? { label: 'Book Free Audit', href: '/contact' }}
        secondaryCta={hero?.secondaryCta ?? { label: 'See Results', href: '/services/case-studies' }}
      />
      <StatsStrip items={stats?.items ?? []} />
      <ServicesGridSection services={services} />
      <ProblemSolutionSection />
      <MarqueeSection />
      <ProcessSection steps={fallbackSteps} />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={homepageFaqs} />
      <CTASection
        headline="Your Next 100 Booked Appointments Start Here"
        trustLine="No contract. No fluff. Just results."
        primary={{ label: 'Book Audit', href: '/contact' }}
        secondary={{ label: 'Download Case Study', href: '/services/case-studies' }}
      />
    </>
  )
}
