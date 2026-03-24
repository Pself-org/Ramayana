import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArcherDivider } from '@/components/ArcherDivider'
import { getDb } from '@/db'
import { podcastEpisodes as podcastEpisodesTable } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

interface Props {
  params: Promise<{ slug: string }>
}

async function getEpisode(slug: string) {
  try {
    const db = await getDb()
    const rows = await db.select()
      .from(podcastEpisodesTable)
      .where(
        and(
          eq(podcastEpisodesTable.slug, slug),
          eq(podcastEpisodesTable.status, 'published')
        )
      )
      .limit(1)
    
    return rows[0] || null
  } catch (error) {
    console.error('⚠️ Could not fetch episode detail (Database unavailable during build):', error)
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
      <div style={{ background: 'linear-gradient(to bottom, rgba(26,35,126,0.4), transparent)', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            Episode {ep.id}
          </div>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--color-pearl)', marginBottom: '1rem' }}>
            {ep.title}
          </h1>
          {ep.audioUrl && (
            <audio controls style={{ width: '100%', maxWidth: '640px', margin: '1.25rem 0', accentColor: '#EEAA00' }}>
              <source src={ep.audioUrl} type="audio/mpeg" />
            </audio>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        <ArcherDivider label="Description" />
        <div
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: '1rem',
            color: 'rgba(245,245,245,0.8)',
            lineHeight: 1.9,
            marginTop: '2rem',
          }}
        >
          {ep.description || 'No description available.'}
        </div>
      </div>
    </div>
  )
}
