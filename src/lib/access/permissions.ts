/**
 * Genius Hub Namespaced Staff Permissions.
 *
 * Granular permissions governing entities, workflows, and administrative actions.
 */
export const STAFF_PERMISSIONS = [
  // Articles
  'articles.read',
  'articles.create',
  'articles.update',
  'articles.submit',
  'articles.approve',
  'articles.publish',
  'articles.archive',
  'articles.delete',

  // Events
  'events.read',
  'events.create',
  'events.update',
  'events.submit',
  'events.approve',
  'events.publish',
  'events.archive',
  'events.delete',

  // Programmes
  'programmes.read',
  'programmes.create',
  'programmes.update',
  'programmes.submit',
  'programmes.approve',
  'programmes.publish',
  'programmes.archive',
  'programmes.delete',

  // Projects
  'projects.read',
  'projects.create',
  'projects.update',
  'projects.submit',
  'projects.approve',
  'projects.publish',
  'projects.archive',
  'projects.delete',

  // Success Stories
  'success_stories.read',
  'success_stories.create',
  'success_stories.update',
  'success_stories.submit',
  'success_stories.approve',
  'success_stories.publish',
  'success_stories.archive',
  'success_stories.delete',

  // Media
  'media.read',
  'media.create',
  'media.update',
  'media.delete',

  // People (Leadership & Directory)
  'people.read',
  'people.create',
  'people.update',
  'people.publish',
  'people.delete',

  // Partners
  'partners.read',
  'partners.create',
  'partners.update',
  'partners.publish',
  'partners.delete',

  // Focus Areas
  'focus_areas.read',
  'focus_areas.create',
  'focus_areas.update',
  'focus_areas.delete',

  // Locations
  'locations.read',
  'locations.create',
  'locations.update',
  'locations.delete',

  // Taxonomies (Article Categories, Tags)
  'taxonomies.read',
  'taxonomies.create',
  'taxonomies.update',
  'taxonomies.delete',

  // Staff User Management
  'users.read',
  'users.create',
  'users.invite',
  'users.update_roles',
  'users.suspend',
  'users.disable',
  'users.delete',

  // Staff Invitations
  'invitations.read',
  'invitations.create',
  'invitations.revoke',
  'invitations.resend',

  // Audit Logs
  'audit.read',

  // Site Settings & Brand Configuration
  'settings.read',
  'settings.update',
] as const;

export type StaffPermission = (typeof STAFF_PERMISSIONS)[number];
