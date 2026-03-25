'use client'

import { animate, useInView, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface StatProps {
  value: number
  suffix: string
  label: string
  prefix?: string
}

export function StatCounter({ value, suffix, label, prefix = '' }: StatProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return

    const controls = animate(motionValue, value, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplay(
          Number.isInteger(value)
            ? Math.round(latest).toLocaleString()
            : latest.toFixed(1).replace(/\.0$/, ''),
        )
      },
    })

    return () => controls.stop()
  }, [isInView, motionValue, value])

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--amber)',
          fontWeight: 600,
          lineHeight: 1.2,
        }}
      >
        {prefix}
        {display}
        {suffix}
      </div>
      <div
        style={{
          color: 'var(--ice-muted)',
          fontSize: 12,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  )
}
