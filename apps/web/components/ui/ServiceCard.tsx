'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  forWho: string[]
  outcomes: string[]
  href: string
}

export function ServiceCard({ icon, title, description, outcomes, href, forWho }: ServiceCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="card"
      style={{
        position: 'relative',
        padding: 24,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: -20,
          top: -20,
          width: 88,
          height: 88,
          borderRadius: '50%',
          background: 'rgba(245, 166, 35, 0.08)',
          filter: 'blur(24px)',
        }}
      />

      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          border: '1px solid rgba(245,166,35,0.2)',
          background: 'rgba(245,166,35,0.08)',
          display: 'grid',
          placeItems: 'center',
          fontSize: 20,
          marginBottom: 18,
        }}
      >
        {icon}
      </div>

      <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontSize: 24 }}>{title}</h3>
      <p style={{ margin: 0, color: 'var(--ice-muted)', fontSize: 14 }}>{description}</p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {outcomes.map((outcome) => (
          <span
            key={outcome}
            style={{
              background: 'rgba(24,201,122,0.14)',
              border: '1px solid rgba(24,201,122,0.28)',
              color: 'var(--success)',
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              padding: '3px 8px',
            }}
          >
            {outcome}
          </span>
        ))}
      </div>

      <p style={{ margin: '12px 0 0', color: 'var(--ice-muted)', fontSize: 13 }}>
        For: {forWho.join(' • ')}
      </p>

      <Link href={href} style={{ marginTop: 16, display: 'inline-flex', color: 'var(--amber)', fontWeight: 700 }}>
        Learn More →
      </Link>
    </motion.article>
  )
}
