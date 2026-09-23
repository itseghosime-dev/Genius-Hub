import type { CollectionConfig } from 'payload';
import {
  publicReadOrRequirePermission,
  requirePermissionAccess,
} from '@/lib/access/payload-access';
import { slugField } from '@/fields/slug';

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    group: 'Taxonomies & Tags',
  },
  access: {
    read: publicReadOrRequirePermission('taxonomies.read'),
    create: requirePermissionAccess('taxonomies.create'),
    update: requirePermissionAccess('taxonomies.update'),
    delete: requirePermissionAccess('taxonomies.delete'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Tag Name',
      admin: {
        description:
          'Lightweight topic keyword (e.g., UI/UX, Renewable Energy, Youth Development, Apprenticeships).',
      },
    },
    slugField('name'),
  ],
};
