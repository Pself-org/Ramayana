import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ArcherDivider } from '@/components/ArcherDivider'

interface Props {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  try {
    const res = await fetch(
      `${baseUrl}/api/articles?where[slug][equals]=${slug}&where[status][equals]=published&limit=1`,
      { next: { revalidate: 60 } },
    )
    const data = await res.json()
    return data.docs?.[0] || null
  } catch {
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
          {article.category && (
            <div
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.875rem',
                background: 'rgba(238,170,0,0.15)',
                borderRadius: '2rem',
                fontFamily: 'var(--font-montserrat)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#b8860b',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
              }}
            >
              {article.category}
            </div>
          )}
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
            {article.author && <span>✍️ By {article.author}</span>}
            {article.publishedAt && (
              <span>
                📅 {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(article.publishedAt))}
              </span>
            )}
            {article.readingTime && <span>⏱ {article.readingTime} read</span>}
          </div>
        </header>

        {article.featuredImage && (
          <div style={{ marginBottom: '3rem', borderRadius: '1rem', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.featuredImage.url}
              alt={article.featuredImage.alt || article.title}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}

        <div
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: '1.1rem',
            lineHeight: 2,
            color: '#2a2a30',
          }}
          className="article-body"
          dangerouslySetInnerHTML={{ __html: '' }} // Requires payload's lexical-to-html conversion or rich-text-react renderer
        >
          {/* Article content (Lexical JSON) goes here - needs serialization component */}
          <div style={{ background: 'rgba(26,35,126,0.05)', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center' }}>
            [Article text will render here from Payload CMS. A Lexical-HTML serializer is usually mapped here.]
          </div>
        </div>

        <div style={{ marginTop: '4rem' }}>
          <ArcherDivider label="Ancient Wisdom for Modern Life" />
        </div>
      </div>
    </div>
  )
}
