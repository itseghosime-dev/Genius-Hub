import { describe, expect, it } from 'vitest';
import type { CollectionBeforeChangeHook } from 'payload';
import { canApproveContent, type StaffUserLike } from '../lib/access/helpers';
import { createWorkflowBeforeChangeHook, WORKFLOW_STATUS_OPTIONS } from '../fields/workflow';

describe('Content Workflow & Separation of Duties', () => {
  it('defines all 6 standard workflow lifecycle states', () => {
    const statuses = WORKFLOW_STATUS_OPTIONS.map((opt) => opt.value);
    expect(statuses).toEqual([
      'draft',
      'in_review',
      'changes_requested',
      'approved',
      'published',
      'archived',
    ]);
  });

  it('allows authorized content approver to approve document created by another author', () => {
    const approver: StaffUserLike = {
      id: 'approver-1',
      status: 'active',
      roles: ['content_approver'],
    };

    const isAllowed = canApproveContent({
      user: approver,
      permission: 'articles.approve',
      submittedById: 'editor-99',
    });

    expect(isAllowed).toBe(true);
  });

  it('strictly blocks self-approval when the editor attempts to approve their own submission', () => {
    const editorApprover: StaffUserLike = {
      id: 'staff-42',
      status: 'active',
      roles: ['content_approver'],
    };

    const isAllowed = canApproveContent({
      user: editorApprover,
      permission: 'articles.approve',
      submittedById: 'staff-42', // Author is same as reviewer
    });

    expect(isAllowed).toBe(false);
  });

  it('allows super_admin to override self-approval restriction for emergency publishing', () => {
    const superAdmin: StaffUserLike = {
      id: 'founder-1',
      status: 'active',
      roles: ['super_admin'],
    };

    const isAllowed = canApproveContent({
      user: superAdmin,
      permission: 'articles.approve',
      submittedById: 'founder-1', // Author is super_admin
    });

    expect(isAllowed).toBe(true);
  });

  it('blocks approval attempts by staff without approval permission', () => {
    const editorWithoutApproval: StaffUserLike = {
      id: 'editor-1',
      status: 'active',
      roles: ['content_editor'],
    };

    const isAllowed = canApproveContent({
      user: editorWithoutApproval,
      permission: 'articles.approve',
      submittedById: 'author-2',
    });

    expect(isAllowed).toBe(false);
  });

  it('enforces workflow beforeChange hook transitions and sets attribution metadata', async () => {
    const hook = createWorkflowBeforeChangeHook({
      approvePermission: 'articles.approve',
      publishPermission: 'articles.publish',
    });

    const approverUser = {
      id: 10,
      status: 'active',
      roles: ['content_approver'],
    };

    const context = {
      data: { status: 'approved' },
      originalDoc: { status: 'in_review', submittedBy: 5 },
      req: {
        user: approverUser,
      },
    } as unknown as Parameters<CollectionBeforeChangeHook>[0];

    const result = await hook(context);

    expect(result?.status).toBe('approved');
    expect(result?.approvedBy).toBe(10);
    expect(result?.approvedAt).toBeDefined();
  });

  it('throws separation of duties error in beforeChange hook on self-approval attempt', async () => {
    const hook = createWorkflowBeforeChangeHook({
      approvePermission: 'articles.approve',
      publishPermission: 'articles.publish',
    });

    const selfApprover = {
      id: 5,
      status: 'active',
      roles: ['content_approver'],
    };

    const context = {
      data: { status: 'approved' },
      originalDoc: { status: 'in_review', submittedBy: 5 },
      req: {
        user: selfApprover,
      },
    } as unknown as Parameters<CollectionBeforeChangeHook>[0];

    await expect(hook(context)).rejects.toThrow(/Separation of duties violation/i);
  });
});
