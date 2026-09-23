import type { CollectionConfig } from 'payload';
import { slugField } from '@/fields/slug';
import { seoFieldGroup } from '@/fields/seo';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'parentProgramme', 'projectStatus', 'isFeatured', 'updatedAt'],
    group: 'Programmes & Impact',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },
    slugField('title'),
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Executive Summary',
      admin: {
        description:
          'Concise summary of the intervention, target beneficiaries, and overarching purpose.',
      },
    },
    {
      name: 'fullContent',
      type: 'richText',
      label: 'Comprehensive Project Scope & Methodology',
    },
    {
      name: 'parentProgramme',
      type: 'relationship',
      relationTo: 'programmes',
      label: 'Parent Programme Umbrella',
      admin: {
        description: 'The broader institutional programme this specific project operationalizes.',
      },
    },
    {
      name: 'partners',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
      label: 'Funding & Implementing Partners for this Project',
    },
    {
      name: 'locations',
      type: 'array',
      label: 'Project Implementation Locations',
      fields: [
        {
          name: 'location',
          type: 'text',
          required: true,
          label: 'Target Community / City / Region',
        },
      ],
    },
    {
      name: 'timeline',
      type: 'group',
      label: 'Project Execution Timeline',
      fields: [
        { name: 'startDate', type: 'date', label: 'Commencement Date' },
        { name: 'endDate', type: 'date', label: 'Completion Date' },
      ],
    },
    {
      name: 'projectStatus',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Planned / Upcoming Intervention', value: 'planned' },
        { label: 'Active / In-Progress', value: 'active' },
        { label: 'Completed & Evaluated', value: 'completed' },
        { label: 'On Hold', value: 'on_hold' },
      ],
      label: 'Project Status',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'beneficiaryMetrics',
      type: 'array',
      label: 'Target & Realized Beneficiary Metrics',
      fields: [
        {
          name: 'metricName',
          type: 'text',
          required: true,
          label: 'Metric Name (e.g., Youths Trained, Startups Funded)',
        },
        {
          name: 'metricValue',
          type: 'text',
          required: true,
          label: 'Value / Number (e.g., 1,200, $50,000)',
        },
        {
          name: 'unitOrContext',
          type: 'text',
          label: 'Demographic / Context (e.g., 60% Female, Edo State)',
        },
      ],
    },
    {
      name: 'fundingAndSupport',
      type: 'group',
      label: 'Funding & Grant Disclosures',
      fields: [
        { name: 'donorOrFunder', type: 'text', label: 'Lead Donor / Grantor Organization' },
        { name: 'grantDetails', type: 'text', label: 'Grant Title / Reference Number' },
      ],
    },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Project Feature Image',
    },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Field Photography & Implementation Media',
    },
    {
      name: 'outcomes',
      type: 'textarea',
      label: 'Key Outcomes & Measurable Impact',
    },
    {
      name: 'reportsAndDocuments',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Published Project Reports, Impact Whitepapers & PDFs',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Project Showcase',
      admin: {
        position: 'sidebar',
      },
    },
    seoFieldGroup,
  ],
};
