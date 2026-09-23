import type { CollectionConfig } from 'payload';
import { slugField } from '@/fields/slug';
import { seoFieldGroup } from '@/fields/seo';

export const People: CollectionConfig = {
  slug: 'people',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'role', 'organization', 'displayOrder', 'status'],
    group: 'Organization & Directory',
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    slugField('fullName'),
    {
      name: 'role',
      type: 'text',
      required: true,
      localized: true,
      label: 'Role / Designation',
      admin: {
        description:
          'Official position (e.g., Founder & CEO, Lead Technical Instructor, Board Advisor).',
      },
    },
    {
      name: 'organization',
      type: 'text',
      localized: true,
      defaultValue: 'Genius Hub Global',
      label: 'Organization / Institution',
    },
    {
      name: 'division',
      type: 'text',
      localized: true,
      label: 'Department / Division',
      admin: {
        description: 'e.g., Executive Leadership, Technology & Innovation, TVET Programmes.',
      },
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Portrait / Photograph',
    },
    {
      name: 'shortBio',
      type: 'textarea',
      localized: true,
      label: 'Short Bio / Summary',
      admin: {
        description: 'Brief 2-3 sentence introductory biography for cards and speaker profiles.',
      },
    },
    {
      name: 'fullBio',
      type: 'richText',
      localized: true,
      label: 'Full Biography',
      admin: {
        description: 'Comprehensive biographical and impact background.',
      },
    },
    {
      name: 'primaryLocation',
      type: 'relationship',
      relationTo: 'locations',
      label: 'Primary Operating Location / Hub',
    },
    {
      name: 'designations',
      type: 'group',
      label: 'Roles & Categorization Flags',
      fields: [
        {
          name: 'isLeadership',
          type: 'checkbox',
          defaultValue: false,
          label: 'Executive Leadership (e.g., Founder / Executive Director)',
        },
        {
          name: 'isBoardMember',
          type: 'checkbox',
          defaultValue: false,
          label: 'Board of Directors / Advisory Council',
        },
        {
          name: 'isTeamMember',
          type: 'checkbox',
          defaultValue: true,
          label: 'Core Staff / Team Member',
        },
        {
          name: 'isFacilitator',
          type: 'checkbox',
          defaultValue: false,
          label: 'Trainer / Programme Facilitator',
        },
        {
          name: 'isSpeaker',
          type: 'checkbox',
          defaultValue: false,
          label: 'Keynote Speaker / Panelist',
        },
        {
          name: 'isAuthor',
          type: 'checkbox',
          defaultValue: false,
          label: 'Editorial Author / Contributor',
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Public Social Profiles',
      fields: [
        { name: 'linkedin', type: 'text', label: 'LinkedIn Profile URL' },
        { name: 'twitter', type: 'text', label: 'Twitter / X Profile URL' },
        { name: 'instagram', type: 'text', label: 'Instagram Profile URL' },
        { name: 'website', type: 'text', label: 'Personal / Professional Website' },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information & Privacy Controls',
      fields: [
        { name: 'email', type: 'email', label: 'Email Address' },
        {
          name: 'showEmailPublicly',
          type: 'checkbox',
          defaultValue: false,
          label: 'Display Email on Public Profile',
        },
        { name: 'phone', type: 'text', label: 'Phone Number' },
        {
          name: 'showPhonePublicly',
          type: 'checkbox',
          defaultValue: false,
          label: 'Display Phone on Public Profile',
        },
      ],
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      label: 'Display Priority / Sorting Order',
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first (e.g., 1 for Founder/CEO).',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Alumni / Former', value: 'alumni' },
        { label: 'Inactive / Hidden', value: 'inactive' },
      ],
      label: 'Status',
      admin: {
        position: 'sidebar',
      },
    },
    seoFieldGroup,
  ],
};
