import type { CollectionConfig } from 'payload'

export const PodcastEpisodes: CollectionConfig = {
  slug: 'podcast-episodes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'status'],
    group: 'Content',
    description: 'Manage Ramayana Odyssey podcast episodes.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Episode Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug (e.g. ep-01-birth-of-rama)',
      admin: {
        description: 'Used in the URL. Use lowercase letters, numbers, and hyphens only.',
      },
    },
    {
      name: 'episodeNumber',
      type: 'number',
      label: 'Episode Number',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Episode Description',
    },
    {
      name: 'audioUrl',
      type: 'text',
      label: 'Audio File URL (Buzzsprout / direct MP3 link)',
      admin: {
        description: 'Paste the public MP3 or streaming URL here.',
      },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube Video URL (optional)',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail Image',
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duration (e.g. 42:30)',
    },
    {
      name: 'transcript',
      type: 'richText',
      label: 'Transcript',
    },
    {
      name: 'seoTitle',
      type: 'text',
      label: 'SEO Title (optional override)',
    },
    {
      name: 'seoDescription',
      type: 'text',
      label: 'SEO Meta Description',
      admin: {
        description: 'Keep under 160 characters.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publish Date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
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
