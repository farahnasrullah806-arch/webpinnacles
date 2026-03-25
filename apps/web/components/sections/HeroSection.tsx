'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

interface HeroSectionProps {
  eyebrow: string
  headline: string
  highlightedWord?: string
  subhead: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export function HeroSection({
  eyebrow,
  headline,
  highlightedWord,
  subhead,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  const hasHighlight = Boolean(highlightedWord && headline.includes(highlightedWord))
  const [beforeHighlight, afterHighlight] = hasHighlight
    ? headline.split(highlightedWord as string)
    : [headline, '']

  return (
    <section
      className="hero-gradient"
      style={{
        minHeight: '92vh',
        display: 'grid',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-web" style={{ paddingBlock: 'clamp(5.5rem, 10vw, 8rem)' }}>
        <motion.div variants={stagger} initial="hidden" animate="show" style={{ maxWidth: 860 }}>
          <motion.div variants={fadeUp} style={{ marginBottom: 22 }}>
            <span
              className="badge-amber"
              style={{
                display: 'inline-flex',
                gap: 8,
                alignItems: 'center',
                borderRadius: 999,
                padding: '8px 14px',
                fontSize: 11,
                letterSpacing: '0.11em',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              <span style={{ width: 7, height: 7, background: 'var(--amber)', borderRadius: '50%' }} />
              {eyebrow}
            </span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            style={{
              marginTop: 0,
              marginBottom: 16,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}
          >
            {beforeHighlight}
            {hasHighlight ? <span style={{ color: 'var(--amber)' }}>{highlightedWord}</span> : null}
            {afterHighlight}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            style={{ color: 'var(--ice-muted)', fontSize: 18, maxWidth: 700, marginTop: 0 }}
          >
            {subhead}
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href={primaryCta.href} className="btn-primary">
              {primaryCta.label} <span>→</span>
            </Link>
            <Link href={secondaryCta.href} className="btn-secondary">
              {secondaryCta.label} <span>↗</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
