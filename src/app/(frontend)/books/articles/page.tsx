import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Articles & Essays',
  description: 'In-depth articles, commentaries, and reflections on the Ramayana — read by scholars and seekers alike.',
}

export const revalidate = 60

async function getArticles() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  try {
    const res = await fetch(
      `${baseUrl}/api/articles?where[status][equals]=published&sort=-publishedAt&limit=50`,
      { next: { revalidate: 60 } },
    )
    const data = await res.json()
    return data.docs || []
  } catch {
    return []
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-pearl)' }} className="educational-mode">
      <div style={{ paddingTop: '72px' }} />
      {/* Header — stays in charcoal for contrast */}
      <div style={{ background: 'var(--color-charcoal)', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-pearl)', marginBottom: '0.875rem' }}>
          Articles & Essays
        </h1>
        <p style={{ fontFamily: 'var(--font-baskerville)', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(238,170,0,0.8)' }}>
          &ldquo;The Ramayana is not history. It is an ever-present guide.&rdquo;
        </p>
      </div>

      {/* Educational Mode content area */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        {articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📖</div>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.1rem', color: 'rgba(26,35,126,0.5)' }}>Essays are being written. Check back soon.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {articles.map((article: { id: string; title: string; slug: string; excerpt?: string; author?: string; publishedAt?: string; readingTime?: string; category?: string }) => (
              <article
                key={article.id}
                style={{
                  borderBottom: '1px solid rgba(26,35,126,0.1)',
                  paddingBottom: '2rem',
                }}
              >
                {article.category && (
                  <div style={{ display: 'inline-block', padding: '0.15rem 0.625rem', background: 'rgba(238,170,0,0.15)', borderRadius: '1rem', fontFamily: 'var(--font-montserrat)', fontSize: '0.7rem', fontWeight: 700, color: '#b8860b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.625rem' }}>
                    {article.category}
                  </div>
                )}
                <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--color-cosmos)', marginBottom: '0.625rem', lineHeight: 1.3 }}>
                  <Link href={`/books/articles/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-saffron)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-cosmos)')}
                  >
                    {article.title}
                  </Link>
                </h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontFamily: 'var(--font-montserrat)', fontSize: '0.78rem', color: 'rgba(26,35,126,0.5)', marginBottom: '0.875rem' }}>
                  {article.author && <span>✍️ {article.author}</span>}
                  {article.readingTime && <span>⏱ {article.readingTime}</span>}
                </div>
                {article.excerpt && (
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.95rem', color: 'rgba(26,35,126,0.75)', lineHeight: 1.75, marginBottom: '1rem' }}>
                    {article.excerpt}
                  </p>
                )}
                <Link href={`/books/articles/${article.slug}`} style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-cosmos)', textDecoration: 'none' }}>
                  Read the full essay →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
