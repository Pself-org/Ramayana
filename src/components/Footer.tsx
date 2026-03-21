'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Instagram, Youtube, Linkedin, MessageCircle, Mail, ArrowRight } from 'lucide-react'

const quickLinks = [
  { label: 'Podcast Episodes', href: '/media/podcast' },
  { label: 'Explainer Videos', href: '/media/explainers' },
  { label: 'Live Classes', href: '/media/live-classes' },
  { label: 'Vedic Chants', href: '/gallery/chants' },
  { label: 'The 7 Kāṇḍas', href: '/books/vision' },
  { label: 'Articles & Essays', href: '/books/articles' },
]

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/ramayanaodyssey' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@ramayanaodyssey' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/ramayanaodyssey' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/ramayanaodyssey' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <footer
      style={{
        background: 'var(--color-cosmos)',
        color: 'var(--color-pearl)',
        padding: '4rem 1.5rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Main grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-poppins)',
                fontWeight: 700,
                fontSize: '1.3rem',
                color: 'var(--color-saffron)',
                marginBottom: '0.5rem',
              }}
            >
              Ramayana Odyssey
            </div>
            <div
              style={{
                fontFamily: 'var(--font-baskerville)',
                fontStyle: 'italic',
                fontSize: '0.85rem',
                color: 'rgba(245,245,245,0.7)',
                marginBottom: '1.25rem',
              }}
            >
              Ancient Wisdom for Modern Life
            </div>
            <p
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: '0.875rem',
                color: 'rgba(245,245,245,0.65)',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}
            >
              Bringing Valmiki's timeless epic to every home — through podcasts, videos, chants, and scholarship.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.875rem' }}>
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '50%',
                    color: 'var(--color-pearl)',
                    transition: 'background 0.2s, color 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-saffron)'
                    e.currentTarget.style.color = 'var(--color-cosmos)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.color = 'var(--color-pearl)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: 'var(--color-saffron)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
              }}
            >
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: '0.875rem',
                      color: 'rgba(245,245,245,0.75)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-saffron)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,245,245,0.75)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* A Pillar of Project Self */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: 'var(--color-saffron)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
              }}
            >
              Part of Project Self
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: '0.875rem',
                color: 'rgba(245,245,245,0.65)',
                lineHeight: 1.7,
                marginBottom: '1rem',
              }}
            >
              Ramayana Odyssey is Pillar I of Project Self — a suite of platforms dedicated to India's greatest wisdom traditions.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'About Us', href: '/about/team' },
                { label: 'Support the Mission', href: '/about/support' },
                { label: 'Volunteer', href: '/about/support#volunteer' },
                { label: 'Privacy Policy', href: '/legal/privacy' },
                { label: 'Terms of Service', href: '/legal/terms' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: '0.8rem',
                      color: 'rgba(245,245,245,0.55)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-saffron)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,245,245,0.55)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mini Subscribe Form */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: 'var(--color-saffron)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
              }}
            >
              Get the Weekly Digest
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: '0.8rem',
                color: 'rgba(245,245,245,0.65)',
                marginBottom: '1rem',
              }}
            >
              Ancient stories. Modern insights. Every week.
            </p>
            {status === 'success' ? (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(238,170,0,0.15)',
                  border: '1px solid rgba(238,170,0,0.3)',
                  borderRadius: '0.5rem',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '0.875rem',
                  color: 'var(--color-saffron)',
                }}
              >
                🙏 You're on the list!
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                <input
                  id="footer-subscribe-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="input-field"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.2)',
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {status === 'loading' ? 'Subscribing…' : (
                    <><Mail size={15} /> Subscribe<ArrowRight size={15} /></>
                  )}
                </button>
                {status === 'error' && (
                  <p style={{ fontSize: '0.75rem', color: '#ff7b7b', fontFamily: 'var(--font-montserrat)' }}>
                    Something went wrong — please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(245,245,245,0.1)', marginBottom: '1.5rem' }} />

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: '0.8rem',
              color: 'rgba(245,245,245,0.45)',
            }}
          >
            © {new Date().getFullYear()} Ramayana Odyssey · Pillar I of Project Self. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-baskerville)',
              fontStyle: 'italic',
              fontSize: '0.8rem',
              color: 'rgba(238,170,0,0.6)',
            }}
          >
            "Rama's Path. Timeless Wisdom."
          </p>
        </div>
      </div>
    </footer>
  )
}
