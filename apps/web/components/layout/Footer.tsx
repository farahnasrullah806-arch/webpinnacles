import Link from 'next/link'

const links = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
]

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: 64 }}>
      <div
        className="container-web"
        style={{ paddingBlock: 32, display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}
      >
        <div>
          <strong style={{ fontFamily: 'var(--font-display)' }}>
            Web<span style={{ color: 'var(--amber)' }}>Pinnacles</span>
          </strong>
          <p style={{ margin: 0, color: 'var(--ice-muted)', fontSize: 13 }}>
            Appointment-driven growth systems for service businesses.
          </p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} style={{ color: 'var(--ice-muted)', fontSize: 14 }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
