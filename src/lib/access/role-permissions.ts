import { STAFF_PERMISSIONS, type StaffPermission } from './permissions';
import type { StaffRole } from './roles';

/**
 * Centralized mapping of Staff Roles to their constituent permissions.
 */
export const ROLE_PERMISSIONS: Record<StaffRole, readonly StaffPermission[]> = {
  super_admin: STAFF_PERMISSIONS,

  admin: [
    // Content & Publishing
    'articles.read',
    'articles.create',
    'articles.update',
    'articles.submit',
    'articles.approve',
    'articles.publish',
    'articles.archive',
    'articles.delete',

    'events.read',
    'events.create',
    'events.update',
    'events.submit',
    'events.approve',
    'events.publish',
    'events.archive',
    'events.delete',

    'programmes.read',
    'programmes.create',
    'programmes.update',
    'programmes.submit',
    'programmes.approve',
    'programmes.publish',
    'programmes.archive',
    'programmes.delete',

    'projects.read',
    'projects.create',
    'projects.update',
    'projects.submit',
    'projects.approve',
    'projects.publish',
    'projects.archive',
    'projects.delete',

    'success_stories.read',
    'success_stories.create',
    'success_stories.update',
    'success_stories.submit',
    'success_stories.approve',
    'success_stories.publish',
    'success_stories.archive',
    'success_stories.delete',

    'media.read',
    'media.create',
    'media.update',
    'media.delete',

    'people.read',
    'people.create',
    'people.update',
    'people.publish',
    'people.delete',

    'partners.read',
    'partners.create',
    'partners.update',
    'partners.publish',
    'partners.delete',

    'focus_areas.read',
    'focus_areas.create',
    'focus_areas.update',
    'focus_areas.delete',

    'locations.read',
    'locations.create',
    'locations.update',
    'locations.delete',

    'taxonomies.read',
    'taxonomies.create',
    'taxonomies.update',
    'taxonomies.delete',

    // Staff Administration
    'users.read',
    'users.create',
    'users.invite',
    'users.update_roles',
    'users.suspend',
    'users.disable',

    'invitations.read',
    'invitations.create',
    'invitations.revoke',
    'invitations.resend',

    'audit.read',

    'settings.read',
    'settings.update',
  ],

  content_editor: [
    'articles.read',
    'articles.create',
    'articles.update',
    'articles.submit',

    'success_stories.read',
    'success_stories.create',
    'success_stories.update',
    'success_stories.submit',

    'media.read',
    'media.create',
    'people.read',
    'partners.read',
    'focus_areas.read',
    'locations.read',
    'taxonomies.read',
  ],

  content_approver: [
    'articles.read',
    'articles.create',
    'articles.update',
    'articles.submit',
    'articles.approve',
    'articles.publish',
    'articles.archive',

    'success_stories.read',
    'success_stories.create',
    'success_stories.update',
    'success_stories.submit',
    'success_stories.approve',
    'success_stories.publish',
    'success_stories.archive',

    'media.read',
    'media.create',
    'people.read',
    'partners.read',
    'focus_areas.read',
    'locations.read',
    'taxonomies.read',
    'taxonomies.create',
    'taxonomies.update',
  ],

  events_manager: [
    'events.read',
    'events.create',
    'events.update',
    'events.submit',
    'events.approve',
    'events.publish',
    'events.archive',

    'locations.read',
    'locations.create',
    'locations.update',

    'media.read',
    'media.create',
    'people.read',
    'partners.read',
    'focus_areas.read',
    'taxonomies.read',
  ],

  programmes_manager: [
    'programmes.read',
    'programmes.create',
    'programmes.update',
    'programmes.submit',
    'programmes.approve',
    'programmes.publish',
    'programmes.archive',

    'projects.read',
    'projects.create',
    'projects.update',
    'projects.submit',
    'projects.approve',
    'projects.publish',
    'projects.archive',

    'focus_areas.read',
    'focus_areas.create',
    'focus_areas.update',

    'locations.read',
    'locations.create',
    'locations.update',

    'media.read',
    'media.create',
    'people.read',
    'partners.read',
    'taxonomies.read',
  ],

  media_manager: [
    'media.read',
    'media.create',
    'media.update',
    'media.delete',

    'articles.read',
    'events.read',
    'programmes.read',
    'projects.read',
    'people.read',
    'partners.read',
    'locations.read',
    'focus_areas.read',
  ],

  applications_manager: ['programmes.read', 'projects.read', 'locations.read', 'media.read'],

  commerce_manager: [
    'programmes.read',
    'projects.read',
    'locations.read',
    'media.read',
    'partners.read',
  ],

  communications_manager: [
    'articles.read',
    'articles.create',
    'articles.update',
    'articles.submit',
    'articles.approve',
    'articles.publish',
    'articles.archive',

    'people.read',
    'people.create',
    'people.update',
    'people.publish',

    'partners.read',
    'partners.create',
    'partners.update',
    'partners.publish',

    'media.read',
    'media.create',
    'media.update',

    'events.read',
    'focus_areas.read',
    'taxonomies.read',
    'taxonomies.create',
    'taxonomies.update',
    'settings.read',
  ],
};
