import type { FastifyInstance } from 'fastify'
import { fail, ok } from './helpers'
import { handleContactSubmission } from '../services/contact'

export async function registerPublicRoutes(app: FastifyInstance) {
  app.get('/public/pages/:slug', async (req, reply) => {
    const slug = (req.params as { slug: string }).slug
    const page = app.ctx.repos.pages.getBySlug(slug)
    if (!page) return reply.code(404).send(fail('NOT_FOUND', `Page "${slug}" not found`))
    return ok(page)
  })

  app.get('/public/services', async () => {
    return ok(app.ctx.repos.services.list())
  })

  app.get('/public/services/:slug', async (req, reply) => {
    const slug = (req.params as { slug: string }).slug
    const service = app.ctx.repos.services.getBySlug(slug)
    if (!service) {
      return reply.code(404).send(fail('NOT_FOUND', `Service "${slug}" not found`))
    }
    return ok(service)
  })

  app.get('/public/blog', async (req) => {
    const query = req.query as {
      category?: string
      page?: string
      pageSize?: string
    }
    const result = app.ctx.repos.blog.list({
      category: query.category,
      page: query.page ? Number(query.page) : undefined,
      pageSize: query.pageSize ? Number(query.pageSize) : undefined,
    })
    return ok(result)
  })

  app.get('/public/blog/:slug', async (req, reply) => {
    const slug = (req.params as { slug: string }).slug
    const post = app.ctx.repos.blog.getBySlug(slug)
    if (!post) return reply.code(404).send(fail('NOT_FOUND', `Blog post "${slug}" not found`))
    return ok(post)
  })

  app.get('/public/case-studies', async () => {
    return ok(app.ctx.repos.caseStudies.list())
  })

  app.get('/public/faqs', async (req) => {
    const query = req.query as { scope?: string }
    return ok(app.ctx.repos.faqs.list(query.scope))
  })

  app.get('/public/testimonials', async (req) => {
    const query = req.query as { featured?: string }
    return ok(
      app.ctx.repos.testimonials.list(
        query.featured ? query.featured === 'true' : undefined,
      ),
    )
  })

  app.post('/public/contact', async (req, reply) => {
    const ip =
      (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ??
      req.ip ??
      'unknown'
    try {
      const result = await handleContactSubmission(app, ip, req.body)
      return ok(result)
    } catch (error) {
      if (error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED') {
        return reply.code(429).send(fail('RATE_LIMIT', 'Too many submissions, please try later.'))
      }
      return reply.code(400).send(fail('INVALID_BODY', 'Invalid contact payload'))
    }
  })
}
