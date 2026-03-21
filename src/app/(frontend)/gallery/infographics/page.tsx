import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Infographics — Dharma & Family Trees',
  description: 'Downloadable Ramayana infographics — family trees, Dharma maps, and visual guides.',
}

const infographics = [
  { id: 'family-tree', title: 'Raghu Vamsha Family Tree', description: 'The complete lineage from Brahma to Lord Rama and beyond.', emoji: '🌳', available: false },
  { id: 'dharma-map', title: 'Dharma in the Ramayana', description: 'A visual guide to how Dharma is upheld and tested across all 7 Kandas.', emoji: '⚖️', available: false },
  { id: 'characters', title: 'Key Characters of Lanka', description: 'Ravana\'s court, his army, and his family — the antagonists of the epic.', emoji: '👑', available: false },
  { id: 'ayodhya', title: 'The Kingdom of Ayodhya', description: 'Rama\'s world — the geography and key figures of his homeland.', emoji: '🏛️', available: false },
]

export default function InfographicsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-charcoal)', paddingTop: '72px' }}>
      <div style={{ background: 'linear-gradient(to bottom, rgba(26,35,126,0.4), transparent)', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-pearl)', marginBottom: '0.875rem' }}>
          Infographics
        </h1>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1rem', color: 'rgba(245,245,245,0.7)' }}>
          Downloadable visual guides — Dharma maps, family trees, and character charts.
        </p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {infographics.map((item) => (
          <div key={item.id} className="card" style={{ padding: '2rem', opacity: item.available ? 1 : 0.7 }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.emoji}</div>
            <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-pearl)', marginBottom: '0.625rem' }}>
              {item.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.875rem', color: 'rgba(245,245,245,0.6)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              {item.description}
            </p>
            {item.available ? (
              <button className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1.125rem' }}>
                ⬇ Download PDF
              </button>
            ) : (
              <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.78rem', color: 'rgba(238,170,0,0.6)', fontStyle: 'italic' }}>
                Coming Soon
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
