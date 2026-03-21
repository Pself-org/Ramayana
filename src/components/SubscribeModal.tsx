'use client'

import { useState } from 'react'
import { X, Mail, ArrowRight } from 'lucide-react'

interface SubscribeModalProps {
  open: boolean
  onClose: () => void
}

export function SubscribeModal({ open, onClose }: SubscribeModalProps) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  if (!open) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'homepage' }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error — please check your connection.')
    }
  }

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-charcoal)',
          border: '1px solid rgba(238,170,0,0.25)',
          borderRadius: '1.25rem',
          padding: '2.5rem',
          maxWidth: '480px',
          width: '100%',
          position: 'relative',
          animation: 'fadeInUp 0.3s ease',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-pearl)',
          }}
        >
          <X size={18} />
        </button>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🙏</div>
            <h2
              style={{
                fontFamily: 'var(--font-poppins)',
                fontWeight: 700,
                fontSize: '1.5rem',
                color: 'var(--color-saffron)',
                marginBottom: '0.75rem',
              }}
            >
              Welcome to the Odyssey!
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-montserrat)',
                color: 'rgba(245,245,245,0.8)',
                lineHeight: 1.7,
              }}
            >
              Check your inbox for a welcome message. Ancient wisdom awaits.
            </p>
            <button
              onClick={onClose}
              className="btn-primary"
              style={{ marginTop: '1.5rem' }}
            >
              Begin the Journey
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(238,170,0,0.12)',
                  borderRadius: '2rem',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-saffron)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.875rem',
                }}
              >
                Weekly Digest
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 700,
                  fontSize: '1.6rem',
                  color: 'var(--color-pearl)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.2,
                }}
              >
                Join the Ramayana Odyssey
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-baskerville)',
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  color: 'rgba(245,245,245,0.65)',
                }}
              >
                "Ancient stories. Modern insights. Every week."
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label
                    htmlFor="modal-first-name"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'rgba(245,245,245,0.7)',
                      marginBottom: '0.375rem',
                    }}
                  >
                    First Name
                  </label>
                  <input
                    id="modal-first-name"
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="Rama"
                    className="input-field"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-last-name"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'rgba(245,245,245,0.7)',
                      marginBottom: '0.375rem',
                    }}
                  >
                    Last Name
                  </label>
                  <input
                    id="modal-last-name"
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Dasharatha"
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="modal-email"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'rgba(245,245,245,0.7)',
                    marginBottom: '0.375rem',
                  }}
                >
                  Email Address *
                </label>
                <input
                  id="modal-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="input-field"
                />
              </div>

              {errorMsg && (
                <p
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: '0.8rem',
                    color: '#ff7b7b',
                    background: 'rgba(255,60,60,0.08)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                  }}
                >
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem' }}
              >
                {status === 'loading' ? (
                  'Subscribing…'
                ) : (
                  <><Mail size={16} /> Subscribe to the Digest <ArrowRight size={16} /></>
                )}
              </button>

              <p
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '0.72rem',
                  color: 'rgba(245,245,245,0.4)',
                  textAlign: 'center',
                }}
              >
                No spam. Unsubscribe anytime. By subscribing you agree to our Privacy Policy.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
