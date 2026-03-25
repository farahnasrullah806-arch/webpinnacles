import { randomUUID } from 'node:crypto'
import type { FastifyInstance } from 'fastify'
import {
  BlogPostSchema,
  CaseStudySchema,
  FaqSchema,
  LoginSchema,
  MediaAssetSchema,
  PageUpsertSchema,
  ServicePageSchema,
  TestimonialSchema,
} from '@webpinnacles/contracts'
import { requireRole } from '../auth/rbac'
import { signAccessToken, signRefreshToken } from '../auth/token'
import type { AccessTokenPayload } from '../auth/types'
import { publishPage, requestGscIndexing, triggerRevalidation } from '../services/publish'
import { fail, ok } from './helpers'

export async function registerAdminRoutes(app: FastifyInstance) {
  app.post('/admin/auth/login', async (req, reply) => {
    const parsed = LoginSchema.safeParse(req.body)
    if (!parsed.success) {
      return reply.code(400).send(fail('INVALID_BODY', 'Invalid login payload', parsed.error.flatten()))
    }

    const user = app.ctx.repos.users.findByEmail(parsed.data.email)
    const validPassword = app.ctx.repos.users.verifyPassword(parsed.data.email, parsed.data.password)

    if (!user || !validPassword || !user.active) {
      return reply.code(401).send(fail('UNAUTHORIZED', 'Invalid credentials'))
    }

    const accessToken = await signAccessToken(app, user)
    const refreshToken = await signRefreshToken(app, user)
    return ok({
      accessToken,
      refreshToken,
      expiresIn: 60 * 15,
      user,
    })
  })

  app.post('/admin/auth/refresh', async (req, reply) => {
    const body = req.body as { refreshToken?: string }
    if (!body.refreshToken) {
      return reply.code(400).send(fail('INVALID_BODY', 'refreshToken is required'))
    }
    try {
      const payload = app.jwt.verify<{ sub: string; type?: string }>(body.refreshToken, {
        secret: app.ctx.env.CMS_JWT_REFRESH_SECRET,
      })
      if (payload.type !== 'refresh') {
        return reply.code(401).send(fail('UNAUTHORIZED', 'Invalid refresh token'))
      }
      const user = app.ctx.repos.users.findById(payload.sub)
      if (!user) return reply.code(401).send(fail('UNAUTHORIZED', 'User not found'))
      return ok({
        accessToken: await signAccessToken(app, user),
      })
    } catch {
      return reply.code(401).send(fail('UNAUTHORIZED', 'Invalid refresh token'))
    }
  })

  app.get('/admin/me', { preHandler: [requireRole('viewer')] }, async (req) => {
    const user = req.user as AccessTokenPayload
    return ok(user)
  })

  app.get('/admin/pages', { preHandler: [requireRole('viewer')] }, async () => {
    return ok(app.ctx.repos.pages.list())
  })

  app.get('/admin/pages/:slug', { preHandler: [requireRole('viewer')] }, async (req, reply) => {
    const slug = (req.params as { slug: string }).slug
    const page = app.ctx.repos.pages.getBySlug(slug)
    if (!page) return reply.code(404).send(fail('NOT_FOUND', `Page "${slug}" not found`))
    return ok(page)
  })

  app.put('/admin/pages/:slug', { preHandler: [requireRole('editor')] }, async (req, reply) => {
    const slug = (req.params as { slug: string }).slug
    const parsed = PageUpsertSchema.safeParse(req.body)
    if (!parsed.success) {
      return reply.code(400).send(fail('INVALID_BODY', 'Invalid page payload', parsed.error.flatten()))
    }
    const page = app.ctx.repos.pages.upsert(slug, parsed.data)
    if (parsed.data.status === 'published') {
      const path = slug === 'home' ? '/' : `/${slug}`
      const canonical = page.seo.canonicalUrl ?? `${app.ctx.env.WEB_BASE_URL}${path}/`
      await publishPage(app, path, canonical)
    }
    return ok(page)
  })

  app.get('/admin/services/:slug', { preHandler: [requireRole('viewer')] }, async (req, reply) => {
    const slug = (req.params as { slug: string }).slug
    const page = app.ctx.repos.services.getBySlug(slug)
    if (!page) return reply.code(404).send(fail('NOT_FOUND', `Service "${slug}" not found`))
    return ok(page)
  })

  app.get('/admin/services', { preHandler: [requireRole('viewer')] }, async () => {
    return ok(app.ctx.repos.services.list())
  })

  app.put('/admin/services/:slug', { preHandler: [requireRole('editor')] }, async (req, reply) => {
    const slug = (req.params as { slug: string }).slug
    const parsed = ServicePageSchema.safeParse(req.body)
    if (!parsed.success) {
      return reply.code(400).send(fail('INVALID_BODY', 'Invalid service payload', parsed.error.flatten()))
    }
    const service = app.ctx.repos.services.upsert(slug, parsed.data)
    await publishPage(
      app,
      `/services/${service.slug}`,
      service.seo.canonicalUrl ?? `${app.ctx.env.WEB_BASE_URL}/services/${service.slug}/`,
    )
    return ok(service)
  })

  app.get('/admin/blog', { preHandler: [requireRole('author')] }, async (req) => {
    const query = req.query as { category?: string; page?: string; pageSize?: string }
    return ok(
      app.ctx.repos.blog.list({
        category: query.category,
        page: query.page ? Number(query.page) : undefined,
        pageSize: query.pageSize ? Number(query.pageSize) : undefined,
      }),
    )
  })

  app.get('/admin/blog/:slug', { preHandler: [requireRole('author')] }, async (req, reply) => {
    const slug = (req.params as { slug: string }).slug
    const post = app.ctx.repos.blog.getBySlug(slug)
    if (!post) return reply.code(404).send(fail('NOT_FOUND', `Blog "${slug}" not found`))
    return ok(post)
  })

  app.put('/admin/blog/:slug', { preHandler: [requireRole('author')] }, async (req, reply) => {
    const slug = (req.params as { slug: string }).slug
    const parsed = BlogPostSchema.safeParse(req.body)
    if (!parsed.success) {
      return reply.code(400).send(fail('INVALID_BODY', 'Invalid blog payload', parsed.error.flatten()))
    }
    const post = app.ctx.repos.blog.upsert(slug, {
      ...parsed.data,
      id: parsed.data.id || randomUUID(),
      slug,
    })
    if (post.status === 'published') {
      await publishPage(
        app,
        `/blog/${post.slug}`,
        post.canonicalUrl ?? `${app.ctx.env.WEB_BASE_URL}/blog/${post.slug}/`,
      )
    }
    return ok(post)
  })

  app.get('/admin/case-studies', { preHandler: [requireRole('author')] }, async () => {
    return ok(app.ctx.repos.caseStudies.list())
  })

  app.put('/admin/case-studies/:slug', { preHandler: [requireRole('author')] }, async (req, reply) => {
    const slug = (req.params as { slug: string }).slug
    const parsed = CaseStudySchema.safeParse(req.body)
    if (!parsed.success) {
      return reply
        .code(400)
        .send(fail('INVALID_BODY', 'Invalid case study payload', parsed.error.flatten()))
    }
    const caseStudy = app.ctx.repos.caseStudies.upsert(slug, parsed.data)
    await publishPage(
      app,
      '/services/case-studies',
      `${app.ctx.env.WEB_BASE_URL}/services/case-studies/`,
    )
    return ok(caseStudy)
  })

  app.get('/admin/faqs', { preHandler: [requireRole('viewer')] }, async (req) => {
    const query = req.query as { scope?: string }
    return ok(app.ctx.repos.faqs.list(query.scope))
  })

  app.put('/admin/faqs/:id', { preHandler: [requireRole('editor')] }, async (req, reply) => {
    const id = (req.params as { id: string }).id
    const parsed = FaqSchema.safeParse(req.body)
    if (!parsed.success) {
      return reply.code(400).send(fail('INVALID_BODY', 'Invalid FAQ payload', parsed.error.flatten()))
    }
    return ok(app.ctx.repos.faqs.upsert(id, parsed.data))
  })

  app.get('/admin/testimonials', { preHandler: [requireRole('viewer')] }, async () => {
    return ok(app.ctx.repos.testimonials.list())
  })

  app.put('/admin/testimonials/:id', { preHandler: [requireRole('editor')] }, async (req, reply) => {
    const id = (req.params as { id: string }).id
    const parsed = TestimonialSchema.safeParse(req.body)
    if (!parsed.success) {
      return reply
        .code(400)
        .send(fail('INVALID_BODY', 'Invalid testimonial payload', parsed.error.flatten()))
    }
    return ok(app.ctx.repos.testimonials.upsert(id, parsed.data))
  })

  app.get('/admin/media', { preHandler: [requireRole('viewer')] }, async () => {
    return ok(app.ctx.repos.media.list())
  })

  app.put('/admin/media/:id', { preHandler: [requireRole('editor')] }, async (req, reply) => {
    const id = (req.params as { id: string }).id
    const parsed = MediaAssetSchema.safeParse(req.body)
    if (!parsed.success) {
      return reply.code(400).send(fail('INVALID_BODY', 'Invalid media payload', parsed.error.flatten()))
    }
    return ok(app.ctx.repos.media.upsert(id, parsed.data))
  })

  app.get('/admin/activity', { preHandler: [requireRole('viewer')] }, async () => {
    return ok([
      {
        timestamp: new Date().toISOString(),
        actor: 'system',
        action: 'Activity logging scaffold initialized',
      },
    ])
  })

  app.post('/admin/revalidate', { preHandler: [requireRole('editor')] }, async (req, reply) => {
    const body = req.body as { path?: string }
    if (!body.path) return reply.code(400).send(fail('INVALID_BODY', 'path is required'))
    await triggerRevalidation(app, body.path)
    return ok({ revalidated: true, path: body.path })
  })

  app.post('/admin/seo/request-indexing', { preHandler: [requireRole('editor')] }, async (req, reply) => {
    const body = req.body as { url?: string }
    if (!body.url) return reply.code(400).send(fail('INVALID_BODY', 'url is required'))
    await requestGscIndexing(app, body.url)
    return ok({ requested: true, url: body.url })
  })

  app.post('/admin/schedule', { preHandler: [requireRole('editor')] }, async (req, reply) => {
    const body = req.body as { path?: string; canonicalUrl?: string; publishAt?: string }
    if (!body.path || !body.canonicalUrl || !body.publishAt) {
      return reply
        .code(400)
        .send(fail('INVALID_BODY', 'path, canonicalUrl, and publishAt are required'))
    }
    await app.ctx.adapters.queue.enqueue('scheduled-publish', {
      path: body.path,
      canonicalUrl: body.canonicalUrl,
      publishAt: body.publishAt,
    })
    return ok({ scheduled: true, ...body })
  })
}
