import type { CollectionBeforeChangeHook, Field } from 'payload';
import { canApproveContent, hasPermission, type StaffUserLike } from '@/lib/access/helpers';
import type { StaffPermission } from '@/lib/access/permissions';

export const WORKFLOW_STATUS_OPTIONS: { label: string; value: string }[] = [
  { label: 'Draft', value: 'draft' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Changes Requested', value: 'changes_requested' },
  { label: 'Approved', value: 'approved' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
];

export type WorkflowStatus =
  'draft' | 'in_review' | 'changes_requested' | 'approved' | 'published' | 'archived';

/**
 * Creates a beforeChange hook enforcing separation of duties and transition permissions.
 */
export function createWorkflowBeforeChangeHook({
  approvePermission,
  publishPermission,
}: {
  approvePermission: StaffPermission;
  publishPermission: StaffPermission;
}): CollectionBeforeChangeHook {
  return async ({ data, originalDoc, req }) => {
    const user = req.user as StaffUserLike | undefined;
    const nowIso = new Date().toISOString();

    if (!data || !user) return data;

    const currentStatus = (originalDoc?.status || 'draft') as WorkflowStatus;
    const targetStatus = (data.status || currentStatus) as WorkflowStatus;

    // Status transition: moving to 'in_review'
    if (targetStatus === 'in_review' && currentStatus !== 'in_review') {
      data.submittedAt = nowIso;
      data.submittedBy = user.id;
    }

    // Status transition: moving to 'approved'
    if (targetStatus === 'approved' && currentStatus !== 'approved') {
      const submittedById = originalDoc?.submittedBy || data.submittedBy;

      const allowed = canApproveContent({
        user,
        permission: approvePermission,
        submittedById,
      });

      if (!allowed) {
        if (submittedById && user.id && String(submittedById) === String(user.id)) {
          throw new Error(
            'Separation of duties violation: You cannot approve your own content submission. An independent content approver is required.',
          );
        }
        throw new Error(
          `Permission denied: You do not possess the required "${approvePermission}" permission to approve this document.`,
        );
      }

      data.approvedAt = nowIso;
      data.approvedBy = user.id;
    }

    // Status transition: moving to 'published'
    if (targetStatus === 'published' && currentStatus !== 'published') {
      if (!hasPermission(user, publishPermission)) {
        throw new Error(
          `Permission denied: You do not possess the required "${publishPermission}" permission to publish this document.`,
        );
      }

      data.publishedAt = nowIso;
      data.publishedBy = user.id;
    }

    return data;
  };
}

/**
 * Reusable workflow field group for editorial review, approvals, and attribution.
 */
export const workflowFieldGroup: Field = {
  name: 'workflow',
  type: 'group',
  label: 'Editorial Workflow & Review Governance',
  admin: {
    position: 'sidebar',
  },
  fields: [
    {
      name: 'submittedAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Timestamp when this document was submitted for review.',
      },
    },
    {
      name: 'submittedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
        description: 'Staff member who submitted this document for review.',
      },
    },
    {
      name: 'approvedAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Timestamp when this document was formally approved.',
      },
    },
    {
      name: 'approvedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
        description: 'Staff reviewer who approved this document.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Timestamp when this document was published to the public website.',
      },
    },
    {
      name: 'publishedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
        description: 'Staff member who executed publication.',
      },
    },
    {
      name: 'reviewNotes',
      type: 'textarea',
      label: 'Reviewer Feedback & Notes',
      admin: {
        description: 'Internal notes, revision requests, or editorial guidance for the author.',
      },
    },
  ],
};
