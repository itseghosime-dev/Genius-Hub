import type { CollectionConfig } from 'payload';
import { slugField } from '@/fields/slug';
import { seoFieldGroup } from '@/fields/seo';

export const Programmes: CollectionConfig = {
  slug: 'programmes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'programmeType', 'applicationStatus', 'isFeatured', 'status'],
    group: 'Programmes & Impact',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Programme Title',
    },
    slugField('title'),
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Short Description / Summary',
      admin: {
        description: 'Concise summary for programme cards, catalogue views, and search previews.',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      label: 'Full Programme Curriculum & Overview',
    },
    {
      name: 'programmeType',
      type: 'select',
      required: true,
      defaultValue: 'digital_skills',
      options: [
        { label: 'Digital Skills & Tech Innovation', value: 'digital_skills' },
        { label: 'Vocational & TVET Training', value: 'vocational_tvet' },
        { label: 'Entrepreneurship & Enterprise Incubation', value: 'entrepreneurship' },
        { label: 'Migration & Socio-Economic Reintegration', value: 'migration_reintegration' },
        { label: 'Women Empowerment & Gender Inclusion', value: 'women_empowerment' },
        { label: 'Youth Employment & Apprenticeship', value: 'youth_employment' },
        { label: 'Leadership & Institutional Capacity', value: 'leadership_governance' },
        { label: 'Other Development Initiative', value: 'other' },
      ],
      label: 'Programme Focus Category',
    },
    {
      name: 'focusAreas',
      type: 'array',
      label: 'Key Skill Pillars & Focus Tracks',
      fields: [
        {
          name: 'skill',
          type: 'text',
          required: true,
          label: 'Track / Module (e.g., UI/UX Design, Fashion Design, Solar Tech)',
        },
      ],
    },
    {
      name: 'targetAudience',
      type: 'text',
      label: 'Target Audience & Eligibility',
      admin: {
        description:
          'e.g., Unemployed youth, returning migrants, female entrepreneurs, tech enthusiasts.',
      },
    },
    {
      name: 'deliveryFormat',
      type: 'select',
      defaultValue: 'hybrid',
      options: [
        { label: 'In-Person (Onsite Training Center)', value: 'in_person' },
        { label: 'Virtual (Online Learning Platform)', value: 'virtual' },
        { label: 'Hybrid (Combined Classroom & Online)', value: 'hybrid' },
      ],
      label: 'Delivery Mode',
    },
    {
      name: 'locations',
      type: 'array',
      label: 'Training Hub Locations',
      fields: [
        {
          name: 'location',
          type: 'text',
          required: true,
          label: 'Location / State (e.g., Edo Innovation Hub, Lagos, Abuja)',
        },
      ],
    },
    {
      name: 'schedule',
      type: 'group',
      label: 'Timeline & Cohort Schedule',
      fields: [
        { name: 'startDate', type: 'date', label: 'Cohort Start Date' },
        { name: 'endDate', type: 'date', label: 'Cohort End Date' },
        {
          name: 'isOngoing',
          type: 'checkbox',
          defaultValue: true,
          label: 'Continuous / Rolling Admissions Programme',
        },
      ],
    },
    {
      name: 'applicationStatus',
      type: 'select',
      defaultValue: 'open',
      options: [
        { label: 'Applications Open', value: 'open' },
        { label: 'Upcoming Cohort (Pre-registration)', value: 'upcoming' },
        { label: 'Applications Closed', value: 'closed' },
        { label: 'By Direct Invitation / Nomination', value: 'by_invitation' },
      ],
      label: 'Application Status',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'applicationUrl',
      type: 'text',
      label: 'Application Portal URL / Form Link',
      admin: {
        description: 'Internal registration route or external portal endpoint.',
      },
    },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Cover Image / Video',
    },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Programme Gallery & Workshop Photographs',
    },
    {
      name: 'partners',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
      label: 'Programme Sponsoring & Implementing Partners',
    },
    {
      name: 'impactStatistics',
      type: 'array',
      label: 'Key Programme Impact Metrics',
      fields: [
        { name: 'metricValue', type: 'text', required: true, label: 'Value (e.g., 5,000+, 85%)' },
        {
          name: 'metricLabel',
          type: 'text',
          required: true,
          label: 'Label (e.g., Beneficiaries Trained, Job Placement Rate)',
        },
        { name: 'metricDescription', type: 'text', label: 'Contextual Note' },
      ],
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured on Homepage',
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
      label: 'Publication Status',
      admin: {
        position: 'sidebar',
      },
    },
    seoFieldGroup,
  ],
};
