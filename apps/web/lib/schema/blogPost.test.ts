import { describe, expect, it } from 'vitest'
import { getBlogPostSchema } from './blogPost'

describe('getBlogPostSchema', () => {
  it('returns BlogPosting schema with expected fields', () => {
    const schema = getBlogPostSchema({
      id: '1',
      slug: 'test-post',
      title: 'Test',
      seoTitle: 'SEO Test',
      metaDescription: 'Description',
      excerpt: 'Excerpt',
      content: {},
      featuredImage: 'https://cdn.webpinnacles.com/x.jpg',
      category: { id: '1', slug: 'paid-ads', name: 'Paid Ads' },
      authorName: 'Author',
      authorSlug: 'author',
      tags: ['a', 'b'],
      readingTime: 5,
      wordCount: 1000,
      focusKeyword: 'keyword',
      canonicalUrl: 'https://webpinnacles.com/blog/test-post/',
      status: 'published',
      publishedAt: '2026-03-24T00:00:00.000Z',
      updatedAt: '2026-03-24T00:00:00.000Z',
      toc: [],
    })

    expect(schema['@type']).toBe('BlogPosting')
    expect(schema.headline).toBe('Test')
    expect(schema.url).toContain('/blog/test-post/')
  })
})
