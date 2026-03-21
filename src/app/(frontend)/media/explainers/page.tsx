import type { Metadata } from 'next'
import { Play } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Explainer Videos',
  description: 'Watch Ramayana Odyssey explainer videos — visual breakdowns of key events, characters, and wisdom from the epic.',
}

export const revalidate = 60

async function getVideos() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  try {
    const res = await fetch(
      `${baseUrl}/api/explainer-videos?where[status][equals]=published&sort=-publishedAt&limit=50`,
      { next: { revalidate: 60 } },
    )
    const data = await res.json()
    return data.docs || []
  } catch {
    return []
  }
}

export default async function ExplainersPage() {
  const videos = await getVideos()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-charcoal)', paddingTop: '72px' }}>
      <div style={{ background: 'linear-gradient(to bottom, rgba(26,35,126,0.5), transparent)', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.875rem', background: 'rgba(238,170,0,0.1)', borderRadius: '2rem', fontFamily: 'var(--font-montserrat)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
          <Play size={13} /> Explainers
        </div>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-pearl)', marginBottom: '0.875rem' }}>
          Explainer Videos
        </h1>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1rem', color: 'rgba(245,245,245,0.7)', maxWidth: '480px', margin: '0 auto' }}>
          Visual guides to understanding the Ramayana — characters, events, and wisdom explained clearly.
        </p>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        {videos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📺</div>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.1rem', color: 'rgba(245,245,245,0.5)' }}>Videos are in production. Stay tuned!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {videos.map((v: { id: string; title: string; youtubeId: string }) => (
              <div key={v.id} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                  />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-pearl)' }}>
                    {v.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
