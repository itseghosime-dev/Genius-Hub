import { describe, expect, it } from 'vitest';
import {
  hasActiveStaffStatus,
  hasAnyPermission,
  hasAnyRole,
  hasPermission,
  hasRole,
  isSuperAdmin,
  type StaffUserLike,
} from '../lib/access/helpers';
import { STAFF_PERMISSIONS } from '../lib/access/permissions';
import { STAFF_ROLES } from '../lib/access/roles';

describe('RBAC & Staff Permission Architecture', () => {
  it('defines all 10 standard staff roles', () => {
    expect(STAFF_ROLES).toHaveLength(10);
    expect(STAFF_ROLES).toContain('super_admin');
    expect(STAFF_ROLES).toContain('admin');
    expect(STAFF_ROLES).toContain('content_editor');
    expect(STAFF_ROLES).toContain('content_approver');
    expect(STAFF_ROLES).toContain('events_manager');
    expect(STAFF_ROLES).toContain('programmes_manager');
    expect(STAFF_ROLES).toContain('media_manager');
    expect(STAFF_ROLES).toContain('applications_manager');
    expect(STAFF_ROLES).toContain('commerce_manager');
    expect(STAFF_ROLES).toContain('communications_manager');
  });

  it('verifies super_admin holds all system permissions', () => {
    const superAdminUser: StaffUserLike = {
      id: 'usr-1',
      status: 'active',
      roles: ['super_admin'],
    };

    expect(isSuperAdmin(superAdminUser)).toBe(true);
    expect(hasRole(superAdminUser, 'super_admin')).toBe(true);
    expect(hasRole(superAdminUser, 'content_editor')).toBe(true); // Super admin passes any role check

    for (const perm of STAFF_PERMISSIONS) {
      expect(hasPermission(superAdminUser, perm)).toBe(true);
    }
  });

  it('verifies content_editor has draft creation permissions but lacks publish and user administration', () => {
    const editor: StaffUserLike = {
      id: 'usr-2',
      status: 'active',
      roles: ['content_editor'],
    };

    expect(isSuperAdmin(editor)).toBe(false);
    expect(hasRole(editor, 'content_editor')).toBe(true);
    expect(hasPermission(editor, 'articles.create')).toBe(true);
    expect(hasPermission(editor, 'articles.update')).toBe(true);
    expect(hasPermission(editor, 'articles.submit')).toBe(true);
    expect(hasPermission(editor, 'success_stories.create')).toBe(true);

    // Forbidden permissions
    expect(hasPermission(editor, 'articles.publish')).toBe(false);
    expect(hasPermission(editor, 'articles.approve')).toBe(false);
    expect(hasPermission(editor, 'users.invite')).toBe(false);
    expect(hasPermission(editor, 'users.suspend')).toBe(false);
    expect(hasPermission(editor, 'audit.read')).toBe(false);
  });

  it('verifies content_approver holds editorial review and publication permissions', () => {
    const approver: StaffUserLike = {
      id: 'usr-3',
      status: 'active',
      roles: ['content_approver'],
    };

    expect(hasPermission(approver, 'articles.approve')).toBe(true);
    expect(hasPermission(approver, 'articles.publish')).toBe(true);
    expect(hasPermission(approver, 'success_stories.approve')).toBe(true);
    expect(hasPermission(approver, 'success_stories.publish')).toBe(true);

    // Lacks user management permissions
    expect(hasPermission(approver, 'users.update_roles')).toBe(false);
  });

  it('correctly aggregates multi-role permissions for a staff member', () => {
    const multiRoleUser: StaffUserLike = {
      id: 'usr-4',
      status: 'active',
      roles: ['content_editor', 'events_manager'],
    };

    expect(hasAnyRole(multiRoleUser, ['content_editor', 'admin'])).toBe(true);
    expect(hasRole(multiRoleUser, 'events_manager')).toBe(true);

    // Has editor permissions
    expect(hasPermission(multiRoleUser, 'articles.create')).toBe(true);
    // Has events permissions
    expect(hasPermission(multiRoleUser, 'events.create')).toBe(true);
    expect(hasPermission(multiRoleUser, 'events.publish')).toBe(true);
    // Lacks unrelated administrative permissions
    expect(hasPermission(multiRoleUser, 'users.suspend')).toBe(false);
  });

  it('honors direct permission overrides for specific staff', () => {
    const userWithOverride: StaffUserLike = {
      id: 'usr-5',
      status: 'active',
      roles: ['content_editor'],
      directPermissions: ['audit.read'],
    };

    expect(hasPermission(userWithOverride, 'articles.create')).toBe(true);
    expect(hasPermission(userWithOverride, 'audit.read')).toBe(true);
    expect(hasPermission(userWithOverride, 'users.suspend')).toBe(false);
  });

  it('strictly denies all permissions and access for suspended or disabled staff', () => {
    const suspendedUser: StaffUserLike = {
      id: 'usr-6',
      status: 'suspended',
      roles: ['super_admin'],
    };

    const disabledUser: StaffUserLike = {
      id: 'usr-7',
      status: 'disabled',
      roles: ['admin', 'content_editor'],
    };

    const invitedUser: StaffUserLike = {
      id: 'usr-8',
      status: 'invited',
      roles: ['content_editor'],
    };

    expect(hasActiveStaffStatus(suspendedUser)).toBe(false);
    expect(hasActiveStaffStatus(disabledUser)).toBe(false);
    expect(hasActiveStaffStatus(invitedUser)).toBe(false);

    expect(hasPermission(suspendedUser, 'articles.read')).toBe(false);
    expect(hasPermission(disabledUser, 'articles.read')).toBe(false);
    expect(hasPermission(invitedUser, 'articles.read')).toBe(false);
    expect(hasAnyPermission(suspendedUser, ['articles.read', 'users.read'])).toBe(false);
  });
});
