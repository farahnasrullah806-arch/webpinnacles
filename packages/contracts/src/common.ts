import { z } from 'zod'

export const ServiceSlugSchema = z.enum([
  'paid-ads',
  'local-seo',
  'funnels-crm',
  'appointment-setting',
])

export const PageTypeSchema = z.enum([
  'homepage',
  'service',
  'services-hub',
  'about',
  'blog',
  'blog-post',
  'case-studies',
  'contact',
  'privacy-policy',
])

export const IndexingModeSchema = z.enum(['index', 'noindex', 'nofollow'])
export const PublishStatusSchema = z.enum(['draft', 'review', 'published', 'archived'])
export const RoleSchema = z.enum(['admin', 'editor', 'author', 'viewer'])

export const SectionTypeSchema = z.enum([
  'hero',
  'stats',
  'services',
  'problem-solution',
  'marquee',
  'process',
  'testimonials',
  'faq',
  'cta',
  'text',
  'image',
  'comparison-table',
  'industry-grid',
  'case-preview',
])

export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
})

export const ApiResultSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.discriminatedUnion('ok', [
    z.object({
      ok: z.literal(true),
      data: dataSchema,
    }),
    z.object({
      ok: z.literal(false),
      error: ApiErrorSchema,
    }),
  ])

export type ServiceSlug = z.infer<typeof ServiceSlugSchema>
export type PageType = z.infer<typeof PageTypeSchema>
export type IndexingMode = z.infer<typeof IndexingModeSchema>
export type PublishStatus = z.infer<typeof PublishStatusSchema>
export type Role = z.infer<typeof RoleSchema>
export type SectionType = z.infer<typeof SectionTypeSchema>
export type ApiResult<T> =
  | { ok: true; data: T }
  | {
      ok: false
      error: {
        code: string
        message: string
        details?: unknown
      }
    }
