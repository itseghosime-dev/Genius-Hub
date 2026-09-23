import type { CollectionConfig } from 'payload';
import { denyAllAccess, requirePermissionAccess } from '@/lib/access/payload-access';

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  labels: {
    singular: 'Audit Log Entry',
    plural: 'Audit Logs',
  },
  admin: {
    useAsTitle: 'action',
    defaultColumns: ['createdAt', 'action', 'resourceType', 'resourceId', 'actor'],
    group: 'Admin & Governance',
    description:
      'Append-only, tamper-resistant administrative audit records capturing security and content changes.',
  },
  access: {
    read: requirePermissionAccess('audit.read'),
    create: denyAllAccess, // Immutable: only written by system logger with overrideAccess
    update: denyAllAccess, // Immutable: cannot be altered
    delete: denyAllAccess, // Immutable: cannot be deleted through standard operations
  },
  fields: [
    {
      name: 'action',
      type: 'text',
      required: true,
      index: true,
      label: 'Action Name',
      admin: {
        description: 'e.g. user.invited, user.suspended, article.published, invitation.revoked',
      },
    },
    {
      name: 'resourceType',
      type: 'text',
      required: true,
      index: true,
      label: 'Resource Type',
      admin: {
        description: 'e.g. users, articles, staff-invitations, programmes',
      },
    },
    {
      name: 'resourceId',
      type: 'text',
      label: 'Target Resource Identifier',
    },
    {
      name: 'actor',
      type: 'relationship',
      relationTo: 'users',
      label: 'Actor (Staff Member)',
    },
    {
      name: 'targetUser',
      type: 'relationship',
      relationTo: 'users',
      label: 'Target User',
      admin: {
        description: 'Subject of user administrative changes (e.g. role updates, suspension).',
      },
    },
    {
      name: 'before',
      type: 'json',
      label: 'Previous State (Sanitized Snapshot)',
    },
    {
      name: 'after',
      type: 'json',
      label: 'New State (Sanitized Snapshot)',
    },
    {
      name: 'metadata',
      type: 'json',
      label: 'Additional Context & Event Metadata',
    },
    {
      name: 'ipAddress',
      type: 'text',
      label: 'Client IP Address',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'User Agent / Client Identifier',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'requestId',
      type: 'text',
      label: 'Correlation / Request ID',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      required: true,
      label: 'Event Timestamp',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
