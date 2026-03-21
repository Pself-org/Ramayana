import type { Metadata } from 'next'
import { ArcherDivider } from '@/components/ArcherDivider'

export const metadata: Metadata = {
  title: 'The 7 Kāṇḍas — Books of Valmiki',
  description: 'Explore the vision and timeline of the Ramayana through the seven Kāṇḍas of Sage Valmiki.',
}

const kandas = [
  {
    number: 'I',
    name: 'Bāla Kāṇḍa',
    english: 'Book of Childhood',
    description: 'The birth of Rama, his divine nature revealed, and his early life in Ayodhya under the tutelage of sages. Includes breaking Shiva\'s bow and marriage to Sita.',
    deepDive: 'Focuses on the importance of samskaras (formative experiences), the role of mentors like Vishwamitra, and the divine descent of Vishnu as an avatar bound by human rules.',
  },
  {
    number: 'II',
    name: 'Ayodhyā Kāṇḍa',
    english: 'Book of Ayodhya',
    description: 'Dharma under pressure. Kaikeyi\'s boons, the exile of Rama, Sita, and Lakshmana. The death of King Dasharatha and Bharata\'s profound devotion.',
    deepDive: 'The core conflict of duty vs. desire. This book explores righteous kingship, the bonds of brotherhood, and calm acceptance of adversity without resentment (Rama\'s equanimity).',
  },
  {
    number: 'III',
    name: 'Āraṇya Kāṇḍa',
    english: 'Book of the Forest',
    description: 'Fourteen years in the wilderness. Encounters with sages and demons, the mutilation of Shurpanakha, and the tragic abduction of Sita by Ravana.',
    deepDive: 'The loss of the comfort zone. This phase tests the heroes physically and spiritually, contrasting the austere purity of the ashrams with the chaotic threat of the Rakshasas.',
  },
  {
    number: 'IV',
    name: 'Kiṣkindhā Kāṇḍa',
    english: 'Book of Kishkindha',
    description: 'The alliance with Sugriva. Hanuman introduced. The Vanara army assembled to find Sita across the earth.',
    deepDive: 'The power of friendship and finding extraordinary allies in unexpected places. Marks the transition from wandering exiles to leaders of an uprising.',
  },
  {
    number: 'V',
    name: 'Sundara Kāṇḍa',
    english: 'Book of Beauty',
    description: 'Hanuman\'s heroic leap across the ocean to Lanka. His discovery of Sita, delivery of Rama\'s message of hope, and the burning of Lanka.',
    deepDive: 'A story of pure devotion (Bhakti). Hanuman embodies infinite strength harnessed by absolute humility. Sita\'s resilience in captivity is a study in quiet strength.',
  },
  {
    number: 'VI',
    name: 'Yuddha Kāṇḍa',
    english: 'Book of War',
    description: 'The great battle of Lanka. The building of the bridge, the decisive defeat of Ravana, liberation of Sita, and the triumphant return to Ayodhya.',
    deepDive: 'The ultimate climax of action (Karma Yoga). It confronts the realities of war, collateral damage, and the difference between fighting for ego (Ravana) and fighting for order (Rama).',
  },
  {
    number: 'VII',
    name: 'Uttara Kāṇḍa',
    english: 'Book of the Aftermath',
    description: 'The reign of Rama as the ideal king. Sita\'s second exile, the Ashvamedha sacrifice, the birth of Lava and Kusha, and the eternal return to Vaikuntha.',
    deepDive: 'The most philosophically complex and challenging book. It challenges our notions of a "happy ending" by weighing personal joy against public duty and the harsh demands of Rajadharma.',
  },
]

export default function BooksVisionPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-pearl)' }} className="educational-mode">
      <div style={{ paddingTop: '72px' }} />
      <div style={{ background: 'var(--color-charcoal)', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--color-saffron)', marginBottom: '1rem' }}>
          The Roadmap of the Epic
        </h1>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.1rem', color: 'rgba(245,245,245,0.7)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
          Seven Kāṇḍas. 24,000 verses. An eternal journey spanning the human experience from childhood to the afterlife.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem 6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {kandas.map((kanda, idx) => (
            <div key={kanda.number} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
              {/* Timeline dot / number */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-cosmos)', color: 'var(--color-saffron)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1.25rem' }}>
                  {kanda.number}
                </div>
                {idx !== kandas.length - 1 && (
                  <div style={{ width: '2px', height: '100%', minHeight: '80px', background: 'rgba(26,35,126,0.15)', marginTop: '0.5rem' }} />
                )}
              </div>
              
              {/* Content */}
              <div style={{ flex: 1, paddingBottom: '1rem' }}>
                <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1.75rem', color: 'var(--color-cosmos)', marginBottom: '0.25rem', lineHeight: 1.2 }}>
                  {kanda.name}
                </h2>
                <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.85rem', fontWeight: 600, color: '#b8860b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                  The {kanda.english}
                </div>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1rem', color: '#2a2a30', lineHeight: 1.7, marginBottom: '1rem' }}>
                  {kanda.description}
                </p>
                <div style={{ background: 'rgba(238,170,0,0.08)', borderLeft: '3px solid #EEAA00', padding: '1.25rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
                  <p style={{ fontFamily: 'var(--font-baskerville)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--color-cosmos-dark)', margin: 0, lineHeight: 1.6 }}>
                    <strong>Dharma Focus:</strong> {kanda.deepDive}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: '5rem' }}>
          <ArcherDivider label="The Journey Continues" />
        </div>
      </div>
    </div>
  )
}
