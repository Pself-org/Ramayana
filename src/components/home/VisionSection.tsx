const kandas = [
  {
    number: 'I',
    name: 'Bāla Kāṇḍa',
    english: 'Book of Childhood',
    description:
      'The birth of Rama, his divine nature revealed, and his early life in Ayodhya. Includes breaking Shiva\'s bow and marriage to Sita.',
    emoji: '🌅',
    color: '#EEAA00',
  },
  {
    number: 'II',
    name: 'Ayodhyā Kāṇḍa',
    english: 'Book of Ayodhya',
    description:
      'Dharma under pressure. Kaikeyi\'s boons, the exile of Rama, Sita, and Lakshmana. The death of King Dasharatha.',
    emoji: '👑',
    color: '#b8860b',
  },
  {
    number: 'III',
    name: 'Āraṇya Kāṇḍa',
    english: 'Book of the Forest',
    description:
      'Fourteen years in the wilderness. Encounters with sages, demons, and the abduction of Sita by Ravana.',
    emoji: '🌿',
    color: '#4a7c59',
  },
  {
    number: 'IV',
    name: 'Kiṣkindhā Kāṇḍa',
    english: 'Book of Kishkindha',
    description:
      'The alliance with Sugriva. Hanuman introduced. The Vanara army assembled to find Sita.',
    emoji: '🐒',
    color: '#8B4513',
  },
  {
    number: 'V',
    name: 'Sundara Kāṇḍa',
    english: 'Book of Beauty',
    description:
      'Hanuman\'s heroic leap to Lanka. Discovery of Sita, his message of hope, and the burning of Lanka.',
    emoji: '🌊',
    color: '#1565C0',
  },
  {
    number: 'VI',
    name: 'Yuddha Kāṇḍa',
    english: 'Book of War',
    description:
      'The great battle of Lanka. The defeat of Ravana, liberation of Sita, and the triumphant return to Ayodhya.',
    emoji: '⚡',
    color: '#c62828',
  },
  {
    number: 'VII',
    name: 'Uttara Kāṇḍa',
    english: 'Book of the Aftermath',
    description:
      'The reign of Rama as the ideal king. Sita\'s second exile, the Ashvamedha sacrifice, and the eternal return.',
    emoji: '🕊️',
    color: '#7B1FA2',
  },
]

export function VisionSection() {
  return (
    <section
      style={{
        padding: '6rem 1.5rem',
        background: 'var(--color-charcoal)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(26,35,126,0.12) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(238,170,0,0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '0.25rem 1rem',
              background: 'rgba(238,170,0,0.1)',
              borderRadius: '2rem',
              fontFamily: 'var(--font-montserrat)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--color-saffron)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '0.875rem',
            }}
          >
            The Grand Vision
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: 'var(--color-pearl)',
              marginBottom: '1rem',
            }}
          >
            The 7 Books of Valmiki
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-baskerville)',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: 'rgba(238,170,0,0.8)',
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            &ldquo;Seven Kāṇḍas. One eternal journey. Discover the path of Dharma.&rdquo;
          </p>
        </div>

        {/* Kanda Timeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {kandas.map((kanda) => (
            <div
              key={kanda.number}
              className="card"
              style={{
                padding: '1.75rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Number watermark */}
              <div
                style={{
                  position: 'absolute',
                  top: '-0.5rem',
                  right: '1rem',
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 700,
                  fontSize: '5rem',
                  color: 'rgba(255,255,255,0.03)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                {kanda.number}
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{kanda.emoji}</span>
                  <div
                    style={{
                      padding: '0.15rem 0.625rem',
                      background: `${kanda.color}20`,
                      borderRadius: '1rem',
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: kanda.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Book {kanda.number}
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-poppins)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: 'var(--color-pearl)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {kanda.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: '0.78rem',
                    color: 'var(--color-saffron)',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  {kanda.english}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: '0.85rem',
                    color: 'rgba(245,245,245,0.65)',
                    lineHeight: 1.65,
                  }}
                >
                  {kanda.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="/books/vision" className="btn-secondary">
            Explore the Full Roadmap →
          </a>
        </div>
      </div>
    </section>
  )
}
