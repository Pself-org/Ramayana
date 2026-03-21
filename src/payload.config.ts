import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { PodcastEpisodes } from './collections/PodcastEpisodes'
import { ExplainerVideos } from './collections/ExplainerVideos'
import { AudioTracks } from './collections/AudioTracks'
import { Articles } from './collections/Articles'
import { Subscribers } from './collections/Subscribers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Ramayana Odyssey Admin',
      description: 'Manage all content for the Ramayana Odyssey platform.',
    },
  },
  collections: [
    Users,
    Media,
    PodcastEpisodes,
    ExplainerVideos,
    AudioTracks,
    Articles,
    Subscribers,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true,
  }),
  sharp,
  plugins: [],
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'],
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'],
  upload: {
    limits: {
      fileSize: 50_000_000, // 50 MB
    },
  },
})
