import type { CollectionConfig } from 'payload';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(__dirname, '../../public/media'),
    mimeTypes: [
      'image/*',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'video/*',
    ],
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 320,
        height: 240,
        fit: 'cover',
      },
      {
        name: 'card',
        width: 640,
        height: 480,
        fit: 'cover',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        fit: 'cover',
      },
    ],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'alt', 'mediaType', 'dateCaptured', 'updatedAt'],
    group: 'Assets & Media',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alternative Text (Alt)',
      admin: {
        description:
          'Crucial for accessibility (WCAG 2.2 AA) and image SEO. Describe the visual content.',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title / Label',
      admin: {
        description: 'Descriptive title for internal search and media library organization.',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Caption',
      admin: {
        description: 'Editorial caption displayed below the media item in stories and galleries.',
      },
    },
    {
      name: 'mediaType',
      type: 'select',
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Document (PDF/Doc)', value: 'document' },
        { label: 'Video Asset', value: 'video' },
      ],
      label: 'Asset Type',
    },
    {
      name: 'attribution',
      type: 'group',
      label: 'Attribution & Rights',
      fields: [
        {
          name: 'photographerOrSource',
          type: 'text',
          label: 'Photographer / Asset Source',
          admin: {
            description: 'Name of the photographer, agency, or originating source.',
          },
        },
        {
          name: 'copyrightNotes',
          type: 'text',
          label: 'Copyright / Usage Rights',
          admin: {
            description: 'Rights constraints or creative license details.',
          },
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location / Venue',
      admin: {
        description:
          'Geographic location where photo/video was captured (e.g., Benin City, Lagos, Abuja).',
      },
    },
    {
      name: 'dateCaptured',
      type: 'date',
      label: 'Date Captured',
      admin: {
        description: 'Historical date when the asset was originally captured.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Organizational Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description:
          'Tags for categorization (e.g., #DigitalSkills, #WomenInTech, #Graduation2026).',
      },
    },
    {
      name: 'externalVideoUrl',
      type: 'text',
      label: 'External Video URL (YouTube / Vimeo)',
      admin: {
        description: 'Optional embedded video link for streamable assets.',
      },
    },
  ],
};
