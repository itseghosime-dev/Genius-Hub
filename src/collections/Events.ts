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

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventType', 'format', 'schedule.startDateTime', 'status'],
    group: 'Community & Events',
  },
  access: {
    read: publicReadOrRequirePermission('events.read'),
    create: requirePermissionAccess('events.create'),
    update: requirePermissionAccess('events.update'),
    delete: requirePermissionAccess('events.delete'),
  },
  hooks: {
    beforeChange: [
      createWorkflowBeforeChangeHook({
        approvePermission: 'events.approve',
        publishPermission: 'events.publish',
      }),
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Event Title',
    },
    slugField('title'),
    {
      name: 'description',
      type: 'richText',
      localized: true,
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
      name: 'venueLocation',
      type: 'relationship',
      relationTo: 'locations',
      label: 'Designated Venue / Facility Location',
      admin: {
        description: 'Structured link to verified physical facility or innovation center.',
      },
    },
    {
      name: 'customVenueNotes',
      type: 'text',
      localized: true,
      label: 'Custom Venue / Room Notes (Optional)',
      admin: {
        description: 'e.g., Main Auditorium, Hall B, 3rd Floor.',
      },
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
          localized: true,
          label: 'Access Instructions / Passcode Info',
        },
      ],
    },
    {
      name: 'focusAreas',
      type: 'relationship',
      relationTo: 'focus-areas',
      hasMany: true,
      label: 'Strategic Focus Areas',
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
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Topic Tags',
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
