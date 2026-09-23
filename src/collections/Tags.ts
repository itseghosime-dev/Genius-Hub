import type { CollectionConfig } from 'payload';
import { slugField } from '@/fields/slug';

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    group: 'Taxonomies & Tags',
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
