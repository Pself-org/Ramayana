import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'source', 'subscribedAt', 'active'],
    group: 'Admin',
    description: 'Newsletter subscribers. Exportable as CSV from the Payload admin.',
  },
  access: {
    // Only admins and editors can read subscribers
    read: ({ req: { user } }) => !!user,
    // Subscribers are created via the public API route only
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      label: 'Email Address',
    },
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
    },
    {
      name: 'source',
      type: 'select',
      label: 'Sign-up Source',
      options: [
        { label: 'Homepage Hero', value: 'homepage' },
        { label: 'Footer Form', value: 'footer' },
        { label: 'Dedicated Subscribe Page', value: 'subscribe-page' },
        { label: 'Podcast Page', value: 'podcast' },
        { label: 'API / Other', value: 'api' },
      ],
      defaultValue: 'homepage',
    },
    {
      name: 'subscribedAt',
      type: 'date',
      label: 'Subscribed At',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Active Subscriber',
      defaultValue: true,
    },
  ],
  timestamps: true,
}
