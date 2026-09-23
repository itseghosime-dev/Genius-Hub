/**
 * Genius Hub Staff Roles.
 *
 * Defines the 10 distinct staff responsibility roles across the organization.
 * A single staff member may hold multiple roles simultaneously.
 */
export const STAFF_ROLES = [
  'super_admin',
  'admin',
  'content_editor',
  'content_approver',
  'events_manager',
  'programmes_manager',
  'media_manager',
  'applications_manager',
  'commerce_manager',
  'communications_manager',
] as const;

export type StaffRole = (typeof STAFF_ROLES)[number];

export const STAFF_ROLE_OPTIONS: { label: string; value: StaffRole; description: string }[] = [
  {
    label: 'Super Administrator',
    value: 'super_admin',
    description:
      'Highest normal organizational authority (e.g. Founder/CEO). Full access across all systems, staff management, and approval overrides.',
  },
  {
    label: 'Administrator',
    value: 'admin',
    description:
      'Senior administrative officer. Manages staff accounts, organizational settings, and publishes cross-departmental content.',
  },
  {
    label: 'Content Editor',
    value: 'content_editor',
    description:
      'Editorial contributor. Creates and edits articles, success stories, and media for review.',
  },
  {
    label: 'Content Approver',
    value: 'content_approver',
    description:
      'Lead editor / reviewer. Reviews, approves, and publishes submitted articles, stories, and public announcements.',
  },
  {
    label: 'Events Manager',
    value: 'events_manager',
    description:
      'Events coordinator. Manages summits, workshops, exhibitions, schedules, and event locations.',
  },
  {
    label: 'Programmes Manager',
    value: 'programmes_manager',
    description:
      'TVET & capacity building lead. Manages training programmes, curricula, project deliverables, and partner alignment.',
  },
  {
    label: 'Media Manager',
    value: 'media_manager',
    description:
      'Digital asset archivist. Uploads, tags, organizes, and maintains the global photography and video archives.',
  },
  {
    label: 'Applications Manager',
    value: 'applications_manager',
    description:
      'Admissions officer. Reviews and processes training applications and beneficiary registrations.',
  },
  {
    label: 'Commerce Manager',
    value: 'commerce_manager',
    description:
      'Enterprise & studio sales lead. Manages physical/digital products, training products, and studio service bookings.',
  },
  {
    label: 'Communications Manager',
    value: 'communications_manager',
    description:
      'Public affairs & PR lead. Manages institutional partners, leadership profiles, press releases, and newsletter campaigns.',
  },
];
