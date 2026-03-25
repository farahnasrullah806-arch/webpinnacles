import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArticleContent } from '@/components/blog/ArticleContent'
import { CTASection } from '@/components/sections/CTASection'
import { JsonLd } from '@/components/seo/JsonLd'
import { getBlogPost, getBlogPosts } from '@/lib/cms'
import { getBreadcrumbSchema } from '@/lib/schema/common'
import { getBlogPostSchema } from '@/lib/schema/blogPost'

export const revalidate = 300

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const { items } = await getBlogPosts({ pageSize: 100, revalidate: 300 })
  return items.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug).catch(() => null)
  if (!post) return {}
  return {
    title: post.seoTitle,
    description: post.metaDescription,
    alternates: {
      canonical: post.canonicalUrl ?? `https://webpinnacles.com/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      images: [post.featuredImage],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug).catch(() => null)
  if (!post) notFound()

  const related = (await getBlogPosts({ category: post.category.slug, pageSize: 4, revalidate: 300 })).items
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3)

  return (
    <>
      <JsonLd data={getBlogPostSchema(post)} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog/' },
          { name: post.title, url: `/blog/${post.slug}/` },
        ])}
      />

      <article className="section-shell">
        <div className="container-web" style={{ display: 'grid', gap: 24, gridTemplateColumns: 'minmax(0,1fr) minmax(220px, 300px)' }}>
          <div>
            <p style={{ marginTop: 0, color: 'var(--amber)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {post.category.name}
            </p>
            <h1 style={{ marginTop: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.4rem)' }}>{post.title}</h1>
            <p style={{ color: 'var(--ice-muted)' }}>
              {post.authorName} · {new Date(post.publishedAt).toLocaleDateString()} · {post.readingTime} min read
            </p>
            <div style={{ position: 'relative', minHeight: 330, marginBottom: 24 }}>
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                style={{ objectFit: 'cover', borderRadius: 12 }}
                priority
              />
            </div>
            <ArticleContent post={post} />
          </div>

          <aside>
            <div className="card" style={{ padding: 16, position: 'sticky', top: 90 }}>
              <h2 style={{ marginTop: 0, fontSize: 16, fontFamily: 'var(--font-display)' }}>Table of Contents</h2>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {post.toc.map((item) => (
                  <li key={item.id} style={{ marginBottom: 6 }}>
                    <a href={`#${item.id}`} style={{ color: 'var(--ice-muted)' }}>
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>

      <section className="section-shell" style={{ paddingTop: 0 }}>
        <div className="container-web">
          <h2 style={{ fontFamily: 'var(--font-display)' }}>Related Posts</h2>
          <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {related.map((item) => (
              <article key={item.id} className="card" style={{ padding: 16 }}>
                <p style={{ margin: 0, color: 'var(--ice-muted)', fontSize: 12 }}>{item.category.name}</p>
                <h3>
                  <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                </h3>
                <p style={{ color: 'var(--ice-muted)' }}>{item.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection headline="Need This Implemented in Your Growth Stack?" primary={{ label: 'Book Free Audit', href: '/contact' }} />
    </>
  )
}
