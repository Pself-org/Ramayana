import type { Metadata } from 'next'
import Link from 'next/link'
import { Headphones, Play, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Podcast Episodes',
  description:
    'Listen to the Ramayana Odyssey podcast — deep explorations of the greatest epic through audio storytelling.',
}

export const revalidate = 60

async function getPodcasts() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  try {
    const res = await fetch(
      `${baseUrl}/api/podcast-episodes?where[status][equals]=published&sort=-publishedAt&limit=50`,
      { next: { revalidate: 60 } },
    )
    const data = await res.json()
    return data.docs || []
  } catch {
    return []
  }
}

export default async function PodcastPage() {
  const episodes = await getPodcasts()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-charcoal)', paddingTop: '72px' }}>
      {/* Page Header */}
      <div
        style={{
          background: 'linear-gradient(to bottom, rgba(26,35,126,0.5), transparent)',
          padding: '4rem 1.5rem 3rem',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.875rem', background: 'rgba(238,170,0,0.1)', borderRadius: '2rem', fontFamily: 'var(--font-montserrat)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
          <Headphones size={13} /> Podcast
        </div>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-pearl)', marginBottom: '0.875rem' }}>
          Ramayana Odyssey Podcast
        </h1>
        <p style={{ fontFamily: 'var(--font-baskerville)', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(238,170,0,0.8)', maxWidth: '520px', margin: '0 auto' }}>
          &ldquo;Each episode, a new chapter. Each chapter, a lesson for life.&rdquo;
        </p>
      </div>

      {/* Episodes Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        {episodes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎙️</div>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.1rem', color: 'rgba(245,245,245,0.5)' }}>
              Episodes are coming soon. Subscribe to be notified!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {episodes.map((ep: { id: string; episodeNumber?: number; title: string; slug: string; duration?: string; description?: string; audioUrl?: string }) => (
              <div key={ep.id} className="card" style={{ padding: '1.75rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* Episode number */}
                <div style={{ flexShrink: 0, width: '56px', height: '56px', background: 'var(--color-cosmos)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-saffron)' }}>
                  {ep.episodeNumber || '#'}
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-pearl)', marginBottom: '0.375rem' }}>
                    {ep.title}
                  </h2>
                  {ep.duration && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontFamily: 'var(--font-montserrat)', fontSize: '0.78rem', color: 'rgba(238,170,0,0.7)', marginBottom: '0.625rem' }}>
                      <Clock size={13} /> {ep.duration}
                    </div>
                  )}
                  {/* Embedded HTML5 audio player */}
                  {ep.audioUrl && (
                    <audio controls style={{ width: '100%', maxWidth: '480px', marginBottom: '0.875rem', accentColor: '#EEAA00' }}>
                      <source src={ep.audioUrl} type="audio/mpeg" />
                    </audio>
                  )}
                  <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
                    <Link href={`/media/podcast/${ep.slug}`} className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}>
                      <Play size={13} /> Full Episode
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
