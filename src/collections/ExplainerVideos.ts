import type { CollectionConfig } from 'payload'

export const ExplainerVideos: CollectionConfig = {
  slug: 'explainer-videos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'status'],
    group: 'Content',
    description: 'Manage Ramayana Odyssey YouTube explainer videos.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Video Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
    },
    {
      name: 'youtubeId',
      type: 'text',
      required: true,
      label: 'YouTube Video ID (e.g. dQw4w9WgXcQ)',
      admin: {
        description: 'Just the ID portion from the YouTube URL, not the full URL.',
      },
    },
    {
      name: 'summary',
      type: 'richText',
      label: 'Video Summary',
    },
    {
      name: 'topics',
      type: 'array',
      label: 'Topics / Tags',
      fields: [
        { name: 'topic', type: 'text' },
      ],
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
