import type { Metadata } from 'next'
import { Music } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vedic Chants & Shlokas',
  description: 'Listen to Ramayana Odyssey chants and Sanskrit shlokas with Sanskrit, transliteration, and English meaning.',
}

export const revalidate = 60

async function getChants() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  try {
    const res = await fetch(
      `${baseUrl}/api/audio-tracks?where[status][equals]=published&where[category][equals]=chant&sort=-publishedAt&limit=50`,
      { next: { revalidate: 60 } },
    )
    const data = await res.json()
    return data.docs || []
  } catch {
    return []
  }
}

export default async function ChantsPage() {
  const chants = await getChants()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-charcoal)', paddingTop: '72px' }}>
      <div style={{ background: 'linear-gradient(to bottom, rgba(238,170,0,0.12), transparent)', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.875rem', background: 'rgba(238,170,0,0.1)', borderRadius: '2rem', fontFamily: 'var(--font-montserrat)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
          <Music size={13} /> Sacred Chants
        </div>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-pearl)', marginBottom: '0.875rem' }}>
          Vedic Chants & Shlokas
        </h1>
        <p style={{ fontFamily: 'var(--font-baskerville)', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(238,170,0,0.8)' }}>
          &ldquo;In every shloka, the Sage speaks directly to your soul.&rdquo;
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {chants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🙏</div>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.1rem', color: 'rgba(245,245,245,0.5)' }}>Sacred chants are being recorded. Coming soon.</p>
          </div>
        ) : (
          chants.map((chant: { id: string; title: string; audioUrl: string; lyricsSanskrit?: string; lyricsTransliteration?: string; lyricsEnglish?: string; meaning?: string; artist?: string }) => (
            <div key={chant.id} className="card" style={{ padding: '2rem', background: 'linear-gradient(to bottom right, rgba(238,170,0,0.06), rgba(28,28,28,0))' }}>
              <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-saffron)', marginBottom: '0.5rem' }}>
                {chant.title}
              </h2>
              {chant.artist && (
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.8rem', color: 'rgba(245,245,245,0.5)', marginBottom: '1rem' }}>
                  by {chant.artist}
                </p>
              )}
              {/* Audio player */}
              <audio controls style={{ width: '100%', marginBottom: '1.5rem', accentColor: '#EEAA00' }}>
                <source src={chant.audioUrl} type="audio/mpeg" />
              </audio>
              {/* Lyrics display */}
              {chant.lyricsSanskrit && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Sanskrit</div>
                  <p style={{ fontFamily: 'var(--font-baskerville)', fontStyle: 'italic', fontSize: '1.05rem', color: 'rgba(238,170,0,0.85)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                    {chant.lyricsSanskrit}
                  </p>
                </div>
              )}
              {chant.lyricsTransliteration && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.68rem', fontWeight: 700, color: 'rgba(245,245,245,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Transliteration</div>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.9rem', color: 'rgba(245,245,245,0.7)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                    {chant.lyricsTransliteration}
                  </p>
                </div>
              )}
              {chant.lyricsEnglish && (
                <div>
                  <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-pearl)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>English Meaning</div>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.9rem', color: 'rgba(245,245,245,0.75)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                    {chant.lyricsEnglish}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
