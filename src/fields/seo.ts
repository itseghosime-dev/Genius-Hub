import type { Field } from 'payload';

/**
 * Standardized, comprehensive SEO field group across all public and indexable collections.
 * All fields are optional — the frontend dynamically computes intelligent defaults.
 */
export const seoFieldGroup: Field = {
  name: 'seo',
  type: 'group',
  label: 'Search Engine Optimization (SEO)',
  admin: {
    description:
      'Configure search engine metadata, Open Graph previews, and web crawler indexing controls.',
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      localized: true,
      label: 'Meta Title',
      admin: {
        description:
          'Recommended: 50–60 characters. Appears in search results and browser title bars. Falls back to entity title.',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
      label: 'Meta Description',
      admin: {
        description:
          'Recommended: 150–160 characters. Search result summary snippet. Falls back to short description/summary.',
      },
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      label: 'Canonical URL Override',
      admin: {
        description:
          'Optional absolute URL override. Leave empty to automatically use the standard canonical URL.',
      },
    },
    {
      name: 'ogTitle',
      type: 'text',
      localized: true,
      label: 'Open Graph (Social) Title',
      admin: {
        description:
          'Custom title for social card sharing (Facebook, LinkedIn, Twitter/X). Falls back to Meta Title.',
      },
    },
    {
      name: 'ogDescription',
      type: 'textarea',
      localized: true,
      label: 'Open Graph (Social) Description',
      admin: {
        description: 'Custom summary for social card previews. Falls back to Meta Description.',
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Open Graph / Social Sharing Image',
      admin: {
        description:
          'Recommended resolution: 1200 × 630 pixels. Falls back to hero media or global brand card.',
      },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
      label: 'noindex (Prevent search engines from indexing this page)',
      admin: {
        description: 'Check to instruct search engines NOT to display this page in search results.',
      },
    },
    {
      name: 'noFollow',
      type: 'checkbox',
      defaultValue: false,
      label: 'nofollow (Do not follow outbound links on this page)',
      admin: {
        description: 'Check to instruct search crawlers NOT to crawl links on this page.',
      },
    },
    {
      name: 'customJsonLd',
      type: 'textarea',
      label: 'Custom Structured Data Override (JSON-LD)',
      admin: {
        description: 'Optional raw JSON-LD schema override for advanced schema customization.',
      },
    },
  ],
};
