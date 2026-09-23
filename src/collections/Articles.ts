import type { CollectionConfig } from 'payload';
import {
  publicReadOrRequirePermission,
  requirePermissionAccess,
} from '@/lib/access/payload-access';
import { seoFieldGroup } from '@/fields/seo';
import { slugField } from '@/fields/slug';
import {
  createWorkflowBeforeChangeHook,
  WORKFLOW_STATUS_OPTIONS,
  workflowFieldGroup,
} from '@/fields/workflow';

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    group: 'Editorial & Content',
  },
  access: {
    read: publicReadOrRequirePermission('articles.read'),
    create: requirePermissionAccess('articles.create'),
    update: requirePermissionAccess('articles.update'),
    delete: requirePermissionAccess('articles.delete'),
  },
  hooks: {
    beforeChange: [
      createWorkflowBeforeChangeHook({
        approvePermission: 'articles.approve',
        publishPermission: 'articles.publish',
      }),
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Article Headline',
    },
    slugField('title'),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Article Summary / Excerpt',
      admin: {
        description: 'Short teaser displayed in news grids, newsletters, and search snippets.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      label: 'Full Article Body',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'article-categories',
      required: true,
      label: 'Article Editorial Category',
      admin: {
        description: 'Structured relationship to controlled editorial categories.',
      },
    },
    {
      name: 'focusAreas',
      type: 'relationship',
      relationTo: 'focus-areas',
      hasMany: true,
      label: 'Relevant Focus Areas / Pillars',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Topic Tags',
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'people',
      hasMany: true,
      label: 'Authors & Contributors',
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
      defaultValue: 'draft',
      required: true,
      options: WORKFLOW_STATUS_OPTIONS,
      label: 'Workflow Status',
      admin: {
        position: 'sidebar',
      },
    },
    workflowFieldGroup,
    seoFieldGroup,
  ],
};
