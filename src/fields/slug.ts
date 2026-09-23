import type { Field } from 'payload';

/**
 * Reusable slug field with automatic normalization hook.
 */
export const slugField = (fieldToUse = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  label: 'URL Slug',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: `Unique URL identifier. Auto-generated from "${fieldToUse}" if not specified.`,
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.trim()) {
          return value
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '');
        }
        if (data && typeof data[fieldToUse] === 'string' && data[fieldToUse].trim()) {
          return data[fieldToUse]
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '');
        }
        return value;
      },
    ],
  },
});
