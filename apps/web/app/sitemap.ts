import type { MetadataRoute } from 'next'
import { getBlogPosts, getServices } from '@/lib/cms'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://webpinnacles.com'
  const [services, posts] = await Promise.all([
    getServices().catch(() => []),
    getBlogPosts({ pageSize: 100, revalidate: 300 }).catch(() => ({ items: [], total: 0 })),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/services/`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/services/case-studies/`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/contact/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/privacy-policy/`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/services/${service.slug}/`,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  const blogRoutes: MetadataRoute.Sitemap = posts.items.map((post) => ({
    url: `${base}/blog/${post.slug}/`,
    changeFrequency: 'weekly',
    priority: 0.75,
    lastModified: new Date(post.updatedAt),
  }))

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes]
}
