import type { Metadata } from 'next'
import { Heart, HandHelping } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Support the Odyssey',
  description: 'Volunteer your time or support the Ramayana Odyssey project financially to keep it free and accessible.',
}

export default function SupportPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-charcoal)', paddingTop: '72px' }}>
      <div style={{ background: 'linear-gradient(to bottom, rgba(238,170,0,0.1), transparent)', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-pearl)', marginBottom: '0.875rem' }}>
          Support the Mission
        </h1>
        <p style={{ fontFamily: 'var(--font-baskerville)', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(238,170,0,0.8)' }}>
          Help us keep this wisdom accessible to the world.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem 5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {/* Donate Section */}
        <div className="card" style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(26,35,126,0.3) 0%, rgba(28,28,28,0) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ padding: '0.75rem', background: 'var(--color-cosmos)', borderRadius: '0.5rem' }}>
              <Heart size={24} color="var(--color-saffron)" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--color-pearl)' }}>
              Donate
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1rem', color: 'rgba(245,245,245,0.7)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            The Ramayana Odyssey podcasts, videos, and articles are available entirely for free. If this content has brought value to your life, consider making a one-time or recurring donation to support server costs and ongoing production.
          </p>
          <a href="#" className="btn-primary">Make a Donation</a>
        </div>

        {/* Volunteer Section */}
        <div id="volunteer" className="card" style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(238,170,0,0.1) 0%, rgba(28,28,28,0) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', border: '1px solid rgba(238,170,0,0.3)' }}>
              <HandHelping size={24} color="var(--color-saffron)" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--color-pearl)' }}>
              Volunteer
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1rem', color: 'rgba(245,245,245,0.7)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            We are looking for dedicated individuals to help with:
          </p>
          <ul style={{ listStyle: 'none', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              'Sanskrit proofreading & translation',
              'Video editing & audio mastering',
              'Social media management (Instagram/YouTube shorts)',
              'Research assistance'
            ].map((task) => (
              <li key={task} style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.9rem', color: 'rgba(245,245,245,0.85)' }}>
                <span style={{ color: 'var(--color-saffron)', marginRight: '0.5rem' }}>✓</span> {task}
              </li>
            ))}
          </ul>
          <a href="mailto:volunteer@ramayanaodyssey.com" className="btn-secondary">Apply to Volunteer</a>
        </div>
      </div>
    </div>
  )
}
