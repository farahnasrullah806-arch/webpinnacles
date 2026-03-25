import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ServiceSlug } from '@webpinnacles/contracts'
import { JsonLd } from '@/components/seo/JsonLd'
import { ServicePageSections } from '@/components/sections/ServiceSections'
import { getService } from '@/lib/cms'
import { getBreadcrumbSchema, getServiceSchema } from '@/lib/schema/common'

const serviceSlugs: ServiceSlug[] = ['paid-ads', 'local-seo', 'funnels-crm', 'appointment-setting']

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }))
}

interface ServicePageParams {
  params: { slug: string }
}

export async function generateMetadata({ params }: ServicePageParams): Promise<Metadata> {
  const isValid = serviceSlugs.includes(params.slug as ServiceSlug)
  if (!isValid) return {}

  const service = await getService(params.slug, 60)
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: {
      canonical: service.seo.canonicalUrl ?? `https://webpinnacles.com/services/${params.slug}/`,
    },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      images: service.seo.ogImageUrl ? [service.seo.ogImageUrl] : [],
    },
  }
}

export default async function ServicePage({ params }: ServicePageParams) {
  if (!serviceSlugs.includes(params.slug as ServiceSlug)) {
    notFound()
  }

  const service = await getService(params.slug, 60)
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: service.title, url: `/services/${params.slug}/` },
        ])}
      />
      <JsonLd
        data={getServiceSchema({
          name: service.title,
          description: service.subtitle,
          url: service.seo.canonicalUrl ?? `https://webpinnacles.com/services/${params.slug}/`,
        })}
      />
      <ServicePageSections service={service} />
    </>
  )
}
