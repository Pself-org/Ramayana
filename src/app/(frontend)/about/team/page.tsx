import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the team behind the Ramayana Odyssey platform.',
}

export default function TeamPage() {
  const team = [
    {
      name: 'Dr. Anand',
      role: 'Lead Scholar & Host',
      bio: 'Sanskritist and author with two decades of experience teaching the epic across the world. Host of the Ramayana Odyssey podcast.',
    },
    {
      name: 'Priya S.',
      role: 'Creative Director',
      bio: 'Visual artist translating the verses into modern graphics and managing the platform\'s visual identity.',
    },
    {
      name: 'Vikram',
      role: 'Audio & Music Lead',
      bio: 'Composer and sound engineer bringing the Vedic chants and original music to life.',
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-charcoal)', paddingTop: '72px' }}>
      <div style={{ background: 'linear-gradient(to bottom, rgba(26,35,126,0.3), transparent)', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-pearl)', marginBottom: '0.875rem' }}>
          Our Team
        </h1>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1rem', color: 'rgba(245,245,245,0.7)', maxWidth: '480px', margin: '0 auto' }}>
          A collective of scholars, artists, and creators building a bridge between antiquity and the modern world.
        </p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {team.map((member) => (
          <div key={member.name} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', background: 'var(--color-cosmos)', borderRadius: '50%', margin: '0 auto 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--color-saffron)' }}>
              <span style={{ fontSize: '1.5rem' }}>🎭</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-pearl)', marginBottom: '0.25rem' }}>
              {member.name}
            </h3>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              {member.role}
            </p>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.875rem', color: 'rgba(245,245,245,0.65)', lineHeight: 1.7 }}>
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
