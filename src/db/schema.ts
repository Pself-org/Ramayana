import { mysqlTable, varchar, text, timestamp, boolean, int, mysqlEnum } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: mysqlEnum('role', ['admin', 'editor', 'user']).default('user'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const media = mysqlTable('media', {
  id: int('id').primaryKey().autoincrement(),
  filename: varchar('filename', { length: 255 }).notNull(),
  mimeType: varchar('mime_type', { length: 128 }),
  filesize: int('filesize'),
  url: varchar('url', { length: 1024 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const subscribers = mysqlTable('subscribers', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  source: varchar('source', { length: 255 }),
  active: boolean('active').default(true),
  subscribedAt: timestamp('subscribed_at').defaultNow(),
});

export const articles = mysqlTable('articles', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 512 }).notNull(),
  slug: varchar('slug', { length: 512 }).notNull().unique(),
  content: text('content'), // Will hold Lexical JSON or HTML string
  published: boolean('published').default(false),
  publishedAt: timestamp('published_at'),
  authorId: int('author_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const podcastEpisodes = mysqlTable('podcast_episodes', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 512 }).notNull(),
  description: text('description'),
  audioUrl: varchar('audio_url', { length: 1024 }),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const explainerVideos = mysqlTable('explainer_videos', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 512 }).notNull(),
  videoUrl: varchar('video_url', { length: 1024 }),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const audioTracks = mysqlTable('audio_tracks', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 512 }).notNull(),
  trackUrl: varchar('track_url', { length: 1024 }),
  createdAt: timestamp('created_at').defaultNow(),
});
