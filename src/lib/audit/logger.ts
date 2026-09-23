import type { Payload } from 'payload';
import type { JsonObject } from 'payload';
import { sanitizeAuditData } from './sanitizer';

export interface AuditEventParams {
  payload: Payload;
  actorId?: string | number | null;
  action: string;
  resourceType: string;
  resourceId?: string | number | null;
  targetUserId?: string | number | null;
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
  metadata?: Record<string, unknown> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  requestId?: string | null;
}

/**
 * Creates an immutable audit log record.
 */
export async function logAuditEvent({
  payload,
  actorId,
  action,
  resourceType,
  resourceId,
  targetUserId,
  before,
  after,
  metadata,
  ipAddress,
  userAgent,
  requestId,
}: AuditEventParams): Promise<void> {
  try {
    const sanitizedBefore = before ? sanitizeAuditData(before) : null;
    const sanitizedAfter = after ? sanitizeAuditData(after) : null;
    const sanitizedMetadata = metadata ? sanitizeAuditData(metadata) : null;

    const numericActorId =
      typeof actorId === 'number'
        ? actorId
        : actorId && !isNaN(Number(actorId))
          ? Number(actorId)
          : undefined;

    const numericTargetUserId =
      typeof targetUserId === 'number'
        ? targetUserId
        : targetUserId && !isNaN(Number(targetUserId))
          ? Number(targetUserId)
          : undefined;

    await payload.create({
      collection: 'audit-logs',
      data: {
        action,
        resourceType,
        resourceId: resourceId ? String(resourceId) : undefined,
        ...(numericActorId ? { actor: numericActorId } : {}),
        ...(numericTargetUserId ? { targetUser: numericTargetUserId } : {}),
        before: sanitizedBefore as JsonObject,
        after: sanitizedAfter as JsonObject,
        metadata: sanitizedMetadata as JsonObject,
        ipAddress: ipAddress || undefined,
        userAgent: userAgent || undefined,
        requestId: requestId || undefined,
        createdAt: new Date().toISOString(),
      },
      overrideAccess: true, // System-level bypass for writing audit log
    });
  } catch (error) {
    // Audit logging failure should be logged to stderr without crashing the request
    console.error(`[AuditLogging:Error] Failed to write audit event "${action}":`, error);
  }
}
