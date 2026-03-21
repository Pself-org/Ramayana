'use client'

import { useState } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { SubscribeModal } from '../SubscribeModal'

export function HeroSection() {
  const [subscribeOpen, setSubscribeOpen] = useState(false)
  const [email, setEmail] = useState('')

  function handleQuickSubscribe(e: React.FormEvent) {
    e.preventDefault()
    setSubscribeOpen(true)
  }

  return (
    <>
      <section
        style={{
          position: 'relative',
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'var(--color-charcoal)',
        }}
      >
        {/* Cinematic background gradient (acts as bg while any real image loads) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(26,35,126,0.55) 0%, rgba(28,28,28,0) 70%), radial-gradient(ellipse 50% 50% at 80% 20%, rgba(238,170,0,0.08) 0%, transparent 60%)',
            zIndex: 1,
          }}
        />

        {/* Archer watermark background */}
        <div
          style={{
            position: 'absolute',
            right: '5%',
            bottom: '5%',
            opacity: 0.04,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <svg width="500" height="500" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <circle cx="18" cy="9" r="2.5" fill="#EEAA00" />
            <line x1="18" y1="11.5" x2="18" y2="22" stroke="#EEAA00" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="14" x2="11" y2="18" stroke="#EEAA00" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 11,13.5 Q 8,18 11,22.5" stroke="#EEAA00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <line x1="11" y1="13.5" x2="18" y2="16" stroke="#EEAA00" strokeWidth="0.8" />
            <line x1="11" y1="22.5" x2="18" y2="20" stroke="#EEAA00" strokeWidth="0.8" />
            <line x1="18" y1="18" x2="27" y2="18" stroke="#EEAA00" strokeWidth="1.2" strokeLinecap="round" />
            <polygon points="27,17 29,18 27,19" fill="#EEAA00" />
            <line x1="18" y1="14" x2="23" y2="18" stroke="#EEAA00" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="22" x2="15" y2="29" stroke="#EEAA00" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="22" x2="21" y2="29" stroke="#EEAA00" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '6rem 1.5rem 4rem',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-block',
              padding: '0.3rem 1rem',
              background: 'rgba(238,170,0,0.1)',
              border: '1px solid rgba(238,170,0,0.25)',
              borderRadius: '2rem',
              fontFamily: 'var(--font-montserrat)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--color-saffron)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '1.5rem',
              animation: 'fadeInUp 0.6s ease both',
            }}
          >
            Pillar I of Project Self
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              color: 'var(--color-saffron)',
              lineHeight: 1.1,
              marginBottom: '1rem',
              animation: 'fadeInUp 0.7s 0.1s ease both',
              textShadow: '0 0 60px rgba(238,170,0,0.25)',
            }}
          >
            The Ramayana Odyssey
          </h1>

          {/* Sub-tagline */}
          <p
            style={{
              fontFamily: 'var(--font-baskerville)',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: 'rgba(245,245,245,0.75)',
              marginBottom: '1.5rem',
              animation: 'fadeInUp 0.7s 0.2s ease both',
            }}
          >
            &ldquo;Ancient Wisdom for Modern Life&rdquo;
          </p>

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: 'rgba(245,245,245,0.7)',
              lineHeight: 1.75,
              maxWidth: '640px',
              margin: '0 auto 2.5rem',
              animation: 'fadeInUp 0.7s 0.3s ease both',
            }}
          >
            Bringing the greatest epic into our times. Join us on a journey across audio, video,
            and text — discover the Ramayana as a living guide for your daily life.
          </p>

          {/* Email Capture Form */}
          <form
            onSubmit={handleQuickSubscribe}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              animation: 'fadeInUp 0.7s 0.4s ease both',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                maxWidth: '480px',
                gap: '0.625rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <input
                id="hero-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="input-field"
                style={{
                  flex: '1 1 240px',
                  minWidth: '0',
                  fontSize: '1rem',
                  padding: '0.875rem 1.125rem',
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                id="hero-subscribe-btn"
                style={{ flex: '0 0 auto', padding: '0.875rem 1.5rem' }}
              >
                <Mail size={16} />
                Subscribe
                <ArrowRight size={16} />
              </button>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: '0.75rem',
                color: 'rgba(245,245,245,0.4)',
              }}
            >
              Free weekly digest · No spam · Unsubscribe anytime
            </p>
          </form>

          {/* Scroll hint */}
          <div
            style={{
              marginTop: '4rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: 0.45,
              animation: 'fadeInUp 0.7s 0.8s ease both',
            }}
          >
            <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-pearl)' }}>
              Explore
            </span>
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--color-pearl), transparent)' }} />
          </div>
        </div>
      </section>

      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
    </>
  )
}
