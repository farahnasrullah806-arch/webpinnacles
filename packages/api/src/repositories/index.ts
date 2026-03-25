import type {
  BlogPost,
  CaseStudy,
  Faq,
  MediaAsset,
  Page,
  PageUpsert,
  ServicePage,
  Testimonial,
  User,
} from '@webpinnacles/contracts'
import { randomUUID } from 'node:crypto'
import {
  seedBlogPosts,
  seedCaseStudies,
  seedFaqs,
  seedPages,
  seedServicePages,
  seedTestimonials,
  seedUsers,
} from '../db/seeds'

interface ListBlogOptions {
  category?: string
  page?: number
  pageSize?: number
}

function nowIso() {
  return new Date().toISOString()
}

class PageRepository {
  private readonly pages = new Map<string, Page>(seedPages.map((page) => [page.slug, page]))

  list(): Page[] {
    return [...this.pages.values()]
  }

  getBySlug(slug: string): Page | null {
    return this.pages.get(slug) ?? null
  }

  upsert(slug: string, input: PageUpsert): Page {
    const existing = this.pages.get(slug)
    const page: Page = {
      id: existing?.id ?? randomUUID(),
      slug,
      pageType: existing?.pageType ?? 'homepage',
      title: input.title,
      seo: input.seo,
      sections: input.sections,
      status: input.status,
      publishedAt: input.status === 'published' ? existing?.publishedAt ?? nowIso() : null,
      updatedAt: nowIso(),
    }
    this.pages.set(slug, page)
    return page
  }
}

class ServiceRepository {
  private readonly services = new Map<string, ServicePage>(
    seedServicePages.map((service) => [service.slug, service]),
  )

  list(): ServicePage[] {
    return [...this.services.values()]
  }

  getBySlug(slug: string): ServicePage | null {
    return this.services.get(slug) ?? null
  }

  upsert(slug: string, value: ServicePage): ServicePage {
    this.services.set(slug, { ...value, slug: value.slug || (slug as ServicePage['slug']) })
    return this.services.get(slug) as ServicePage
  }
}

class BlogRepository {
  private readonly posts = new Map<string, BlogPost>(seedBlogPosts.map((post) => [post.slug, post]))

  list(options?: ListBlogOptions): { items: BlogPost[]; total: number } {
    const page = options?.page ?? 1
    const pageSize = options?.pageSize ?? 9
    const category = options?.category

    let items = [...this.posts.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    if (category && category !== 'all') {
      items = items.filter((post) => post.category.slug === category)
    }
    const total = items.length
    const start = (page - 1) * pageSize
    return {
      items: items.slice(start, start + pageSize),
      total,
    }
  }

  getBySlug(slug: string): BlogPost | null {
    return this.posts.get(slug) ?? null
  }

  upsert(slug: string, value: BlogPost): BlogPost {
    this.posts.set(slug, { ...value, slug, updatedAt: nowIso() })
    return this.posts.get(slug) as BlogPost
  }
}

class CaseStudyRepository {
  private readonly items = new Map<string, CaseStudy>(
    seedCaseStudies.map((caseStudy) => [caseStudy.slug, caseStudy]),
  )

  list(): CaseStudy[] {
    return [...this.items.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  }

  upsert(slug: string, value: CaseStudy): CaseStudy {
    this.items.set(slug, { ...value, slug })
    return this.items.get(slug) as CaseStudy
  }
}

class FaqRepository {
  private readonly faqs = new Map<string, Faq>(seedFaqs.map((faq) => [faq.id, faq]))

  list(scope?: string): Faq[] {
    return [...this.faqs.values()]
      .filter((faq) => (scope ? faq.scope === scope : true))
      .sort((a, b) => a.order - b.order)
  }

  upsert(id: string, value: Faq): Faq {
    this.faqs.set(id, value)
    return value
  }
}

class TestimonialRepository {
  private readonly testimonials = new Map<string, Testimonial>(
    seedTestimonials.map((testimonial) => [testimonial.id, testimonial]),
  )

  list(featured?: boolean): Testimonial[] {
    return [...this.testimonials.values()].filter((item) =>
      featured === undefined ? true : item.featured === featured,
    )
  }

  upsert(id: string, value: Testimonial): Testimonial {
    this.testimonials.set(id, value)
    return value
  }
}

class MediaRepository {
  private readonly assets = new Map<string, MediaAsset>()

  list(): MediaAsset[] {
    return [...this.assets.values()]
  }

  upsert(id: string, value: MediaAsset): MediaAsset {
    this.assets.set(id, value)
    return value
  }
}

class UserRepository {
  private readonly users = new Map<string, User>(seedUsers.map((user) => [user.id, user]))
  private readonly plainPasswords = new Map<string, string>([
    ['admin@webpinnacles.com', 'Admin!234'],
    ['editor@webpinnacles.com', 'Editor!234'],
  ])

  findByEmail(email: string): User | null {
    return [...this.users.values()].find((user) => user.email === email) ?? null
  }

  findById(id: string): User | null {
    return this.users.get(id) ?? null
  }

  verifyPassword(email: string, password: string): boolean {
    return this.plainPasswords.get(email) === password
  }
}

export interface Repositories {
  pages: PageRepository
  services: ServiceRepository
  blog: BlogRepository
  caseStudies: CaseStudyRepository
  faqs: FaqRepository
  testimonials: TestimonialRepository
  media: MediaRepository
  users: UserRepository
}

export function buildRepositories(): Repositories {
  return {
    pages: new PageRepository(),
    services: new ServiceRepository(),
    blog: new BlogRepository(),
    caseStudies: new CaseStudyRepository(),
    faqs: new FaqRepository(),
    testimonials: new TestimonialRepository(),
    media: new MediaRepository(),
    users: new UserRepository(),
  }
}
