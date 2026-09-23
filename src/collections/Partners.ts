import type { CollectionConfig } from 'payload';
import { slugField } from '@/fields/slug';
import { seoFieldGroup } from '@/fields/seo';

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'partnerType', 'relationshipType', 'isFeatured', 'createdAt'],
    group: 'Organization & Directory',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Partner / Organization Name',
    },
    slugField('name'),
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Organization Logo',
      admin: {
        description: 'Transparent PNG or SVG logo preferred.',
      },
    },
    {
      name: 'website',
      type: 'text',
      label: 'Official Website URL',
    },
    {
      name: 'partnerType',
      type: 'select',
      required: true,
      defaultValue: 'international_development',
      options: [
        { label: 'International Development Organization', value: 'international_development' },
        { label: 'Donor / Philanthropic Foundation', value: 'donor' },
        { label: 'Government / Public Sector Agency', value: 'government' },
        { label: 'Non-Governmental Organization (NGO)', value: 'ngo' },
        { label: 'Corporate / Private Sector Partner', value: 'corporate' },
        { label: 'Academic & Research Institution', value: 'academic_research' },
        { label: 'Impact Investor / Venture Fund', value: 'investor' },
        { label: 'Media & Communications Partner', value: 'media' },
        { label: 'Community & Grassroots Organization', value: 'community_organization' },
        { label: 'Other Strategic Partner', value: 'other' },
      ],
      label: 'Partner Category',
    },
    {
      name: 'relationshipType',
      type: 'select',
      defaultValue: 'strategic_partner',
      options: [
        { label: 'Strategic Partner', value: 'strategic_partner' },
        { label: 'Funding & Grant Partner', value: 'funding_partner' },
        { label: 'Programme Implementing Partner', value: 'implementing_partner' },
        { label: 'Technical & Curriculum Partner', value: 'technical_partner' },
        { label: 'Ecosystem & Alliance Member', value: 'ecosystem_partner' },
      ],
      label: 'Engagement / Relationship Type',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Partnership Overview',
      admin: {
        description: 'Brief overview of the partnership collaboration and institutional synergy.',
      },
    },
    {
      name: 'timeline',
      type: 'group',
      label: 'Partnership Timeline',
      fields: [
        {
          name: 'startYear',
          type: 'number',
          label: 'Collaboration Start Year',
          admin: {
            description: 'e.g., 2020',
          },
        },
        {
          name: 'endYear',
          type: 'number',
          label: 'Collaboration End Year (Leave empty if ongoing)',
        },
      ],
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Partner (Displayed on Homepage / Major Banners)',
      admin: {
        position: 'sidebar',
      },
    },
    seoFieldGroup,
  ],
};
