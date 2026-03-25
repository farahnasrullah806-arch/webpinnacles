import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const pages = pgTable('pages', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  slug: text('slug').unique().notNull(),
  pageType: text('page_type').notNull(),
  title: text('title').notNull(),
  seoTitle: text('seo_title'),
  metaDescription: text('meta_description'),
  ogImageUrl: text('og_image_url'),
  canonicalUrl: text('canonical_url'),
  indexing: text('indexing').default('index').notNull(),
  schemaMarkup: jsonb('schema_markup'),
  status: text('status').default('draft').notNull(),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const contentSections = pgTable('content_sections', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  pageId: uuid('page_id').notNull(),
  type: text('type').notNull(),
  order: integer('order').notNull(),
  props: jsonb('props').notNull(),
  visible: boolean('visible').default(true).notNull(),
})

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  slug: text('slug').unique().notNull(),
  name: text('name').notNull(),
})

export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').default('viewer').notNull(),
  active: boolean('active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  seoTitle: text('seo_title'),
  metaDescription: text('meta_description'),
  content: jsonb('content').notNull(),
  excerpt: text('excerpt'),
  featuredImage: text('featured_image'),
  categoryId: uuid('category_id').notNull(),
  authorId: uuid('author_id').notNull(),
  tags: text('tags').array().notNull(),
  readingTime: integer('reading_time').notNull(),
  wordCount: integer('word_count').notNull(),
  toc: jsonb('toc').notNull(),
  focusKeyword: text('focus_keyword'),
  canonicalUrl: text('canonical_url'),
  indexedInGsc: boolean('indexed_in_gsc').default(false).notNull(),
  status: text('status').default('draft').notNull(),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const faqs = pgTable('faqs', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  pageId: uuid('page_id'),
  scope: text('scope').default('global').notNull(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  order: integer('order').default(0).notNull(),
})

export const testimonials = pgTable('testimonials', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  clientName: text('client_name').notNull(),
  businessName: text('business_name').notNull(),
  industry: text('industry').notNull(),
  quote: text('quote').notNull(),
  resultMetric: text('result_metric').notNull(),
  rating: integer('rating').notNull(),
  avatarUrl: text('avatar_url'),
  service: text('service').notNull(),
  featured: boolean('featured').default(false).notNull(),
})

export const caseStudies = pgTable('case_studies', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  industry: text('industry').notNull(),
  challenge: text('challenge').notNull(),
  resultSummary: text('result_summary').notNull(),
  metrics: jsonb('metrics').notNull(),
  servicesUsed: text('services_used').array().notNull(),
  featured: boolean('featured').default(false).notNull(),
  publishedAt: timestamp('published_at', { withTimezone: true }),
})

export const media = pgTable('media', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  filename: text('filename').notNull(),
  r2Key: text('r2_key').notNull(),
  cdnUrl: text('cdn_url').notNull(),
  mimeType: text('mime_type').notNull(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  altText: text('alt_text').default('').notNull(),
  uploadedBy: uuid('uploaded_by').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const auditLog = pgTable('audit_log', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  actorUserId: uuid('actor_user_id').notNull(),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id').notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})
