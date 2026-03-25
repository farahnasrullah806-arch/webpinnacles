import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { getBlogPosts } from '@/lib/cms'
import { getBreadcrumbSchema } from '@/lib/schema/common'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Marketing Insights for Service Business Growth',
  description:
    'Actionable paid ads, local SEO, funnels, and appointment growth strategies for service businesses.',
  alternates: { canonical: 'https://webpinnacles.com/blog/' },
}

interface BlogIndexProps {
  searchParams?: {
    category?: string
    page?: string
  }
}

export default async function BlogIndexPage({ searchParams }: BlogIndexProps) {
  const category = searchParams?.category
  const page = searchParams?.page ? Number(searchParams.page) : 1
  const { items, total } = await getBlogPosts({ category, page, pageSize: 9, revalidate: 60 })
  const featured = items[0]
  const list = items.slice(1)

  return (
    <>
      <JsonLd data={getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog/' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'WebPinnacles Blog',
          url: 'https://webpinnacles.com/blog/',
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: items.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Article',
              name: post.title,
              url: `https://webpinnacles.com/blog/${post.slug}/`,
            },
          })),
        }}
      />
      <section className="section-shell hero-gradient">
        <div className="container-web">
          <h1 style={{ marginTop: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4.6vw,4rem)' }}>
            Marketing Insights for Service Business Growth
          </h1>
        </div>
      </section>

      {featured ? (
        <section className="section-shell">
          <div className="container-web card" style={{ padding: 24, display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div style={{ position: 'relative', minHeight: 220 }}>
              <Image
                src={featured.featuredImage}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', borderRadius: 12 }}
                priority
              />
            </div>
            <div>
              <span className="badge-amber" style={{ borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>
                {featured.category.name}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p style={{ color: 'var(--ice-muted)' }}>{featured.excerpt}</p>
              <p style={{ color: 'var(--ice-muted)', fontSize: 12 }}>
                {new Date(featured.publishedAt).toLocaleDateString()} · {featured.readingTime} min read
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-shell">
        <div className="container-web" style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {list.map((post) => (
            <article key={post.id} className="card" style={{ padding: 18 }}>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--amber)' }}>{post.category.name}</p>
              <h3 style={{ marginTop: 8 }}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p style={{ color: 'var(--ice-muted)' }}>{post.excerpt}</p>
              <p style={{ marginBottom: 0, fontSize: 12, color: 'var(--ice-muted)' }}>
                {new Date(post.publishedAt).toLocaleDateString()} · {post.readingTime} min
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell" style={{ paddingTop: 0 }}>
        <div className="container-web">
          <p style={{ color: 'var(--ice-muted)' }}>Showing {items.length} of {total} posts.</p>
        </div>
      </section>
    </>
  )
}
