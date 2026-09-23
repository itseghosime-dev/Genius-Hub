import type { CollectionConfig } from 'payload';

/**
 * Users Collection — Dedicated to Payload Admin Panel Authentication.
 *
 * NOTE: Multi-role RBAC, staff invitations, Founder/Super Admin authority levels,
 * approval workflows, account suspension, and MFA are Phase 03 concerns and are
 * intentionally not implemented here.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'createdAt'],
    group: 'Admin & Governance',
    description:
      'Administrative users with access to the Payload CMS control panel. Advanced RBAC and permissions will be configured in Phase 03.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
  ],
};
