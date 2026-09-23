import type { CollectionConfig } from 'payload';
import {
  publicReadOrRequirePermission,
  requirePermissionAccess,
} from '@/lib/access/payload-access';
import { seoFieldGroup } from '@/fields/seo';
import { slugField } from '@/fields/slug';

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'stateOrRegion', 'locationType', 'isOffice', 'updatedAt'],
    group: 'Organization & Directory',
  },
  access: {
    read: publicReadOrRequirePermission('locations.read'),
    create: requirePermissionAccess('locations.create'),
    update: requirePermissionAccess('locations.update'),
    delete: requirePermissionAccess('locations.delete'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Location / Facility Name',
      admin: {
        description: 'e.g., Genius Hub Headquarters, Edo Innovation Center, Lagos Training Hub.',
      },
    },
    slugField('name'),
    {
      name: 'locationType',
      type: 'select',
      required: true,
      defaultValue: 'hub_facility',
      options: [
        { label: 'Innovation Hub / Facility', value: 'hub_facility' },
        { label: 'Headquarters / Regional Office', value: 'office' },
        { label: 'Vocational Training Center', value: 'training_center' },
        { label: 'Community Workshop Venue', value: 'community_venue' },
        { label: 'Partner Facility / Campus', value: 'partner_facility' },
        { label: 'Other Location', value: 'other' },
      ],
      label: 'Location Category',
    },
    {
      name: 'address',
      type: 'text',
      localized: true,
      label: 'Street Address (Optional)',
      admin: {
        description: 'Physical street address if applicable (not required for all field venues).',
      },
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Benin City',
      label: 'City / Town',
    },
    {
      name: 'stateOrRegion',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Edo State',
      label: 'State / Province / Region',
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Nigeria',
      label: 'Country',
    },
    {
      name: 'coordinates',
      type: 'group',
      label: 'Geographic Coordinates (GPS)',
      fields: [
        { name: 'latitude', type: 'number', label: 'Latitude (e.g., 6.3350)' },
        { name: 'longitude', type: 'number', label: 'Longitude (e.g., 5.6037)' },
      ],
    },
    {
      name: 'flags',
      type: 'group',
      label: 'Location Usage Flags',
      fields: [
        {
          name: 'isOffice',
          type: 'checkbox',
          defaultValue: false,
          label: 'Official Headquarters / Administrative Office',
        },
        {
          name: 'isProgrammeLocation',
          type: 'checkbox',
          defaultValue: true,
          label: 'Active Training Programme Location',
        },
        {
          name: 'isEventVenue',
          type: 'checkbox',
          defaultValue: true,
          label: 'Designated Event & Workshop Venue',
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Facility Contact Details',
      fields: [
        { name: 'phone', type: 'text', label: 'Facility Phone Number' },
        { name: 'email', type: 'email', label: 'Facility Email Address' },
      ],
    },
    {
      name: 'openingHours',
      type: 'text',
      localized: true,
      label: 'Operating / Opening Hours',
      admin: {
        description: 'e.g., Mon–Fri: 8:30 AM – 5:00 PM, Sat: 9:00 AM – 2:00 PM.',
      },
    },
    {
      name: 'mapDisplay',
      type: 'checkbox',
      defaultValue: true,
      label: 'Display Location on Interactive Maps & Directory',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isPublicPageEnabled',
      type: 'checkbox',
      defaultValue: false,
      label: 'Enable Dedicated Public Webpage for this Location',
      admin: {
        position: 'sidebar',
        description: 'When checked, generates a public route and renders SEO metadata.',
      },
    },
    seoFieldGroup,
  ],
};
