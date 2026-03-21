import type { Metadata } from 'next'
import { Poppins, Montserrat, Libre_Baskerville } from 'next/font/google'
import '../globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-baskerville',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ramayanaodyssey.com'),
  title: {
    default: 'Ramayana Odyssey — Ancient Wisdom for Modern Life',
    template: '%s | Ramayana Odyssey',
  },
  description:
    'Bringing the greatest epic into our times. Explore the Ramayana through podcasts, explainer videos, chants, essays, and live classes.',
  keywords: [
    'Ramayana',
    'Valmiki',
    'Ancient wisdom',
    'Hindu epic',
    'Dharma',
    'Lord Rama',
    'Sanskrit',
    'Vedic',
    'Podcast',
    'Meditation',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Ramayana Odyssey',
    title: 'Ramayana Odyssey — Ancient Wisdom for Modern Life',
    description:
      "Rama's Path. Timeless Wisdom. Multi-format content platform exploring the Ramayana across audio, video, and text.",
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Ramayana Odyssey — Ancient Wisdom for Modern Life',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ramayana Odyssey',
    description: 'Ancient Wisdom for Modern Life',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable} ${libreBaskerville.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
