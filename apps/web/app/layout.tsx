import type { Metadata } from 'next'
import { DM_Mono, Fraunces, Space_Grotesk } from 'next/font/google'
import type { ReactNode } from 'react'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://webpinnacles.com'),
  title: {
    default: 'WebPinnacles',
    template: '%s | WebPinnacles',
  },
  description:
    'Appointment-driven growth agency for service businesses using paid ads, local SEO, and conversion systems.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${spaceGrotesk.variable} ${dmMono.variable}`}>
        <Navigation />
        <main style={{ paddingTop: 64 }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
