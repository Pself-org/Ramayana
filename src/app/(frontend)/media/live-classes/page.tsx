import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Live Classes',
  description: 'Join live Ramayana study sessions via Zoom — separate tracks for Adults and Kids.',
}

export default function LiveClassesPage() {
  const tracks = [
    {
      id: 'adults',
      emoji: '🧘',
      title: 'Adults Track',
      subtitle: 'Deep Dive into Dharma',
      description:
        'A guided exploration of the Ramayana for adult seekers. Each session covers one episode in depth — the philosophy, the psychology, and the practical wisdom for modern life.',
      sessions: ['Every Saturday · 10:00 AM IST / 12:30 AM EST', 'Duration: 90 minutes', 'Via Zoom (link sent after registration)'],
      cta: 'Register for Adults Class',
      color: 'var(--color-cosmos)',
    },
    {
      id: 'kids',
      emoji: '⭐',
      title: 'Kids Track',
      subtitle: 'Stories for Young Seekers',
      description:
        'Engaging Ramayana storytelling for children aged 6–14. Interactive, fun, and values-based — helping children connect with their heritage.',
      sessions: ['Every Sunday · 10:00 AM IST / 12:30 AM EST', 'Duration: 60 minutes', 'Via Zoom (link sent after registration)'],
      cta: 'Register for Kids Class',
      color: '#7B1FA2',
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-charcoal)', paddingTop: '72px' }}>
      <div style={{ background: 'linear-gradient(to bottom, rgba(26,35,126,0.5), transparent)', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-pearl)', marginBottom: '0.875rem' }}>
          Live Classes
        </h1>
        <p style={{ fontFamily: 'var(--font-baskerville)', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(238,170,0,0.8)' }}>
          &ldquo;Learn from a living tradition, not just a text.&rdquo;
        </p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {tracks.map((track) => (
          <div key={track.id} className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{track.emoji}</div>
            <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.375rem' }}>
              {track.subtitle}
            </div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--color-pearl)', marginBottom: '1rem' }}>
              {track.title}
            </h2>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.9rem', color: 'rgba(245,245,245,0.7)', lineHeight: 1.7, marginBottom: '1.5rem', flex: 1 }}>
              {track.description}
            </p>
            <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
              {track.sessions.map((s) => (
                <li key={s} style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.85rem', color: 'rgba(238,170,0,0.85)', padding: '0.375rem 0', borderBottom: '1px solid rgba(238,170,0,0.1)' }}>
                  {s}
                </li>
              ))}
            </ul>
            <a href="/about/support#register" className="btn-primary" id={`register-${track.id}-btn`}>
              {track.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
