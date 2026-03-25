import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section-shell">
      <div className="container-web card" style={{ padding: 24 }}>
        <h1 style={{ marginTop: 0, fontFamily: 'var(--font-display)' }}>Page Not Found</h1>
        <p style={{ color: 'var(--ice-muted)' }}>The page you are looking for does not exist.</p>
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </section>
  )
}
