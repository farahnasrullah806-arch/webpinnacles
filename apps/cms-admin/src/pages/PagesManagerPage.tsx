import { useEffect, useMemo, useState } from 'react'
import type { Page } from '@webpinnacles/contracts'
import { PageBuilder } from '@/components/PageBuilder'
import { SeoPanel } from '@/components/SeoPanel'
import { apiRequest } from '@/lib/api'
import { useAuth } from '@/lib/auth'

const editableSlugs = [
  { label: 'Homepage', slug: 'home' },
  { label: 'Services Hub', slug: 'services' },
  { label: 'About', slug: 'about' },
  { label: 'Contact', slug: 'contact' },
  { label: 'Privacy Policy', slug: 'privacy-policy' },
]

export function PagesManagerPage() {
  const { session } = useAuth()
  const [slug, setSlug] = useState('home')
  const [page, setPage] = useState<Page | null>(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!session?.accessToken) return
    apiRequest<Page>(`/admin/pages/${slug}`, { accessToken: session.accessToken })
      .then(setPage)
      .catch((error) => setStatus(error instanceof Error ? error.message : 'Failed to load page'))
  }, [slug, session?.accessToken])

  const canEditSeo = useMemo(
    () => session?.user.role === 'admin' || session?.user.role === 'editor',
    [session?.user.role],
  )

  async function savePage(next: Page) {
    if (!session?.accessToken) return
    setStatus('Saving...')
    try {
      await apiRequest<Page>(`/admin/pages/${next.slug}`, {
        method: 'PUT',
        accessToken: session.accessToken,
        body: JSON.stringify({
          title: next.title,
          seo: next.seo,
          sections: next.sections,
          status: next.status,
        }),
      })
      setStatus('Saved.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed')
    }
  }

  if (!page) {
    return (
      <div>
        <h1 style={{ marginTop: 0 }}>Pages Manager</h1>
        <p style={{ color: 'var(--muted)' }}>{status || 'Loading page...'}</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <h1 style={{ margin: 0 }}>Pages Manager</h1>
        <select className="input" value={slug} onChange={(event) => setSlug(event.target.value)} style={{ width: 220 }}>
          {editableSlugs.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.label}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" type="button" onClick={() => savePage(page)}>
          Save Draft
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => savePage({ ...page, status: 'published', publishedAt: new Date().toISOString() })}
        >
          Publish
        </button>
        {status ? <span style={{ color: 'var(--muted)', fontSize: 13 }}>{status}</span> : null}
      </div>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 360px)' }}>
        <PageBuilder sections={page.sections} onChange={(sections) => setPage({ ...page, sections })} />
        {canEditSeo ? <SeoPanel value={page.seo} onChange={(seo) => setPage({ ...page, seo })} /> : null}
      </div>
    </div>
  )
}
