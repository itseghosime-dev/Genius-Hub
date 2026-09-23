import type { CollectionConfig } from 'payload';
import { requirePermissionAccess, superAdminOnlyAccess } from '@/lib/access/payload-access';
import { STAFF_ROLE_OPTIONS } from '@/lib/access/roles';

export const StaffInvitations: CollectionConfig = {
  slug: 'staff-invitations',
  labels: {
    singular: 'Staff Invitation',
    plural: 'Staff Invitations',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'status', 'expiresAt', 'invitedBy'],
    group: 'Admin & Governance',
    description: 'Manage single-use, time-limited cryptographic onboarding invitations for staff.',
  },
  access: {
    read: requirePermissionAccess('invitations.read'),
    create: requirePermissionAccess('invitations.create'),
    update: requirePermissionAccess('invitations.revoke'),
    delete: superAdminOnlyAccess,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Staff Email Address',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Staff Full Name',
    },
    {
      name: 'jobTitle',
      type: 'text',
      label: 'Job Title / Position',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      options: STAFF_ROLE_OPTIONS,
      label: 'Assigned Staff Roles',
    },
    {
      name: 'tokenHash',
      type: 'text',
      required: true,
      index: true,
      label: 'Token SHA-256 Hash',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'One-way cryptographic hash of the active single-use invitation token.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Expired', value: 'expired' },
        { label: 'Revoked', value: 'revoked' },
      ],
      label: 'Invitation Status',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
      label: 'Expiration Timestamp',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'invitedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Invited By (Administrator)',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'acceptedAt',
      type: 'date',
      label: 'Accepted Timestamp',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'revokedAt',
      type: 'date',
      label: 'Revoked Timestamp',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'revokedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Revoked By',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
};
