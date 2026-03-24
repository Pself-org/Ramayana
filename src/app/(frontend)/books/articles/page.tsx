import type { Metadata } from 'next'
import Link from 'next/link'
import { getDb } from '@/db'
import { articles as articlesTable } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export const metadata: Metadata = {
  title: 'Articles & Essays',
  description: 'In-depth articles, commentaries, and reflections on the Ramayana — read by scholars and seekers alike.',
}

export const revalidate = 60

async function getArticles() {
  try {
    const db = await getDb()
    return await db.select()
      .from(articlesTable)
      .where(eq(articlesTable.status, 'published'))
      .orderBy(desc(articlesTable.publishedAt))
      .limit(50)
  } catch (error) {
    console.error('⚠️ Could not fetch articles (Database unavailable during build):', error)
    return []
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-pearl)' }} className="educational-mode">
      <div style={{ paddingTop: '72px' }} />
      <div style={{ background: 'var(--color-charcoal)', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-pearl)', marginBottom: '0.875rem' }}>
          Articles & Essays
        </h1>
        <p style={{ fontFamily: 'var(--font-baskerville)', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(238,170,0,0.8)' }}>
          &ldquo;The Ramayana is not history. It is an ever-present guide.&rdquo;
        </p>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        {articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📖</div>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.1rem', color: 'rgba(26,35,126,0.5)' }}>Essays are being written. Check back soon.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {articles.map((article) => (
              <article
                key={article.id}
                style={{
                  borderBottom: '1px solid rgba(26,35,126,0.1)',
                  paddingBottom: '2rem',
                }}
              >
                <h2 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--color-cosmos)', marginBottom: '0.625rem', lineHeight: 1.3 }}>
                  <Link href={`/books/articles/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {article.title}
                  </Link>
                </h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontFamily: 'var(--font-montserrat)', fontSize: '0.78rem', color: 'rgba(26,35,126,0.5)', marginBottom: '0.875rem' }}>
                   {article.publishedAt && <span>📅 {new Date(article.publishedAt).toLocaleDateString()}</span>}
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
