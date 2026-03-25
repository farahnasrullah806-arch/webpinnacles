import { useEffect, useMemo, useState } from 'react'
import type { BlogPost } from '@webpinnacles/contracts'
import { TiptapEditor } from '@/components/TiptapEditor'
import { SeoPanel } from '@/components/SeoPanel'
import { apiRequest } from '@/lib/api'
import { useAuth } from '@/lib/auth'

type BlogListResult = { items: BlogPost[]; total: number }

export function BlogManagerPage() {
  const { session } = useAuth()
  const [items, setItems] = useState<BlogPost[]>([])
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [selected, setSelected] = useState<BlogPost | null>(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!session?.accessToken) return
    apiRequest<BlogListResult>('/admin/blog', { accessToken: session.accessToken })
      .then((result) => {
        setItems(result.items)
        setSelectedSlug(result.items[0]?.slug ?? null)
      })
      .catch((error) => setStatus(error instanceof Error ? error.message : 'Failed to load blog posts'))
  }, [session?.accessToken])

  useEffect(() => {
    if (!session?.accessToken || !selectedSlug) return
    apiRequest<BlogPost>(`/admin/blog/${selectedSlug}`, { accessToken: session.accessToken })
      .then(setSelected)
      .catch((error) => setStatus(error instanceof Error ? error.message : 'Failed to load selected post'))
  }, [selectedSlug, session?.accessToken])

  const seoValue = useMemo(
    () =>
      selected
        ? {
            title: selected.seoTitle,
            description: selected.metaDescription,
            canonicalUrl: selected.canonicalUrl,
            ogImageUrl: selected.featuredImage,
            indexing: 'index' as const,
            schemaMarkup: {},
          }
        : null,
    [selected],
  )

  async function savePost(statusValue: BlogPost['status']) {
    if (!selected || !session?.accessToken) return
    setStatus('Saving...')
    try {
      const next = await apiRequest<BlogPost>(`/admin/blog/${selected.slug}`, {
        method: 'PUT',
        accessToken: session.accessToken,
        body: JSON.stringify({
          ...selected,
          status: statusValue,
          updatedAt: new Date().toISOString(),
        }),
      })
      setSelected(next)
      setStatus(`Saved as ${statusValue}.`)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed')
    }
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h1 style={{ margin: 0 }}>Blog Manager</h1>
      {status ? <p style={{ margin: 0, color: 'var(--muted)' }}>{status}</p> : null}
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '280px minmax(0,1fr) 340px' }}>
        <aside className="card" style={{ maxHeight: 'calc(100vh - 180px)', overflow: 'auto' }}>
          <h2 style={{ marginTop: 0, fontSize: 16 }}>Posts</h2>
          <div style={{ display: 'grid', gap: 6 }}>
            {items.map((item) => (
              <button
                key={item.id}
                className="btn"
                type="button"
                style={{
                  textAlign: 'left',
                  borderColor: selectedSlug === item.slug ? 'var(--amber)' : 'var(--border)',
                }}
                onClick={() => setSelectedSlug(item.slug)}
              >
                <strong>{item.title}</strong>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.status}</div>
              </button>
            ))}
          </div>
        </aside>

        <section style={{ display: 'grid', gap: 12 }}>
          {selected ? (
            <>
              <div className="card" style={{ display: 'grid', gap: 8 }}>
                <label>
                  Title
                  <input
                    className="input"
                    value={selected.title}
                    onChange={(event) => setSelected({ ...selected, title: event.target.value })}
                  />
                </label>
                <label>
                  Excerpt
                  <textarea
                    className="input"
                    rows={3}
                    value={selected.excerpt}
                    onChange={(event) => setSelected({ ...selected, excerpt: event.target.value })}
                  />
                </label>
              </div>
              <TiptapEditor
                value={JSON.stringify(selected.content)}
                onChange={(html) =>
                  setSelected({
                    ...selected,
                    content: {
                      type: 'doc',
                      content: [{ type: 'paragraph', content: [{ type: 'text', text: html }] }],
                    },
                  })
                }
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary" type="button" onClick={() => savePost('draft')}>
                  Save Draft
                </button>
                <button className="btn" type="button" onClick={() => savePost('published')}>
                  Publish
                </button>
              </div>
            </>
          ) : (
            <div className="card">Select a post.</div>
          )}
        </section>

        {seoValue ? (
          <SeoPanel
            value={seoValue}
            onChange={(seo) =>
              setSelected((current) =>
                current
                  ? {
                      ...current,
                      seoTitle: seo.title,
                      metaDescription: seo.description,
                      canonicalUrl: seo.canonicalUrl,
                      featuredImage: seo.ogImageUrl ?? current.featuredImage,
                    }
                  : current,
              )
            }
          />
        ) : null}
      </div>
    </div>
  )
}
