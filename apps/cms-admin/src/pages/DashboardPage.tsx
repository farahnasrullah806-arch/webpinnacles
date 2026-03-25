import { useEffect, useState } from 'react'
import { apiRequest } from '@/lib/api'
import { useAuth } from '@/lib/auth'

interface DashboardData {
  pages: number
  blogPosts: number
  caseStudies: number
  faqs: number
}

export function DashboardPage() {
  const { session } = useAuth()
  const [data, setData] = useState<DashboardData | null>(null)

  useEffect(() => {
    async function load() {
      const [pages, blog, cases, faqs] = await Promise.all([
        apiRequest<any[]>('/public/services'),
        apiRequest<{ items: any[]; total: number }>('/public/blog'),
        apiRequest<any[]>('/public/case-studies'),
        apiRequest<any[]>('/public/faqs'),
      ])
      setData({
        pages: pages.length,
        blogPosts: blog.total,
        caseStudies: cases.length,
        faqs: faqs.length,
      })
    }
    load().catch(() => null)
  }, [session?.accessToken])

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Dashboard</h1>
      <p style={{ color: 'var(--muted)' }}>Overview of content inventory and publish readiness.</p>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <Stat label="Service Pages" value={data?.pages ?? 0} />
        <Stat label="Blog Posts" value={data?.blogPosts ?? 0} />
        <Stat label="Case Studies" value={data?.caseStudies ?? 0} />
        <Stat label="FAQs" value={data?.faqs ?? 0} />
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <article className="card">
      <p style={{ margin: 0, color: 'var(--muted)', fontSize: 12 }}>{label}</p>
      <p style={{ margin: '6px 0 0', fontSize: 28, color: 'var(--amber)', fontWeight: 700 }}>{value}</p>
    </article>
  )
}
