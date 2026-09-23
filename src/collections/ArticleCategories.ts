import type { CollectionConfig } from 'payload';
import { slugField } from '@/fields/slug';
import { seoFieldGroup } from '@/fields/seo';

export const ArticleCategories: CollectionConfig = {
  slug: 'article-categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'displayOrder', 'updatedAt'],
    group: 'Editorial & Content',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Category Name',
      admin: {
        description:
          'e.g., Insights & Thought Leadership, Corporate News, Field Dispatches, Policy Research.',
      },
    },
    slugField('name'),
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Category Description',
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
    seoFieldGroup,
  ],
};
