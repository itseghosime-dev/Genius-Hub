import type { Access, FieldAccess } from 'payload';
import {
  hasActiveStaffStatus,
  hasAnyPermission,
  hasPermission,
  hasRole,
  isSuperAdmin,
  type StaffUserLike,
} from './helpers';
import type { StaffPermission } from './permissions';
import type { StaffRole } from './roles';

/**
 * Access function requiring a specific permission.
 */
export const requirePermissionAccess = (permission: StaffPermission): Access => {
  return ({ req: { user } }) => {
    return hasPermission(user as StaffUserLike, permission);
  };
};

/**
 * Access function requiring ANY of the provided permissions.
 */
export const requireAnyPermissionAccess = (permissions: readonly StaffPermission[]): Access => {
  return ({ req: { user } }) => {
    return hasAnyPermission(user as StaffUserLike, permissions);
  };
};

/**
 * Access function requiring a specific role.
 */
export const requireRoleAccess = (role: StaffRole): Access => {
  return ({ req: { user } }) => {
    const staffUser = user as StaffUserLike;
    if (!hasActiveStaffStatus(staffUser)) return false;
    return hasRole(staffUser, role);
  };
};

/**
 * Access function restricting operation strictly to super_admin.
 */
export const superAdminOnlyAccess: Access = ({ req: { user } }) => {
  const staffUser = user as StaffUserLike;
  if (!hasActiveStaffStatus(staffUser)) return false;
  return isSuperAdmin(staffUser);
};

/**
 * Field-level access function restricting field mutations strictly to super_admin.
 */
export const superAdminOnlyFieldAccess: FieldAccess = ({ req: { user } }) => {
  const staffUser = user as StaffUserLike;
  if (!hasActiveStaffStatus(staffUser)) return false;
  return isSuperAdmin(staffUser);
};

/**
 * Access function denying all direct client operations (used for system-managed collections like audit-logs).
 */
export const denyAllAccess: Access = () => false;

/**
 * Allows public read access for published documents on public collections, or requires read permission for drafts/unpublished.
 */
export const publicReadOrRequirePermission = (permission: StaffPermission): Access => {
  return ({ req: { user } }) => {
    const staffUser = user as StaffUserLike;
    if (staffUser && hasPermission(staffUser, permission)) {
      return true;
    }
    // Public queries can only read published documents
    return {
      _status: {
        equals: 'published',
      },
    };
  };
};

/**
 * Field-level access function requiring a specific permission.
 */
export const requirePermissionFieldAccess = (permission: StaffPermission): FieldAccess => {
  return ({ req: { user } }) => {
    return hasPermission(user as StaffUserLike, permission);
  };
};

/**
 * Field-level access function restricting field mutations strictly to super_admin or user management role.
 */
export const superAdminOrPermissionFieldAccess = (permission: StaffPermission): FieldAccess => {
  return ({ req: { user } }) => {
    const staffUser = user as StaffUserLike;
    if (!hasActiveStaffStatus(staffUser)) return false;
    return isSuperAdmin(staffUser) || hasPermission(staffUser, permission);
  };
};
