import { z } from 'zod'
import {
  IndexingModeSchema,
  PageTypeSchema,
  PublishStatusSchema,
  SectionTypeSchema,
  ServiceSlugSchema,
} from './common'

export const SeoSchema = z.object({
  title: z.string().min(1).max(60),
  description: z.string().min(1).max(160),
  canonicalUrl: z.string().url().optional(),
  ogImageUrl: z.string().url().optional(),
  indexing: IndexingModeSchema.default('index'),
  schemaMarkup: z.record(z.any()).optional(),
})

export const ContentSectionSchema = z.object({
  id: z.string().uuid().optional(),
  type: SectionTypeSchema,
  order: z.number().int().nonnegative(),
  visible: z.boolean().default(true),
  props: z.record(z.any()),
})

export const PageSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  pageType: PageTypeSchema,
  title: z.string().min(1),
  seo: SeoSchema,
  sections: z.array(ContentSectionSchema).default([]),
  status: PublishStatusSchema.default('draft'),
  publishedAt: z.string().datetime().nullable(),
  updatedAt: z.string().datetime(),
})

export const PageUpsertSchema = z.object({
  title: z.string().min(1),
  seo: SeoSchema,
  sections: z.array(ContentSectionSchema),
  status: PublishStatusSchema,
})

export const FaqSchema = z.object({
  id: z.string().uuid(),
  pageId: z.string().uuid().nullable(),
  scope: z.string().default('global'),
  question: z.string().min(1),
  answer: z.string().min(1),
  order: z.number().int().nonnegative(),
})

export const TestimonialSchema = z.object({
  id: z.string().uuid(),
  clientName: z.string().min(1),
  businessName: z.string().min(1),
  industry: z.string().min(1),
  quote: z.string().min(1),
  resultMetric: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  avatarUrl: z.string().url().optional(),
  service: ServiceSlugSchema,
  featured: z.boolean(),
})

export const ServicePageSchema = z.object({
  slug: ServiceSlugSchema,
  title: z.string().min(1),
  subtitle: z.string().min(1),
  resultBadge: z.string().min(1),
  seo: SeoSchema,
  whatWhy: z.object({
    what: z.string().min(1),
    why: z.string().min(1),
  }),
  features: z.array(
    z.object({
      icon: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
    }),
  ),
  process: z.array(
    z.object({
      step: z.number().int().positive(),
      title: z.string().min(1),
      description: z.string().min(1),
    }),
  ),
  caseStudy: z.object({
    name: z.string().min(1),
    industry: z.string().min(1),
    before: z.string().min(1),
    after: z.string().min(1),
    summary: z.string().min(1),
  }),
  faqs: z.array(FaqSchema),
  cta: z.object({
    headline: z.string().min(1),
    primaryCtaLabel: z.string().min(1),
    primaryCtaHref: z.string().min(1),
    secondaryCtaLabel: z.string().min(1).optional(),
    secondaryCtaHref: z.string().min(1).optional(),
  }),
})

export const CategorySchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  name: z.string().min(1),
})

export const BlogPostSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  seoTitle: z.string().max(60),
  metaDescription: z.string().max(160),
  excerpt: z.string().min(1),
  content: z.record(z.any()),
  featuredImage: z.string().url(),
  category: CategorySchema,
  authorName: z.string().min(1),
  authorSlug: z.string().min(1),
  tags: z.array(z.string()),
  readingTime: z.number().int().positive(),
  wordCount: z.number().int().positive(),
  focusKeyword: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
  status: PublishStatusSchema,
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  toc: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      level: z.number().int().min(2).max(4),
    }),
  ),
})

export const CaseStudySchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  industry: z.string().min(1),
  challenge: z.string().min(1),
  resultSummary: z.string().min(1),
  metrics: z.array(
    z.object({
      label: z.string().min(1),
      value: z.string().min(1),
    }),
  ),
  servicesUsed: z.array(ServiceSlugSchema),
  featured: z.boolean(),
  publishedAt: z.string().datetime(),
})

export const MediaAssetSchema = z.object({
  id: z.string().uuid(),
  filename: z.string().min(1),
  r2Key: z.string().min(1),
  cdnUrl: z.string().url(),
  mimeType: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  altText: z.string().default(''),
  uploadedBy: z.string().uuid(),
  createdAt: z.string().datetime(),
})

export type Seo = z.infer<typeof SeoSchema>
export type ContentSection = z.infer<typeof ContentSectionSchema>
export type Page = z.infer<typeof PageSchema>
export type PageUpsert = z.infer<typeof PageUpsertSchema>
export type Faq = z.infer<typeof FaqSchema>
export type Testimonial = z.infer<typeof TestimonialSchema>
export type ServicePage = z.infer<typeof ServicePageSchema>
export type Category = z.infer<typeof CategorySchema>
export type BlogPost = z.infer<typeof BlogPostSchema>
export type CaseStudy = z.infer<typeof CaseStudySchema>
export type MediaAsset = z.infer<typeof MediaAssetSchema>
