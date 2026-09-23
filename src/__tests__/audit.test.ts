import { describe, expect, it } from 'vitest';
import type { AccessArgs } from 'payload';
import { AuditLogs } from '../collections/AuditLogs';
import { sanitizeAuditData } from '../lib/audit/sanitizer';

describe('Audit Logging & Data Sanitization', () => {
  it('deeply sanitizes sensitive credentials and secrets from audit payloads', () => {
    const rawPayload = {
      user: 'teststaff@geniushubglobal.com',
      password: 'PlaintextPassword123!',
      hash: '$2b$10$abcdefghijklmnopqrstuv',
      salt: 'somerandomsalt',
      token: 'raw-cryptographic-token-value',
      tokenHash: 'sha256-hash-value',
      sessionInfo: {
        sessionId: 'sess_123456789',
        expiresAt: '2026-09-30T00:00:00.000Z',
      },
      metadata: {
        apiKey: 'sk_live_secret_key_9999',
        roles: ['admin', 'content_editor'],
      },
      tags: ['security', 'audit'],
    };

    const sanitized = sanitizeAuditData(rawPayload);

    expect(sanitized.user).toBe('teststaff@geniushubglobal.com');
    expect(sanitized.password).toBe('[REDACTED]');
    expect(sanitized.hash).toBe('[REDACTED]');
    expect(sanitized.salt).toBe('[REDACTED]');
    expect(sanitized.token).toBe('[REDACTED]');
    expect(sanitized.tokenHash).toBe('[REDACTED]');
    expect(sanitized.sessionInfo.sessionId).toBe('[REDACTED]');
    expect(sanitized.sessionInfo.expiresAt).toBe('2026-09-30T00:00:00.000Z');
    expect(sanitized.metadata.apiKey).toBe('[REDACTED]');
    expect(sanitized.metadata.roles).toEqual(['admin', 'content_editor']);
    expect(sanitized.tags).toEqual(['security', 'audit']);
  });

  it('verifies AuditLogs collection is strictly immutable via standard access functions', () => {
    expect(AuditLogs.slug).toBe('audit-logs');
    expect(AuditLogs.access?.create).toBeDefined();
    expect(AuditLogs.access?.update).toBeDefined();
    expect(AuditLogs.access?.delete).toBeDefined();

    // Standard client access should always evaluate to false
    const mockReq = {
      req: {
        user: {
          id: 1,
          email: 'admin@geniushubglobal.com',
          roles: ['super_admin'],
          status: 'active',
        },
      },
    } as unknown as AccessArgs;

    expect(AuditLogs.access?.create?.(mockReq)).toBe(false);
    expect(AuditLogs.access?.update?.(mockReq)).toBe(false);
    expect(AuditLogs.access?.delete?.(mockReq)).toBe(false);
  });
});
