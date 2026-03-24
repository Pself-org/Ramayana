import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { BentoWhatsNew } from '@/components/home/BentoWhatsNew'
import { VisionSection } from '@/components/home/VisionSection'
import { JoinMissionSection } from '@/components/home/JoinMissionSection'
import { ArcherDivider } from '@/components/ArcherDivider'
import { getDb } from '@/db'
import { podcastEpisodes as podcastEpisodesTable, explainerVideos as explainerVideosTable, audioTracks as audioTracksTable, articles as articlesTable } from '@/db/schema'
import { eq, desc, and } from 'drizzle-orm'

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

// Revalidate every 60 seconds
export const revalidate = 60

async function getLatestContent() {
  try {
    const db = await getDb()

    const [podcast, video, chant, article] = await Promise.all([
      db.select()
        .from(podcastEpisodesTable)
        .where(eq(podcastEpisodesTable.status, 'published'))
        .orderBy(desc(podcastEpisodesTable.publishedAt))
        .limit(1)
        .then(rows => rows[0] || null),
      
      db.select()
        .from(explainerVideosTable)
        .where(eq(explainerVideosTable.status, 'published'))
        .orderBy(desc(explainerVideosTable.publishedAt))
        .limit(1)
        .then(rows => rows[0] || null),
      
      db.select()
        .from(audioTracksTable)
        .where(
          and(
            eq(audioTracksTable.status, 'published'),
            eq(audioTracksTable.category, 'chant')
          )
        )
        .orderBy(desc(audioTracksTable.publishedAt))
        .limit(1)
        .then(rows => rows[0] || null),
      
      db.select()
        .from(articlesTable)
        .where(eq(articlesTable.status, 'published'))
        .orderBy(desc(articlesTable.publishedAt))
        .limit(1)
        .then(rows => rows[0] || null),
    ])

    return {
      latestPodcast: podcast,
      latestVideo: video,
      latestChant: chant,
      latestArticle: article,
    }
  } catch (error) {
    console.error('⚠️ Could not fetch latest content (Database may be unavailable during build):', error)
    return {
      latestPodcast: null,
      latestVideo: null,
      latestChant: null,
      latestArticle: null,
    }
  }
}

export default async function HomePage() {
  const { latestPodcast, latestVideo, latestChant, latestArticle } = await getLatestContent()

  return (
    <>
      <HeroSection />
      <section style={{ padding: '5rem 1.5rem', background: 'var(--color-charcoal)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-block', padding: '0.25rem 1rem', background: 'rgba(238,170,0,0.1)', borderRadius: '2rem', fontFamily: 'var(--font-montserrat)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.875rem' }}>
              Latest Content
            </div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-pearl)' }}>
              What&apos;s New
            </h2>
          </div>
          <BentoWhatsNew
            podcast={latestPodcast as any}
            video={latestVideo as any}
            chant={latestChant as any}
            article={latestArticle as any}
          />
        </div>
      </section>
      <ArcherDivider />
      <VisionSection />
      <ArcherDivider />
      <JoinMissionSection />
    </>
  )
}
