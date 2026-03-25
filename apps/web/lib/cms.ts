import type { BlogPost, CaseStudy, Faq, Page, ServicePage, Testimonial } from '@webpinnacles/contracts'

const API_URL = process.env.CMS_API_URL ?? 'http://localhost:4000'

type ApiResult<T> =
  | { ok: true; data: T }
  | {
      ok: false
      error: { code: string; message: string; details?: unknown }
    }

async function fetchCms<T>(
  path: string,
  options?: {
    revalidate?: number
    init?: RequestInit
  },
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options?.init,
    next: { revalidate: options?.revalidate ?? 60 },
  })
  if (!response.ok) {
    throw new Error(`CMS request failed: ${response.status} ${path}`)
  }
  const payload = (await response.json()) as ApiResult<T>
  if (!payload.ok) {
    throw new Error(payload.error.message)
  }
  return payload.data
}

export async function getPage(slug: string, revalidate = 60): Promise<Page> {
  return fetchCms<Page>(`/public/pages/${slug}`, { revalidate })
}

export async function getServices(revalidate = 60): Promise<ServicePage[]> {
  return fetchCms<ServicePage[]>('/public/services', { revalidate })
}

export async function getService(slug: string, revalidate = 60): Promise<ServicePage> {
  return fetchCms<ServicePage>(`/public/services/${slug}`, { revalidate })
}

export async function getBlogPosts(params?: {
  category?: string
  page?: number
  pageSize?: number
  revalidate?: number
}): Promise<{ items: BlogPost[]; total: number }> {
  const searchParams = new URLSearchParams()
  if (params?.category) searchParams.set('category', params.category)
  if (params?.page) searchParams.set('page', String(params.page))
  if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize))
  const suffix = searchParams.toString() ? `?${searchParams.toString()}` : ''
  return fetchCms<{ items: BlogPost[]; total: number }>(`/public/blog${suffix}`, {
    revalidate: params?.revalidate ?? 60,
  })
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  return fetchCms<BlogPost>(`/public/blog/${slug}`, { revalidate: 300 })
}

export async function getCaseStudies(revalidate = 60): Promise<CaseStudy[]> {
  return fetchCms<CaseStudy[]>('/public/case-studies', { revalidate })
}

export async function getFaqs(scope?: string): Promise<Faq[]> {
  const suffix = scope ? `?scope=${scope}` : ''
  return fetchCms<Faq[]>(`/public/faqs${suffix}`, { revalidate: 60 })
}

export async function getTestimonials(featured?: boolean): Promise<Testimonial[]> {
  const suffix = featured === undefined ? '' : `?featured=${featured}`
  return fetchCms<Testimonial[]>(`/public/testimonials${suffix}`, { revalidate: 60 })
}

export async function submitContact(payload: Record<string, unknown>) {
  return fetchCms<{ accepted: true }>('/public/contact', {
    revalidate: 0,
    init: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
  })
}
