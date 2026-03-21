import Link from 'next/link'
import { Headphones, Play, Music, BookOpen, Video } from 'lucide-react'

interface BentoWhatsNewProps {
  podcast: { title: string; slug: string; description?: string; duration?: string } | null
  video: { title: string; youtubeId: string; summary?: string } | null
  chant: { title: string; slug: string; lyricsSanskrit?: string } | null
  article: { title: string; slug: string; excerpt?: string; author?: string } | null
}

export function BentoWhatsNew({ podcast, video, chant, article }: BentoWhatsNewProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'auto auto',
        gap: '1rem',
      }}
    >
      {/* Top-Left: Latest Podcast (large) */}
      <div
        className="card"
        style={{
          gridColumn: 'span 7',
          gridRow: 'span 1',
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(26,35,126,0.4) 0%, rgba(28,28,28,0) 100%)',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                background: 'var(--color-cosmos)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Headphones size={18} color="var(--color-saffron)" />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'var(--color-saffron)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Latest Podcast
            </span>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 700,
              fontSize: '1.25rem',
              color: 'var(--color-pearl)',
              marginBottom: '0.5rem',
            }}
          >
            {podcast?.title || 'Coming Soon'}
          </h3>
          {podcast?.description && (
            <p
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: '0.875rem',
                color: 'rgba(245,245,245,0.6)',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {podcast.description}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <Link href={`/media/podcast/${podcast?.slug || ''}`} className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1.125rem' }}>
            <Headphones size={14} /> Listen
          </Link>
          {podcast?.slug && (
            <Link href={`/media/podcast/${podcast.slug}`} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1.125rem' }}>
              <Play size={14} /> Watch
            </Link>
          )}
          <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.75rem', color: 'rgba(245,245,245,0.4)', alignSelf: 'center' }}>
            {podcast?.duration}
          </span>
        </div>
      </div>

      {/* Top-Right: Latest Explainer Video */}
      <div
        className="card"
        style={{
          gridColumn: 'span 5',
          gridRow: 'span 1',
          overflow: 'hidden',
          position: 'relative',
          minHeight: '220px',
        }}
      >
        {video?.youtubeId ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt={video.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(28,28,28,0.95) 0%, transparent 55%)',
              }}
            />
            <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <Video size={14} color="var(--color-saffron)" />
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Explainer
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-pearl)', marginBottom: '0.75rem' }}>
                {video.title}
              </h3>
              <Link href="/media/explainers" className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.875rem' }}>
                <Play size={13} /> Watch Now
              </Link>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '220px', padding: '2rem' }}>
            <Video size={32} color="rgba(238,170,0,0.3)" style={{ marginBottom: '0.75rem' }} />
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.875rem', color: 'rgba(245,245,245,0.5)', textAlign: 'center' }}>Videos coming soon</p>
          </div>
        )}
      </div>

      {/* Bottom-Left: Latest Chant */}
      <div
        className="card"
        style={{
          gridColumn: 'span 4',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(238,170,0,0.08) 0%, rgba(28,28,28,0) 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
          <Music size={16} color="var(--color-saffron)" />
          <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Vedic Chant
          </span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-pearl)', marginBottom: '0.5rem' }}>
          {chant?.title || 'Chants Coming Soon'}
        </h3>
        {chant?.lyricsSanskrit && (
          <p style={{ fontFamily: 'var(--font-baskerville)', fontStyle: 'italic', fontSize: '0.875rem', color: 'rgba(238,170,0,0.7)', marginBottom: '1rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {chant.lyricsSanskrit}
          </p>
        )}
        <Link href="/gallery/chants" className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.875rem' }}>
          Listen
        </Link>
      </div>

      {/* Bottom-Middle: Shorts/Reel placeholder */}
      <div
        className="card"
        style={{
          gridColumn: 'span 4',
          minHeight: '180px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          background: 'linear-gradient(to bottom, rgba(26,35,126,0.25), rgba(28,28,28,0))',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
        <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          Shorts & Reels
        </span>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.8rem', color: 'rgba(245,245,245,0.55)', textAlign: 'center' }}>
          Quick wisdom drops
        </p>
        <a
          href="https://instagram.com/ramayanaodyssey"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
          style={{ fontSize: '0.78rem', padding: '0.4rem 0.875rem', marginTop: '0.875rem' }}
        >
          Follow on Instagram
        </a>
      </div>

      {/* Bottom-Right: Latest Article */}
      <div
        className="card"
        style={{
          gridColumn: 'span 4',
          padding: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
          <BookOpen size={16} color="var(--color-saffron)" />
          <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Latest Essay
          </span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-pearl)', marginBottom: '0.5rem' }}>
          {article?.title || 'Articles Coming Soon'}
        </h3>
        {article?.excerpt && (
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.8rem', color: 'rgba(245,245,245,0.6)', marginBottom: '0.875rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
            {article.excerpt}
          </p>
        )}
        {article?.author && (
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.72rem', color: 'rgba(238,170,0,0.6)' }}>
            — {article.author}
          </p>
        )}
        <Link href={`/books/articles/${article?.slug || ''}`} className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.875rem', display: 'inline-flex', marginTop: '0.875rem' }}>
          Read More
        </Link>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: repeat(12, 1fr)"] > * {
            grid-column: span 12 !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="gridTemplateColumns: repeat(12, 1fr)"] > * {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </div>
  )
}
