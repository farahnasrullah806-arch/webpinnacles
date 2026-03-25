'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const services = [
  { label: 'Paid Ads', href: '/services/paid-ads' },
  { label: 'Local SEO', href: '/services/local-seo' },
  { label: 'Funnels & CRM', href: '/services/funnels-crm' },
  { label: 'Appointment Setting', href: '/services/appointment-setting' },
  { label: 'Case Studies', href: '/services/case-studies' },
]

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        insetInline: 0,
        top: 0,
        zIndex: 80,
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        background: scrolled ? 'rgba(12,12,16,0.78)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        transition: 'all 220ms ease',
      }}
    >
      <nav className="container-web" style={{ height: 64, display: 'flex', alignItems: 'center' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22 }}>
          Web<span style={{ color: 'var(--amber)' }}>Pinnacles</span>
        </Link>

        <div style={{ marginLeft: 'auto', display: 'none' }} className="desktop-nav">
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              style={{
                color: 'var(--ice-muted)',
                background: 'transparent',
                border: 0,
                cursor: 'pointer',
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Services <span style={{ transform: servicesOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
            </button>

            <AnimatePresence>
              {servicesOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.16 }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    width: 220,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    padding: '8px 0',
                  }}
                >
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      style={{
                        display: 'block',
                        padding: '10px 14px',
                        color: 'var(--ice-muted)',
                        fontSize: 14,
                      }}
                    >
                      {service.label}
                    </Link>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <Link href="/about" className={pathname === '/about' ? 'active-link' : 'nav-link'}>
            About
          </Link>
          <Link href="/blog" className={pathname.startsWith('/blog') ? 'active-link' : 'nav-link'}>
            Blog
          </Link>
          <Link href="/contact" className="btn-primary" style={{ marginLeft: 12, padding: '0.55rem 1rem' }}>
            Book Free Audit
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileOpen((value) => !value)}
          style={{
            marginLeft: 'auto',
            background: 'transparent',
            color: 'var(--ice)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            width: 40,
            height: 40,
            display: 'grid',
            placeItems: 'center',
          }}
          className="mobile-menu-btn"
        >
          ☰
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 64,
              right: 12,
              left: 12,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: 16,
              display: 'grid',
              gap: 10,
            }}
          >
            {services.map((service) => (
              <Link key={service.href} href={service.href} onClick={() => setMobileOpen(false)}>
                {service.label}
              </Link>
            ))}
            <Link href="/about" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)}>
              Blog
            </Link>
            <Link href="/contact" className="btn-primary" onClick={() => setMobileOpen(false)}>
              Book Free Audit
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <style jsx>{`
        .desktop-nav {
          align-items: center;
          gap: 1.3rem;
        }
        .nav-link {
          color: var(--ice-muted);
          font-size: 14px;
        }
        .active-link {
          color: var(--amber);
          font-size: 14px;
        }
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  )
}
