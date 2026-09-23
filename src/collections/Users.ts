import type { CollectionConfig } from 'payload';
import {
  hasActiveStaffStatus,
  hasPermission,
  isSuperAdmin,
  type StaffUserLike,
} from '@/lib/access/helpers';
import {
  requirePermissionAccess,
  superAdminOnlyAccess,
  superAdminOnlyFieldAccess,
  superAdminOrPermissionFieldAccess,
} from '@/lib/access/payload-access';
import { STAFF_PERMISSIONS } from '@/lib/access/permissions';
import { STAFF_ROLE_OPTIONS } from '@/lib/access/roles';
import { logAuditEvent } from '@/lib/audit/logger';

/**
 * Users Collection — Dedicated exclusively to Staff Identity & Administrative Governance.
 *
 * NOTE: Public users, students, applicants, and customers are modeled in a distinct
 * domain identity system in later phases.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 minutes lockout after 5 failed attempts
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'roles', 'status', 'jobTitle', 'lastLoginAt'],
    group: 'Admin & Governance',
    description:
      'Internal staff identities, role assignments, account lifecycle, and administrative privileges.',
  },
  access: {
    // Only active staff with assigned roles can access the Payload Admin Panel
    admin: ({ req: { user } }) => {
      const staffUser = user as StaffUserLike | undefined;
      if (!staffUser || !hasActiveStaffStatus(staffUser)) return false;
      return isSuperAdmin(staffUser) || (Boolean(staffUser.roles) && staffUser.roles!.length > 0);
    },
    read: ({ req: { user } }) => {
      const staffUser = user as StaffUserLike | undefined;
      if (!staffUser || !hasActiveStaffStatus(staffUser)) return false;
      if (isSuperAdmin(staffUser) || hasPermission(staffUser, 'users.read')) {
        return true;
      }
      // Staff members can read their own profile
      return {
        id: {
          equals: staffUser.id,
        },
      };
    },
    create: requirePermissionAccess('users.create'),
    update: ({ req: { user }, id }) => {
      const staffUser = user as StaffUserLike | undefined;
      if (!staffUser || !hasActiveStaffStatus(staffUser)) return false;
      if (isSuperAdmin(staffUser) || hasPermission(staffUser, 'users.update_roles')) {
        return true;
      }
      // Staff members can update their own personal details (non-role fields)
      return String(staffUser.id) === String(id);
    },
    delete: superAdminOnlyAccess,
  },
  hooks: {
    beforeChange: [
      async ({ data, originalDoc }) => {
        if (!data) return data;
        const nowIso = new Date().toISOString();

        // Lifecycle timestamp tracking
        if (data.status === 'suspended' || data.status === 'disabled') {
          if (originalDoc?.status !== data.status) {
            data.disabledAt = nowIso;
          }
        } else if (data.status === 'active' && originalDoc?.status !== 'active') {
          data.activatedAt = nowIso;
        }

        return data;
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, req, operation }) => {
        if (operation === 'update' && previousDoc) {
          const user = req.user as StaffUserLike | undefined;

          // Audit role changes
          const rolesChanged =
            JSON.stringify(doc.roles || []) !== JSON.stringify(previousDoc.roles || []);
          if (rolesChanged) {
            await logAuditEvent({
              payload: req.payload,
              actorId: user?.id,
              action: 'user.roles.updated',
              resourceType: 'users',
              resourceId: doc.id,
              targetUserId: doc.id,
              before: { roles: previousDoc.roles },
              after: { roles: doc.roles },
            });
          }

          // Audit status changes
          if (doc.status !== previousDoc.status) {
            const actionName =
              doc.status === 'suspended'
                ? 'user.suspended'
                : doc.status === 'disabled'
                  ? 'user.disabled'
                  : 'user.status_updated';

            await logAuditEvent({
              payload: req.payload,
              actorId: user?.id,
              action: actionName,
              resourceType: 'users',
              resourceId: doc.id,
              targetUserId: doc.id,
              before: { status: previousDoc.status },
              after: { status: doc.status },
            });
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'jobTitle',
      type: 'text',
      label: 'Official Job Title',
      admin: {
        description: 'e.g. Founder & CEO, Lead TVET Facilitator, Communications Director.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      required: true,
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Invited', value: 'invited' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Disabled', value: 'disabled' },
      ],
      label: 'Account Operational Status',
      access: {
        update: superAdminOrPermissionFieldAccess('users.suspend'),
      },
      admin: {
        position: 'sidebar',
        description:
          'Operational lifecycle state. Inactive, suspended, or disabled staff cannot authenticate.',
      },
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['content_editor'],
      options: STAFF_ROLE_OPTIONS,
      label: 'Assigned Staff Responsibility Roles',
      access: {
        update: superAdminOrPermissionFieldAccess('users.update_roles'),
      },
      admin: {
        description:
          'Assigned organizational governance roles. Super Administrator holds full system privileges.',
      },
    },
    {
      name: 'directPermissions',
      type: 'select',
      hasMany: true,
      options: STAFF_PERMISSIONS.map((perm) => ({ label: perm, value: perm })),
      label: 'Direct Permission Overrides',
      access: {
        update: superAdminOnlyFieldAccess,
      },
      admin: {
        description:
          'Optional granular permission overrides. Reserved strictly for Super Administrator assignment.',
      },
    },
    {
      name: 'invitedAt',
      type: 'date',
      label: 'Invited Timestamp',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'activatedAt',
      type: 'date',
      label: 'Account Activated Timestamp',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'disabledAt',
      type: 'date',
      label: 'Disabled / Suspended Timestamp',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'lastLoginAt',
      type: 'date',
      label: 'Last Successful Login',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'mustChangePassword',
      type: 'checkbox',
      defaultValue: false,
      label: 'Require Password Change on Next Login',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'mfaEnabled',
      type: 'checkbox',
      defaultValue: false,
      label: 'Multi-Factor Authentication (MFA) Enabled',
      admin: {
        position: 'sidebar',
        description: 'Readiness flag for multi-factor authentication enforcement.',
      },
    },
  ],
};
