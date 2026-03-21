import type { CollectionConfig } from 'payload'

export const AudioTracks: CollectionConfig = {
  slug: 'audio-tracks',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'status'],
    group: 'Content',
    description: 'Manage Shlokas, chants, and original music tracks.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Track Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        { label: '🙏 Vedic Chant / Shloka', value: 'chant' },
        { label: '🎵 Original Music', value: 'music' },
      ],
    },
    {
      name: 'audioUrl',
      type: 'text',
      required: true,
      label: 'Audio File URL (MP3 / streaming link)',
    },
    {
      name: 'artist',
      type: 'text',
      label: 'Artist / Vocalist',
    },
    {
      name: 'lyricsSanskrit',
      type: 'textarea',
      label: 'Sanskrit / Devanagari Lyrics',
    },
    {
      name: 'lyricsTransliteration',
      type: 'textarea',
      label: 'Transliteration (Roman script)',
    },
    {
      name: 'lyricsEnglish',
      type: 'textarea',
      label: 'English Translation',
    },
    {
      name: 'meaning',
      type: 'richText',
      label: 'Deeper Meaning / Commentary',
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duration (e.g. 4:32)',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Art',
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      label: 'Publish Date',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: '✅ Published', value: 'published' },
        { label: '📝 Draft', value: 'draft' },
      ],
      defaultValue: 'draft',
      required: true,
    },
  ],
  timestamps: true,
}
