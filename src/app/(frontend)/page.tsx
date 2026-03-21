import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { BentoWhatsNew } from '@/components/home/BentoWhatsNew'
import { VisionSection } from '@/components/home/VisionSection'
import { JoinMissionSection } from '@/components/home/JoinMissionSection'
import { ArcherDivider } from '@/components/ArcherDivider'

export const metadata: Metadata = {
  title: 'Ramayana Odyssey — Ancient Wisdom for Modern Life',
  description:
    'Bringing the greatest epic into our times. Join us on a journey through the Ramayana across audio, video, and text — a living guide for your daily life.',
  openGraph: {
    title: 'Ramayana Odyssey — Ancient Wisdom for Modern Life',
    description:
      "Rama's Path. Timeless Wisdom. Explore the Ramayana through podcasts, explainer videos, chants, essays, and live classes.",
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

// Revalidate every 60 seconds for near-real-time CMS updates
export const revalidate = 60

async function getLatestContent() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'

  const [podcasts, videos, chants, articles] = await Promise.allSettled([
    fetch(`${baseUrl}/api/podcast-episodes?limit=1&where[status][equals]=published&sort=-publishedAt`, {
      next: { revalidate: 60 },
    })
      .then((r) => r.json())
      .then((d) => d.docs?.[0] || null)
      .catch(() => null),

    fetch(`${baseUrl}/api/explainer-videos?limit=1&where[status][equals]=published&sort=-publishedAt`, {
      next: { revalidate: 60 },
    })
      .then((r) => r.json())
      .then((d) => d.docs?.[0] || null)
      .catch(() => null),

    fetch(`${baseUrl}/api/audio-tracks?limit=1&where[status][equals]=published&where[category][equals]=chant&sort=-publishedAt`, {
      next: { revalidate: 60 },
    })
      .then((r) => r.json())
      .then((d) => d.docs?.[0] || null)
      .catch(() => null),

    fetch(`${baseUrl}/api/articles?limit=1&where[status][equals]=published&sort=-publishedAt`, {
      next: { revalidate: 60 },
    })
      .then((r) => r.json())
      .then((d) => d.docs?.[0] || null)
      .catch(() => null),
  ])

  return {
    latestPodcast: podcasts.status === 'fulfilled' ? podcasts.value : null,
    latestVideo: videos.status === 'fulfilled' ? videos.value : null,
    latestChant: chants.status === 'fulfilled' ? chants.value : null,
    latestArticle: articles.status === 'fulfilled' ? articles.value : null,
  }
}

export default async function HomePage() {
  const { latestPodcast, latestVideo, latestChant, latestArticle } = await getLatestContent()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── What's New Bento Grid ─────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--color-charcoal)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '0.25rem 1rem',
                background: 'rgba(238,170,0,0.1)',
                borderRadius: '2rem',
                fontFamily: 'var(--font-montserrat)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-saffron)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '0.875rem',
              }}
            >
              Latest Content
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-poppins)',
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: 'var(--color-pearl)',
              }}
            >
              What&apos;s New
            </h2>
          </div>
          <BentoWhatsNew
            podcast={latestPodcast}
            video={latestVideo}
            chant={latestChant}
            article={latestArticle}
          />
        </div>
      </section>

      <ArcherDivider />

      {/* ── Vision ───────────────────────────────────────────────── */}
      <VisionSection />

      <ArcherDivider />

      {/* ── Join the Mission ─────────────────────────────────────── */}
      <JoinMissionSection />
    </>
  )
}
