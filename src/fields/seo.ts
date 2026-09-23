import type { Field } from 'payload';

/**
 * Standardized SEO field group across all CMS collections.
 */
export const seoFieldGroup: Field = {
  name: 'seo',
  type: 'group',
  label: 'Search Engine Optimization (SEO)',
  admin: {
    description: 'Configure search engine metadata, Open Graph preview, and indexing controls.',
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
      admin: {
        description: 'Recommended: 50-60 characters. Appears in search results and browser tabs.',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      admin: {
        description:
          'Recommended: 150-160 characters. Concise summary of the page for search snippets.',
      },
    },
    {
      name: 'metaImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Social Sharing Image (Open Graph)',
      admin: {
        description: 'Recommended dimension: 1200 × 630 pixels.',
      },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      label: 'Hide from search engines (noindex)',
      defaultValue: false,
      admin: {
        description: 'Check to prevent web crawlers from indexing this item.',
      },
    },
  ],
};
