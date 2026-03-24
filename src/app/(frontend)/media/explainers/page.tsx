import type { Metadata } from 'next'
import { Play, Video } from 'lucide-react'
import { getDb } from '@/db'
import { explainerVideos as explainerVideosTable } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export const metadata: Metadata = {
  title: 'Explainer Videos',
  description: 'Visual guides to the complex concepts of the Ramayana.',
}

export const revalidate = 60

async function getVideos() {
  try {
    const db = await getDb()
    return await db.select()
      .from(explainerVideosTable)
      .where(eq(explainerVideosTable.status, 'published'))
      .orderBy(desc(explainerVideosTable.publishedAt))
      .limit(50)
  } catch (error) {
    console.error('⚠️ Could not fetch videos (Database unavailable during build):', error)
    return []
  }
}

export default async function ExplainersPage() {
  const videos = await getVideos()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-charcoal)', paddingTop: '72px' }}>
      <div
        style={{
          background: 'linear-gradient(to bottom, rgba(74,20,140,0.3), transparent)',
          padding: '4rem 1.5rem 3rem',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.875rem', background: 'rgba(238,170,0,0.1)', borderRadius: '2rem', fontFamily: 'var(--font-montserrat)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
          <Video size={13} /> Visual Guides
        </div>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-pearl)', marginBottom: '0.875rem' }}>
          Explainer Videos
        </h1>
        <p style={{ fontFamily: 'var(--font-baskerville)', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(238,170,0,0.8)', maxWidth: '520px', margin: '0 auto' }}>
          Watch and learn about the profound philosophy of the Ramayana through bite-sized visual explanations.
        </p>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        {videos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📺</div>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.1rem', color: 'rgba(245,245,245,0.5)' }}>
              Explainer videos are coming soon. Subscribe to stay updated!
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
            {videos.map((vid) => (
              <div key={vid.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
                  {vid.youtubeId && (
                    <iframe
                      src={`https://www.youtube.com/embed/${vid.youtubeId}`}
                      title={vid.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-pearl)', marginBottom: '0.75rem' }}>
                    {vid.title}
                  </h2>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.875rem', color: 'rgba(245,245,245,0.6)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {vid.description}
                  </p>
                  <a href={vid.videoUrl || '#'} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}>
                    <Play size={13} /> View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
