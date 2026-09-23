import type { CollectionConfig } from 'payload';
import {
  publicReadOrRequirePermission,
  requirePermissionAccess,
} from '@/lib/access/payload-access';
import { seoFieldGroup } from '@/fields/seo';
import { slugField } from '@/fields/slug';
import {
  createWorkflowBeforeChangeHook,
  WORKFLOW_STATUS_OPTIONS,
  workflowFieldGroup,
} from '@/fields/workflow';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'parentProgramme', 'status', 'projectStatus', 'isFeatured'],
    group: 'Programmes & Impact',
  },
  access: {
    read: publicReadOrRequirePermission('projects.read'),
    create: requirePermissionAccess('projects.create'),
    update: requirePermissionAccess('projects.update'),
    delete: requirePermissionAccess('projects.delete'),
  },
  hooks: {
    beforeChange: [
      createWorkflowBeforeChangeHook({
        approvePermission: 'projects.approve',
        publishPermission: 'projects.publish',
      }),
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Project Title',
    },
    slugField('title'),
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Executive Summary',
      admin: {
        description:
          'Concise summary of the intervention, target beneficiaries, and overarching purpose.',
      },
    },
    {
      name: 'fullContent',
      type: 'richText',
      localized: true,
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
      name: 'focusAreas',
      type: 'relationship',
      relationTo: 'focus-areas',
      hasMany: true,
      label: 'Strategic Focus Areas',
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
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      label: 'Implementation Locations & Hubs',
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
      label: 'Project Operational Phase',
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
          localized: true,
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
          localized: true,
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
      localized: true,
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
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      options: WORKFLOW_STATUS_OPTIONS,
      label: 'Workflow Status',
      admin: {
        position: 'sidebar',
      },
    },
    workflowFieldGroup,
    seoFieldGroup,
  ],
};
