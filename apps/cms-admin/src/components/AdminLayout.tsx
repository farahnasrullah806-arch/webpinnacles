import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Pages', to: '/pages' },
  { label: 'Blog', to: '/blog' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Media Library', to: '/media' },
  { label: 'SEO Panel', to: '/seo' },
  { label: 'Scheduler', to: '/scheduler' },
  { label: 'Activity Log', to: '/activity' },
]

export function AdminLayout() {
  const { session, logout } = useAuth()

  return (
    <div className="shell">
      <aside className="sidebar">
        <p style={{ marginTop: 0, marginBottom: 16, fontWeight: 700 }}>
          Web<span style={{ color: 'var(--amber)' }}>Pinnacles</span> CMS
        </p>
        <div style={{ display: 'grid', gap: 4 }}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div style={{ marginTop: 20, fontSize: 12, color: 'var(--muted)' }}>
          <p style={{ margin: 0 }}>
            Signed in as <strong>{session?.user.name ?? 'Unknown'}</strong>
          </p>
          <p style={{ margin: '4px 0 10px' }}>Role: {session?.user.role ?? 'viewer'}</p>
          <button className="btn" type="button" onClick={logout}>
            Sign out
          </button>
        </div>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
