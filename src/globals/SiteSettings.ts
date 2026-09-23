import type { GlobalConfig } from 'payload';
import { requirePermissionAccess } from '@/lib/access/payload-access';
import { seoFieldGroup } from '@/fields/seo';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site & Brand Settings',
  admin: {
    group: 'Admin & Governance',
  },
  access: {
    read: () => true, // Public brand and institutional channels are readable
    update: requirePermissionAccess('settings.update'),
  },
  fields: [
    {
      name: 'brand',
      type: 'group',
      label: 'Brand Identity',
      fields: [
        {
          name: 'brandName',
          type: 'text',
          defaultValue: 'Genius Hub',
          required: true,
        },
        {
          name: 'legalName',
          type: 'text',
          defaultValue: 'Genius Hub Global',
          required: true,
        },
        {
          name: 'tagline',
          type: 'text',
          localized: true,
          defaultValue: 'Human impact and the future of work',
        },
        {
          name: 'organizationOrigin',
          type: 'text',
          defaultValue: 'Nigeria',
          admin: {
            description: 'A global development organization originating from Nigeria.',
          },
        },
        {
          name: 'founderStorytelling',
          type: 'text',
          localized: true,
          defaultValue: 'Founded by Isimeme Whyte',
          label: 'Founder Citation / Storytelling Anchor',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Institutional Contact Channels',
      fields: [
        { name: 'generalEmail', type: 'email', defaultValue: 'info@geniushubglobal.com' },
        { name: 'admissionsEmail', type: 'email', defaultValue: 'admissions@geniushubglobal.com' },
        {
          name: 'partnershipsEmail',
          type: 'email',
          defaultValue: 'partnerships@geniushubglobal.com',
        },
        { name: 'phoneNumber', type: 'text', defaultValue: '+234 800 000 0000' },
        {
          name: 'headquartersAddress',
          type: 'textarea',
          localized: true,
          defaultValue: 'Benin City, Edo State, Nigeria',
        },
      ],
    },
    {
      name: 'socialChannels',
      type: 'group',
      label: 'Official Social Media Handles',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          defaultValue: 'https://linkedin.com/company/geniushubglobal',
        },
        { name: 'twitter', type: 'text', defaultValue: 'https://twitter.com/geniushubglobal' },
        { name: 'instagram', type: 'text', defaultValue: 'https://instagram.com/geniushubglobal' },
        { name: 'facebook', type: 'text', defaultValue: 'https://facebook.com/geniushubglobal' },
        { name: 'youtube', type: 'text', defaultValue: 'https://youtube.com/@geniushubglobal' },
      ],
    },
    seoFieldGroup,
  ],
};
