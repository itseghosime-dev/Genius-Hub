import type { CollectionConfig } from 'payload';
import { slugField } from '@/fields/slug';
import { seoFieldGroup } from '@/fields/seo';

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventType', 'format', 'schedule.startDateTime', 'status'],
    group: 'Community & Events',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Event Title',
    },
    slugField('title'),
    {
      name: 'description',
      type: 'richText',
      label: 'Event Agenda & Overview',
    },
    {
      name: 'eventType',
      type: 'select',
      required: true,
      defaultValue: 'workshop',
      options: [
        { label: 'Interactive Workshop / Masterclass', value: 'workshop' },
        { label: 'Summit / Conference', value: 'summit' },
        { label: 'Hackathon / Innovation Challenge', value: 'hackathon' },
        { label: 'Exhibition / Demo Day', value: 'exhibition' },
        { label: 'Webinar / Online Panel', value: 'webinar' },
        { label: 'Community Meetup / Networking', value: 'meetup' },
        { label: 'Graduation / Induction Ceremony', value: 'ceremony' },
        { label: 'Other Event', value: 'other' },
      ],
      label: 'Event Category',
    },
    {
      name: 'format',
      type: 'select',
      defaultValue: 'in_person',
      options: [
        { label: 'In-Person (Physical Venue)', value: 'in_person' },
        { label: 'Virtual (Online Stream / Zoom / Teams)', value: 'virtual' },
        { label: 'Hybrid (Simultaneous Physical & Streamed)', value: 'hybrid' },
      ],
      label: 'Event Format',
    },
    {
      name: 'schedule',
      type: 'group',
      label: 'Event Timing',
      fields: [
        {
          name: 'startDateTime',
          type: 'date',
          required: true,
          label: 'Start Date & Time',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'endDateTime',
          type: 'date',
          label: 'End Date & Time',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'timezone',
          type: 'text',
          defaultValue: 'Africa/Lagos',
          label: 'Timezone',
        },
      ],
    },
    {
      name: 'venue',
      type: 'group',
      label: 'Physical Venue Details',
      fields: [
        { name: 'venueName', type: 'text', label: 'Venue Name / Hub Facility' },
        { name: 'address', type: 'text', label: 'Street Address' },
        {
          name: 'city',
          type: 'text',
          label: 'City / State',
          defaultValue: 'Benin City, Edo State',
        },
        { name: 'country', type: 'text', label: 'Country', defaultValue: 'Nigeria' },
      ],
    },
    {
      name: 'onlineAccess',
      type: 'group',
      label: 'Virtual Stream Details',
      fields: [
        { name: 'meetingUrl', type: 'text', label: 'Livestream / Meeting URL' },
        {
          name: 'accessInstructions',
          type: 'textarea',
          label: 'Access Instructions / Passcode Info',
        },
      ],
    },
    {
      name: 'speakers',
      type: 'relationship',
      relationTo: 'people',
      hasMany: true,
      label: 'Featured Speakers, Instructors & Panelists',
    },
    {
      name: 'partners',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
      label: 'Event Sponsors & Co-Organizers',
    },
    {
      name: 'relatedProgramme',
      type: 'relationship',
      relationTo: 'programmes',
      label: 'Related Programme Umbrella',
    },
    {
      name: 'relatedProject',
      type: 'relationship',
      relationTo: 'projects',
      label: 'Related Project Initiative',
    },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Event Banner / Promotional Artwork',
    },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Event Photo Gallery',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published / Active', value: 'published' },
        { label: 'Postponed', value: 'postponed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
      ],
      label: 'Event Status',
      admin: {
        position: 'sidebar',
      },
    },
    seoFieldGroup,
  ],
};
