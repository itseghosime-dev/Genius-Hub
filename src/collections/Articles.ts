import type { CollectionConfig } from 'payload';
import { slugField } from '@/fields/slug';
import { seoFieldGroup } from '@/fields/seo';

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'status'],
    group: 'Editorial & Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Article Headline',
    },
    slugField('title'),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Article Summary / Excerpt',
      admin: {
        description: 'Short teaser displayed in news grids, newsletters, and search snippets.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Full Article Body',
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'people',
      hasMany: true,
      label: 'Authors & Contributors',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'insights',
      options: [
        { label: 'Industry Insights & Thought Leadership', value: 'insights' },
        { label: 'Corporate News & Announcements', value: 'news' },
        { label: 'Field Dispatches & Case Studies', value: 'case_study' },
        { label: 'Policy & Development Research', value: 'research' },
        { label: 'Community Stories', value: 'community' },
      ],
      label: 'Editorial Category',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publication Date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Cover Image',
    },
    {
      name: 'relatedProgrammes',
      type: 'relationship',
      relationTo: 'programmes',
      hasMany: true,
      label: 'Related Programmes',
    },
    {
      name: 'relatedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'Related Projects',
    },
    {
      name: 'relatedEvents',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      label: 'Related Events',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      label: 'Status',
      admin: {
        position: 'sidebar',
      },
    },
    seoFieldGroup,
  ],
};
