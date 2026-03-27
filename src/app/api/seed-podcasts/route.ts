import { NextResponse } from 'next/server'
import { getDb } from '@/db'
import { podcastEpisodes as podcastEpisodesTable } from '@/db/schema'
import podcastsData from '@/data/podcasts.json'
import { eq, sql } from 'drizzle-orm'

export async function GET() {
  try {
    const db = await getDb()
    
    // Manual schema patch for Hostinger since build-time drizzle-kit push might fail
    // We use a multi-step approach since 'IF NOT EXISTS' is not supported in all MySQL/MariaDB versions
    try {
      // Step 1: Just try to add it. If it exists, MySQL will throw an error we can catch.
      await db.execute(sql`ALTER TABLE podcast_episodes ADD youtube_id VARCHAR(64)`)
    } catch (e: any) {
      // 1060 is the error code for 'Duplicate column name'
      if (e.errno === 1060 || e.code === 'ER_DUP_FIELDNAME') {
        console.log('youtube_id column already exists.')
      } else {
        console.error('Failed to add column:', e)
      }
    }

    let inserted = 0
    let updated = 0

    for (const ep of podcastsData) {
      const existing = await db.select().from(podcastEpisodesTable).where(eq(podcastEpisodesTable.youtubeId, ep.youtubeId as string)).limit(1)
      
      if (existing.length === 0) {
        await db.insert(podcastEpisodesTable).values({
          title: ep.title,
          slug: ep.slug,
          description: ep.description,
          audioUrl: ep.audioUrl,
          youtubeId: ep.youtubeId,
          duration: ep.duration,
          seoTitle: ep.seoTitle,
          seoDescription: ep.seoDescription,
          status: 'published' as const,
          publishedAt: new Date(ep.publishedAt)
        })
        inserted++
      } else {
        await db.update(podcastEpisodesTable).set({
          title: ep.title,
          slug: ep.slug,
          description: ep.description,
          duration: ep.duration,
          publishedAt: new Date(ep.publishedAt)
        }).where(eq(podcastEpisodesTable.youtubeId, ep.youtubeId as string))
        updated++
      }
    }

    return NextResponse.json({ success: true, message: `Schema checked. Inserted ${inserted} new podcasts. Updated ${updated} existing podcasts.` })
  } catch (error) {
    console.error('Failed to seed podcasts:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
