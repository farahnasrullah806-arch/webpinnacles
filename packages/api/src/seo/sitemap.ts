import type { FastifyInstance } from 'fastify'

export async function getSitemapUrls(app: FastifyInstance): Promise<string[]> {
  const services = app.ctx.repos.services.list().map((item) => `/services/${item.slug}/`)
  const posts = app.ctx.repos.blog.list({ page: 1, pageSize: 500 }).items.map((item) => `/blog/${item.slug}/`)
  return ['/', '/services/', '/about/', '/blog/', '/contact/', '/privacy-policy/', ...services, ...posts]
}
