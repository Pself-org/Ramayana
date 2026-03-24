import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ArcherDivider } from '@/components/ArcherDivider'
import { getDb } from '@/db'
import { articles as articlesTable } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

interface Props {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  try {
    const db = await getDb()
    const rows = await db.select()
      .from(articlesTable)
      .where(
        and(
          eq(articlesTable.slug, slug),
          eq(articlesTable.status, 'published')
        )
      )
      .limit(1)
    
    return rows[0] || null
  } catch (error) {
    console.error('⚠️ Could not fetch article detail (Database unavailable during build):', error)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt || '',
    openGraph: { title: article.title, description: article.seoDescription || article.excerpt || '' },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-pearl)' }} className="educational-mode">
      <div style={{ paddingTop: '72px' }} />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <Link
          href="/books/articles"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-montserrat)',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--color-cosmos)',
            textDecoration: 'none',
            marginBottom: '2rem',
          }}
        >
          <ArrowLeft size={16} /> Back to Library
        </Link>
        <header style={{ marginBottom: '3rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--color-cosmos)',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
            }}
          >
            {article.title}
          </h1>
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              fontFamily: 'var(--font-montserrat)',
              fontSize: '0.9rem',
              color: 'rgba(26,35,126,0.5)',
              borderBottom: '1px solid rgba(26,35,126,0.1)',
              paddingBottom: '1.5rem',
            }}
          >
            {article.publishedAt && (
              <span>
                📅 {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(article.publishedAt))}
              </span>
            )}
          </div>
        </header>

        <div
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: '1.1rem',
            lineHeight: 2,
            color: '#2a2a30',
          }}
          className="article-body"
        >
          {article.content ? (
             <div dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
             <div style={{ background: 'rgba(26,35,126,0.05)', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center' }}>
               Content coming soon.
             </div>
          )}
        </div>

        <div style={{ marginTop: '4rem' }}>
          <ArcherDivider label="Ancient Wisdom for Modern Life" />
        </div>
      </div>
    </div>
  )
}
