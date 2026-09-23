import type { StaffPermission } from './permissions';
import { ROLE_PERMISSIONS } from './role-permissions';
import type { StaffRole } from './roles';

/**
 * Minimal user structure required for access evaluations.
 */
export interface StaffUserLike {
  id?: string | number;
  email?: string;
  status?: 'invited' | 'active' | 'suspended' | 'disabled' | null;
  roles?: (StaffRole | string)[] | null;
  directPermissions?: (StaffPermission | string)[] | null;
}

/**
 * Check if the staff user is in an active operational state.
 */
export function hasActiveStaffStatus(user: StaffUserLike | null | undefined): boolean {
  if (!user || !user.status) return false;
  return user.status === 'active';
}

/**
 * Check if the staff user has the super_admin role.
 */
export function isSuperAdmin(user: StaffUserLike | null | undefined): boolean {
  if (!user || !user.roles || !Array.isArray(user.roles)) return false;
  return user.roles.includes('super_admin');
}

/**
 * Check if the staff user has a specific role.
 */
export function hasRole(user: StaffUserLike | null | undefined, role: StaffRole): boolean {
  if (!user || !user.roles || !Array.isArray(user.roles)) return false;
  if (user.roles.includes('super_admin')) return true;
  return user.roles.includes(role);
}

/**
 * Check if the staff user has any of the specified roles.
 */
export function hasAnyRole(
  user: StaffUserLike | null | undefined,
  roles: readonly StaffRole[],
): boolean {
  if (!user || !user.roles || !Array.isArray(user.roles)) return false;
  if (user.roles.includes('super_admin')) return true;
  return roles.some((role) => user.roles?.includes(role));
}

/**
 * Resolve the complete effective set of permissions for a staff user.
 */
export function getUserPermissions(user: StaffUserLike | null | undefined): Set<StaffPermission> {
  const permissions = new Set<StaffPermission>();
  if (!user || !user.roles || !Array.isArray(user.roles)) return permissions;

  // Super admin inherits all permissions
  if (user.roles.includes('super_admin')) {
    for (const perm of ROLE_PERMISSIONS.super_admin) {
      permissions.add(perm);
    }
    return permissions;
  }

  // Aggregate permissions from assigned roles
  for (const role of user.roles) {
    const rolePerms = ROLE_PERMISSIONS[role as StaffRole];
    if (rolePerms) {
      for (const perm of rolePerms) {
        permissions.add(perm);
      }
    }
  }

  // Add any direct override permissions
  if (user.directPermissions && Array.isArray(user.directPermissions)) {
    for (const perm of user.directPermissions) {
      permissions.add(perm as StaffPermission);
    }
  }

  return permissions;
}

/**
 * Check if a staff user holds a specific permission.
 */
export function hasPermission(
  user: StaffUserLike | null | undefined,
  permission: StaffPermission,
): boolean {
  if (!user || !hasActiveStaffStatus(user)) return false;
  if (isSuperAdmin(user)) return true;

  const effectivePermissions = getUserPermissions(user);
  return effectivePermissions.has(permission);
}

/**
 * Check if a staff user holds ANY of the specified permissions.
 */
export function hasAnyPermission(
  user: StaffUserLike | null | undefined,
  permissions: readonly StaffPermission[],
): boolean {
  if (!user || !hasActiveStaffStatus(user)) return false;
  if (isSuperAdmin(user)) return true;

  const effectivePermissions = getUserPermissions(user);
  return permissions.some((perm) => effectivePermissions.has(perm));
}

/**
 * Check if a staff user holds ALL of the specified permissions.
 */
export function hasAllPermissions(
  user: StaffUserLike | null | undefined,
  permissions: readonly StaffPermission[],
): boolean {
  if (!user || !hasActiveStaffStatus(user)) return false;
  if (isSuperAdmin(user)) return true;

  const effectivePermissions = getUserPermissions(user);
  return permissions.every((perm) => effectivePermissions.has(perm));
}

/**
 * Evaluates whether a user can approve a content submission, enforcing the separation of duties policy.
 *
 * Policy:
 * 1. User must hold the required approval permission (e.g., 'articles.approve').
 * 2. Self-approval is disallowed: if user submitted the item, they cannot approve it.
 * 3. Super Admin is exempt from self-approval restrictions for emergency publishing.
 */
export function canApproveContent({
  user,
  permission,
  submittedById,
}: {
  user: StaffUserLike | null | undefined;
  permission: StaffPermission;
  submittedById?: string | number | null;
}): boolean {
  if (!user || !hasActiveStaffStatus(user)) return false;

  // Super Admin can override self-approval
  if (isSuperAdmin(user)) return true;

  // Check required permission
  if (!hasPermission(user, permission)) return false;

  // Enforce no self-approval for normal approvers
  if (submittedById && user.id && String(submittedById) === String(user.id)) {
    return false;
  }

  return true;
}
