import { NextResponse } from 'next/server'
import { getDb } from '@/db'
import { podcastEpisodes as podcastEpisodesTable } from '@/db/schema'
import podcastsData from '@/data/podcasts.json'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    const db = await getDb()
    let inserted = 0
    let updated = 0

    for (const ep of podcastsData) {
      const existing = await db.select().from(podcastEpisodesTable).where(eq(podcastEpisodesTable.youtubeId, ep.youtubeId)).limit(1)
      
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
        }).where(eq(podcastEpisodesTable.youtubeId, ep.youtubeId))
        updated++
      }
    }

    return NextResponse.json({ success: true, message: `Inserted ${inserted} new podcasts. Updated ${updated} existing podcasts.` })
  } catch (error) {
    console.error('Failed to seed podcasts:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
