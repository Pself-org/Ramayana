import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Original Music',
  description: 'Listen to original background music and compositions inspired by the Ramayana.',
}

export const revalidate = 60

async function getMusic() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  try {
    const res = await fetch(
      `${baseUrl}/api/audio-tracks?where[status][equals]=published&where[category][equals]=music&sort=-publishedAt&limit=50`,
      { next: { revalidate: 60 } },
    )
    const data = await res.json()
    return data.docs || []
  } catch {
    return []
  }
}

export default async function MusicPage() {
  const tracks = await getMusic()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-charcoal)', paddingTop: '72px' }}>
      <div style={{ background: 'linear-gradient(to bottom, rgba(26,35,126,0.4), transparent)', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-pearl)', marginBottom: '0.875rem' }}>
          Original Music
        </h1>
        <p style={{ fontFamily: 'var(--font-baskerville)', fontStyle: 'italic', fontSize: '1rem', color: 'rgba(238,170,0,0.8)' }}>
          &ldquo;Compositions inspired by the timeless epic.&rdquo;
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        {tracks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎵</div>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.1rem', color: 'rgba(245,245,245,0.5)' }}>Music coming soon.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {tracks.map((track: { id: string; title: string; artist?: string; duration?: string; audioUrl: string }) => (
              <div key={track.id} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(238,170,0,0.1)', border: '1px solid rgba(238,170,0,0.2)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>
                  🎵
                </div>
                <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-pearl)', marginBottom: '0.25rem' }}>
                  {track.title}
                </h3>
                {track.artist && (
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.78rem', color: 'rgba(238,170,0,0.65)', marginBottom: '0.875rem' }}>
                    by {track.artist}
                    {track.duration && ` · ${track.duration}`}
                  </p>
                )}
                <audio controls style={{ width: '100%', accentColor: '#EEAA00' }}>
                  <source src={track.audioUrl} type="audio/mpeg" />
                </audio>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
