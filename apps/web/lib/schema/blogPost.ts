import type { BlogPost } from '@webpinnacles/contracts'
import type { BlogPosting } from 'schema-dts'

export function getBlogPostSchema(post: BlogPost): BlogPosting {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    url: `https://webpinnacles.com/blog/${post.slug}/`,
    image: post.featuredImage,
    author: {
      '@type': 'Person',
      name: post.authorName,
      url: `https://webpinnacles.com/team/${post.authorSlug}/`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'WebPinnacles',
      logo: {
        '@type': 'ImageObject',
        url: 'https://webpinnacles.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://webpinnacles.com/blog/${post.slug}/`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category.name,
    wordCount: post.wordCount,
  }
}
