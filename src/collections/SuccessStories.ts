import type { CollectionConfig } from 'payload';
import { slugField } from '@/fields/slug';
import { seoFieldGroup } from '@/fields/seo';

export const SuccessStories: CollectionConfig = {
  slug: 'success-stories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'beneficiaryName', 'relatedProgramme', 'isFeatured', 'status'],
    group: 'Programmes & Impact',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Story Title',
      admin: {
        description:
          'Compelling headline (e.g., "From Unemployed Graduate to Leading UI/UX Designer in Edo State").',
      },
    },
    slugField('title'),
    {
      name: 'beneficiaryName',
      type: 'text',
      required: true,
      label: 'Beneficiary / Alumni Full Name',
    },
    {
      name: 'beneficiaryRole',
      type: 'text',
      localized: true,
      label: 'Current Role / Enterprise Name',
      admin: {
        description: 'e.g., Founder at StitchLab Hub, Junior Software Engineer at TechCorp.',
      },
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      label: 'Beneficiary Location / Hub',
    },
    {
      name: 'focusAreas',
      type: 'relationship',
      relationTo: 'focus-areas',
      hasMany: true,
      label: 'Relevant Focus Areas',
    },
    {
      name: 'relatedProgramme',
      type: 'relationship',
      relationTo: 'programmes',
      label: 'Graduated Programme',
    },
    {
      name: 'relatedProject',
      type: 'relationship',
      relationTo: 'projects',
      label: 'Associated Project Cohort',
    },
    {
      name: 'quote',
      type: 'textarea',
      localized: true,
      label: 'Key Quote / Testimonial Excerpt',
      admin: {
        description: 'Highlighted pull-quote for impact cards and hero showcases.',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      label: 'Summary Story Card Overview',
    },
    {
      name: 'fullStory',
      type: 'richText',
      localized: true,
      label: 'In-Depth Success Journey & Narrative',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Topic Tags',
    },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Beneficiary Portrait / Hero Photo',
    },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Workplace & Workshop Photographs',
    },
    {
      name: 'impactMetrics',
      type: 'array',
      label: 'Quantifiable Outcomes Achieved',
      fields: [
        {
          name: 'metricValue',
          type: 'text',
          required: true,
          label: 'Metric Value (e.g., 300% Income Increase, 4 Employees)',
        },
        {
          name: 'metricLabel',
          type: 'text',
          required: true,
          localized: true,
          label: 'Metric Context / Description',
        },
      ],
    },
    {
      name: 'storyDate',
      type: 'date',
      label: 'Date Published / Recorded',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Story on Homepage & Impact Highlights',
      admin: {
        position: 'sidebar',
      },
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
