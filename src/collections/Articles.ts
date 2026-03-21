import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', 'status'],
    group: 'Content',
    description: 'Manage essays, articles, and reflections.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Article Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Excerpt / Preview Text',
      admin: {
        description: 'Shown on the article listing page. Keep under 200 characters.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author',
      defaultValue: 'Ramayana Odyssey Team',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: '📖 Essay', value: 'essay' },
        { label: '🪷 Reflection', value: 'reflection' },
        { label: '📜 Commentary', value: 'commentary' },
        { label: '📚 Book Review', value: 'book-review' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Article Body',
    },
    {
      name: 'readingTime',
      type: 'text',
      label: 'Reading Time (e.g. 8 min read)',
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
        description: 'Keep under 160 characters for best results.',
      },
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
