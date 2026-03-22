'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, BookOpen, Heart } from 'lucide-react'
import { SubscribeModal } from '../SubscribeModal'

const missionCards = [
  {
    id: 'digest',
    icon: Mail,
    title: 'Get the Digest',
    subtitle: 'Free Weekly Newsletter',
    description:
      'A curated email every week — one shloka, one insight, one video summary. The Ramayana, delivered straight to your inbox.',
    cta: 'Subscribe Now',
    action: 'subscribe',
  },
  {
    id: 'study',
    icon: BookOpen,
    title: 'Study Live',
    subtitle: 'Classes for Adults & Kids',
    description:
      'Join interactive Zoom sessions on the Ramayana. Two tracks — one for adults seeking wisdom, one for children beginning their journey.',
    cta: 'View Class Schedule',
    href: '/media/live-classes',
  },
  {
    id: 'volunteer',
    icon: Heart,
    title: 'Volunteer',
    subtitle: 'Join the Mission',
    description:
      'Translators, researchers, designers, social media creators — if you love the Ramayana, there is a place for you in this Odyssey.',
    cta: 'Apply Now',
    href: '/about/support#volunteer',
  },
]

export function JoinMissionSection() {
  const [subscribeOpen, setSubscribeOpen] = useState(false)

  return (
    <>
      <section
        style={{
          padding: '6rem 1.5rem',
          background: 'linear-gradient(to bottom, var(--color-charcoal) 0%, rgba(26,35,126,0.12) 50%, var(--color-charcoal) 100%)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
              Be Part of the Story
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-poppins)',
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                color: 'var(--color-pearl)',
                marginBottom: '0.875rem',
              }}
            >
              Join the Mission
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-baskerville)',
                fontStyle: 'italic',
                fontSize: '1rem',
                color: 'rgba(238,170,0,0.75)',
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              &ldquo;Every seeker has a role in this Odyssey.&rdquo;
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {missionCards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.id}
                  className="card"
                  style={{
                    padding: '2.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      background: 'rgba(238,170,0,0.12)',
                      border: '1px solid rgba(238,170,0,0.25)',
                      borderRadius: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <Icon size={24} color="var(--color-saffron)" />
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: 'var(--color-saffron)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '0.375rem',
                    }}
                  >
                    {card.subtitle}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-poppins)',
                      fontWeight: 700,
                      fontSize: '1.35rem',
                      color: 'var(--color-pearl)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: '0.9rem',
                      color: 'rgba(245,245,245,0.7)',
                      lineHeight: 1.7,
                      flex: 1,
                      marginBottom: '1.75rem',
                    }}
                  >
                    {card.description}
                  </p>
                  {card.action === 'subscribe' ? (
                    <button
                      onClick={() => setSubscribeOpen(true)}
                      className="btn-primary"
                      id={`join-${card.id}-btn`}
                    >
                      {card.cta}
                    </button>
                  ) : (
                    <Link href={card.href!} className="btn-primary" id={`join-${card.id}-btn`}>
                      {card.cta}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
    </>
  )
}
