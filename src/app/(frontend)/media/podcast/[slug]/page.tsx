import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArcherDivider } from '@/components/ArcherDivider'

interface Props {
  params: Promise<{ slug: string }>
}

async function getEpisode(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  try {
    const res = await fetch(
      `${baseUrl}/api/podcast-episodes?where[slug][equals]=${slug}&where[status][equals]=published&limit=1`,
      { next: { revalidate: 60 } },
    )
    const data = await res.json()
    return data.docs?.[0] || null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ep = await getEpisode(slug)
  if (!ep) return { title: 'Episode Not Found' }
  return {
    title: ep.seoTitle || ep.title,
    description: ep.seoDescription || '',
    openGraph: { title: ep.title, description: ep.seoDescription || '' },
  }
}

export default async function PodcastEpisodePage({ params }: Props) {
  const { slug } = await params
  const ep = await getEpisode(slug)
  if (!ep) notFound()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-charcoal)', paddingTop: '72px' }}>
      {/* Episode header */}
      <div style={{ background: 'linear-gradient(to bottom, rgba(26,35,126,0.4), transparent)', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            Episode {ep.episodeNumber}
          </div>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--color-pearl)', marginBottom: '1rem' }}>
            {ep.title}
          </h1>
          {ep.audioUrl && (
            <audio controls style={{ width: '100%', maxWidth: '640px', margin: '1.25rem 0', accentColor: '#EEAA00' }}>
              <source src={ep.audioUrl} type="audio/mpeg" />
            </audio>
          )}
          {ep.youtubeUrl && (
            <a href={ep.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'inline-flex', gap: '0.5rem', marginBottom: '1rem' }}>
              ▶ Watch on YouTube
            </a>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        <ArcherDivider label="Transcript" />
        {ep.transcript ? (
          <div
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: '1rem',
              color: 'rgba(245,245,245,0.8)',
              lineHeight: 1.9,
              marginTop: '2rem',
            }}
            dangerouslySetInnerHTML={{ __html: '' }} // Lexical richtext serialization needed — placeholder
          >
            {/* Transcript rendered via richtext serializer */}
          </div>
        ) : (
          <p style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(245,245,245,0.45)', marginTop: '2rem' }}>
            Transcript coming soon.
          </p>
        )}
      </div>
    </div>
  )
}
