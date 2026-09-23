import type { CollectionConfig } from 'payload';
import {
  publicReadOrRequirePermission,
  requirePermissionAccess,
} from '@/lib/access/payload-access';
import { seoFieldGroup } from '@/fields/seo';
import { slugField } from '@/fields/slug';

export const FocusAreas: CollectionConfig = {
  slug: 'focus-areas',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'displayOrder', 'isFeatured', 'updatedAt'],
    group: 'Programmes & Impact',
  },
  access: {
    read: publicReadOrRequirePermission('focus_areas.read'),
    create: requirePermissionAccess('focus_areas.create'),
    update: requirePermissionAccess('focus_areas.update'),
    delete: requirePermissionAccess('focus_areas.delete'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Focus Area Title',
      admin: {
        description:
          'Strategic development pillar (e.g., Digital Skills & Technology, TVET & Vocational Mastery, Enterprise Incubation, Migration Reintegration).',
      },
    },
    slugField('title'),
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Strategic Overview & Mission Statement',
      admin: {
        description:
          'Comprehensive overview of the developmental rationale, objectives, and impact.',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Pillar Icon / Graphical Symbol',
      admin: {
        description: 'SVG or transparent PNG icon representing this focus area.',
      },
    },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Artwork / Feature Image',
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Pillar on Homepage Navigation & Impact Matrix',
      admin: {
        position: 'sidebar',
      },
    },
    seoFieldGroup,
  ],
};
