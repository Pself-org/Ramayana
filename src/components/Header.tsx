'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { SubscribeModal } from './SubscribeModal'

const navLinks = [
  {
    label: 'Classes & Media',
    href: '/media/podcast',
    children: [
      { label: 'Podcast Episodes', href: '/media/podcast' },
      { label: 'Explainer Videos', href: '/media/explainers' },
      { label: 'Live Classes', href: '/media/live-classes' },
    ],
  },
  {
    label: 'Audio & Visuals',
    href: '/gallery/chants',
    children: [
      { label: 'Vedic Chants', href: '/gallery/chants' },
      { label: 'Original Music', href: '/gallery/music' },
      { label: 'Infographics', href: '/gallery/infographics' },
    ],
  },
  {
    label: 'The Books',
    href: '/books/vision',
    children: [
      { label: '7 Kāṇḍas Vision', href: '/books/vision' },
      { label: 'Articles & Essays', href: '/books/articles' },
    ],
  },
  {
    label: 'About Us',
    href: '/about/team',
    children: [
      { label: 'Our Team', href: '/about/team' },
      { label: 'Support Us', href: '/about/support' },
    ],
  },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [subscribeOpen, setSubscribeOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
          background: scrolled
            ? 'rgba(28,28,28,0.95)'
            : 'linear-gradient(to bottom, rgba(28,28,28,0.8), transparent)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.5)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(238,170,0,0.12)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
        {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', textDecoration: 'none' }}>
            <RamayanaLogo />
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 700,
                  fontSize: '1.4rem',
                  color: 'var(--color-saffron)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
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
                  letterSpacing: '0.03em',
                  marginTop: '0.125rem'
                }}
              >
                Rama's Path. Timeless Wisdom.
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
            {navLinks.map((link) => (
              <div
                key={link.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  style={{
                    display: 'block',
                    padding: '0.5rem 0.875rem',
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: activeDropdown === link.label ? 'var(--color-saffron)' : 'var(--color-pearl)',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'color 0.2s ease',
                    letterSpacing: '0.01em',
                  }}
                >
                  {link.label}
                </Link>
                {/* Dropdown */}
                {activeDropdown === link.label && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      minWidth: '200px',
                      background: 'rgba(20,20,24,0.97)',
                      border: '1px solid rgba(238,170,0,0.2)',
                      borderRadius: '0.75rem',
                      padding: '0.5rem',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(12px)',
                      animation: 'fadeInUp 0.18s ease',
                    }}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        style={{
                          display: 'block',
                          padding: '0.55rem 1rem',
                          fontFamily: 'var(--font-montserrat)',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: 'var(--color-pearl)',
                          textDecoration: 'none',
                          borderRadius: '0.5rem',
                          transition: 'background 0.15s, color 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(238,170,0,0.1)'
                          e.currentTarget.style.color = 'var(--color-saffron)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = 'var(--color-pearl)'
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Subscribe CTA */}
            <button
              id="header-subscribe-btn"
              onClick={() => setSubscribeOpen(true)}
              className="btn-primary"
              style={{ marginLeft: '0.75rem' }}
            >
              Subscribe
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--color-pearl)',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            style={{
              background: 'rgba(20,20,24,0.98)',
              backdropFilter: 'blur(16px)',
              borderTop: '1px solid rgba(238,170,0,0.15)',
              padding: '1rem 1.5rem 1.5rem',
            }}
          >
            {navLinks.map((link) => (
              <div key={link.label} style={{ marginBottom: '0.25rem' }}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.75rem 0',
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: 'var(--color-saffron)',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(238,170,0,0.1)',
                  }}
                >
                  {link.label}
                </Link>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.5rem 1rem',
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: '0.85rem',
                      color: 'rgba(245,245,245,0.8)',
                      textDecoration: 'none',
                    }}
                  >
                    → {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <button
              onClick={() => { setSubscribeOpen(true); setMobileOpen(false) }}
              className="btn-primary"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Subscribe to the Digest
            </button>
          </div>
        )}
      </header>

      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}

function RamayanaLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Ramayana Odyssey Logo"
      width={72}
      height={72}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  )
}
