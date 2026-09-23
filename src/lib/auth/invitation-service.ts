import type { Payload } from 'payload';
import type { StaffRole } from '@/lib/access/roles';
import { logAuditEvent } from '@/lib/audit/logger';
import { getEmailService } from '@/lib/email';
import { generateSecureToken, hashToken, isTokenExpired } from './token';

export interface CreateInvitationParams {
  payload: Payload;
  inviterId?: string | number | null;
  email: string;
  name: string;
  roles: (StaffRole | string)[];
  jobTitle?: string;
  expiresInDays?: number;
  origin?: string;
}

export interface AcceptInvitationParams {
  payload: Payload;
  token: string;
  password: string;
  name?: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface RevokeInvitationParams {
  payload: Payload;
  invitationId: string | number;
  revokedById?: string | number | null;
}

/**
 * Service orchestrating the secure cryptographic lifecycle of staff invitations.
 */
export class StaffInvitationService {
  /**
   * Issues a new staff invitation with a cryptographic single-use token.
   */
  static async createInvitation({
    payload,
    inviterId,
    email,
    name,
    roles,
    jobTitle,
    expiresInDays = 7,
    origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  }: CreateInvitationParams) {
    const normalizedEmail = email.toLowerCase().trim();
    const numericInviterId =
      typeof inviterId === 'number'
        ? inviterId
        : inviterId && !isNaN(Number(inviterId))
          ? Number(inviterId)
          : undefined;

    // Invalidate/revoke any prior pending invitations for this email address
    const existingPending = await payload.find({
      collection: 'staff-invitations',
      where: {
        and: [{ email: { equals: normalizedEmail } }, { status: { equals: 'pending' } }],
      },
      overrideAccess: true,
    });

    for (const priorInvite of existingPending.docs) {
      await payload.update({
        collection: 'staff-invitations',
        id: priorInvite.id,
        data: {
          status: 'revoked',
          revokedAt: new Date().toISOString(),
          ...(numericInviterId ? { revokedBy: numericInviterId } : {}),
        },
        overrideAccess: true,
      });
    }

    const rawToken = generateSecureToken(32);
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

    const invitation = await payload.create({
      collection: 'staff-invitations',
      data: {
        email: normalizedEmail,
        name,
        roles: roles as StaffRole[],
        jobTitle: jobTitle || undefined,
        tokenHash,
        status: 'pending',
        ...(numericInviterId ? { invitedBy: numericInviterId } : {}),
        expiresAt: expiresAt.toISOString(),
      },
      overrideAccess: true,
    });

    const inviteUrl = `${origin}/admin/accept-invitation?token=${rawToken}`;

    // Dispatch notification via abstracted EmailService
    const emailService = getEmailService();
    await emailService.sendStaffInvitation({
      email: normalizedEmail,
      name,
      inviteUrl,
      roles: roles as string[],
      expiresAt,
    });

    // Record audit trail event
    await logAuditEvent({
      payload,
      actorId: numericInviterId,
      action: 'user.invited',
      resourceType: 'staff-invitations',
      resourceId: invitation.id,
      metadata: {
        email: normalizedEmail,
        roles: roles as string[],
        expiresAt: expiresAt.toISOString(),
      },
    });

    return {
      invitation,
      rawToken,
      inviteUrl,
    };
  }

  /**
   * Validates token and creates/activates staff user account.
   */
  static async acceptInvitation({
    payload,
    token,
    password,
    name,
    ipAddress,
    userAgent,
  }: AcceptInvitationParams) {
    if (!token || typeof token !== 'string' || !token.trim()) {
      throw new Error('A valid invitation token is required.');
    }

    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters in length.');
    }

    const tokenHash = hashToken(token);

    const searchResult = await payload.find({
      collection: 'staff-invitations',
      where: {
        tokenHash: { equals: tokenHash },
      },
      overrideAccess: true,
      limit: 1,
    });

    const invitation = searchResult.docs[0];

    if (!invitation) {
      throw new Error('Invalid, expired, or previously used invitation.');
    }

    if (invitation.status !== 'pending') {
      throw new Error(`This invitation has already been ${invitation.status}.`);
    }

    if (isTokenExpired(invitation.expiresAt)) {
      await payload.update({
        collection: 'staff-invitations',
        id: invitation.id,
        data: { status: 'expired' },
        overrideAccess: true,
      });
      throw new Error('This invitation has expired. Please contact an administrator to reissue.');
    }

    const staffEmail = invitation.email.toLowerCase().trim();
    const staffName = name?.trim() || invitation.name;
    const nowIso = new Date().toISOString();

    // Check if a placeholder user record already exists
    const existingUsers = await payload.find({
      collection: 'users',
      where: { email: { equals: staffEmail } },
      overrideAccess: true,
      limit: 1,
    });

    let activatedUser;

    if (existingUsers.docs.length > 0 && existingUsers.docs[0]) {
      const existing = existingUsers.docs[0];
      activatedUser = await payload.update({
        collection: 'users',
        id: existing.id,
        data: {
          name: staffName,
          password,
          roles: invitation.roles as StaffRole[],
          jobTitle: invitation.jobTitle || undefined,
          status: 'active',
          activatedAt: nowIso,
          mustChangePassword: false,
        },
        overrideAccess: true,
      });
    } else {
      activatedUser = await payload.create({
        collection: 'users',
        data: {
          email: staffEmail,
          name: staffName,
          password,
          roles: invitation.roles as StaffRole[],
          jobTitle: invitation.jobTitle || undefined,
          status: 'active',
          activatedAt: nowIso,
          mustChangePassword: false,
        },
        overrideAccess: true,
      });
    }

    // Mark invitation as single-use accepted
    await payload.update({
      collection: 'staff-invitations',
      id: invitation.id,
      data: {
        status: 'accepted',
        acceptedAt: nowIso,
      },
      overrideAccess: true,
    });

    // Record audit logs for invitation consumption and user activation
    await logAuditEvent({
      payload,
      actorId: activatedUser.id,
      action: 'invitation.accepted',
      resourceType: 'staff-invitations',
      resourceId: invitation.id,
      targetUserId: activatedUser.id,
      metadata: { email: staffEmail },
      ipAddress,
      userAgent,
    });

    await logAuditEvent({
      payload,
      actorId: activatedUser.id,
      action: 'user.activated',
      resourceType: 'users',
      resourceId: activatedUser.id,
      targetUserId: activatedUser.id,
      metadata: { roles: invitation.roles },
      ipAddress,
      userAgent,
    });

    return {
      success: true,
      userId: activatedUser.id,
      email: staffEmail,
      name: staffName,
    };
  }

  /**
   * Revokes a pending staff invitation.
   */
  static async revokeInvitation({ payload, invitationId, revokedById }: RevokeInvitationParams) {
    const numId = typeof invitationId === 'number' ? invitationId : Number(invitationId);
    const numRevokedBy =
      typeof revokedById === 'number'
        ? revokedById
        : revokedById && !isNaN(Number(revokedById))
          ? Number(revokedById)
          : undefined;

    const updated = await payload.update({
      collection: 'staff-invitations',
      id: numId,
      data: {
        status: 'revoked',
        revokedAt: new Date().toISOString(),
        ...(numRevokedBy ? { revokedBy: numRevokedBy } : {}),
      },
      overrideAccess: true,
    });

    const email = 'email' in updated ? (updated.email as string) : undefined;

    await logAuditEvent({
      payload,
      actorId: numRevokedBy,
      action: 'invitation.revoked',
      resourceType: 'staff-invitations',
      resourceId: numId,
      metadata: { email },
    });

    return updated;
  }
}
