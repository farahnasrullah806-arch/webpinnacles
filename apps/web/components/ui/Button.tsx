import Link from 'next/link'
import type { CSSProperties, ComponentProps } from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  href: string
  variant?: Variant
  size?: Size
}

const sizeStyles: Record<Size, CSSProperties> = {
  sm: { height: 32, paddingInline: 12, fontSize: 13 },
  md: { height: 44, paddingInline: 18, fontSize: 14 },
  lg: { height: 56, paddingInline: 24, fontSize: 16 },
}

export function ButtonLink({ href, variant = 'primary', size = 'md', className, ...props }: ButtonLinkProps) {
  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 10,
    fontWeight: 700,
    border: '1px solid transparent',
    transition: 'all 180ms ease',
  }

  const variantStyle: Record<Variant, CSSProperties> = {
    primary: { background: 'var(--amber)', color: 'var(--ink)' },
    secondary: { borderColor: 'var(--amber)', color: 'var(--amber)' },
    ghost: { color: 'var(--amber)' },
  }

  return (
    <Link
      href={href}
      className={clsx(className)}
      style={{ ...baseStyle, ...variantStyle[variant], ...sizeStyles[size] }}
      {...props}
    />
  )
}
