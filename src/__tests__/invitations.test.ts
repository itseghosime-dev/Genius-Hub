import { describe, expect, it, vi } from 'vitest';
import type { Payload } from 'payload';
import { StaffInvitationService } from '../lib/auth/invitation-service';
import { generateSecureToken, hashToken, isTokenExpired } from '../lib/auth/token';

describe('Staff Invitation Lifecycle & Cryptography', () => {
  it('generates high-entropy 64-character hex tokens', () => {
    const token1 = generateSecureToken(32);
    const token2 = generateSecureToken(32);

    expect(token1).toHaveLength(64);
    expect(token2).toHaveLength(64);
    expect(token1).not.toBe(token2);
    expect(token1).toMatch(/^[0-9a-f]{64}$/);
  });

  it('produces deterministic SHA-256 hashes without storing plaintext', () => {
    const rawToken = '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069';
    const hash1 = hashToken(rawToken);
    const hash2 = hashToken(rawToken);

    expect(hash1).toHaveLength(64);
    expect(hash1).toBe(hash2);
    expect(hash1).not.toBe(rawToken);
  });

  it('accurately evaluates token expiration timestamps', () => {
    const pastDate = new Date(Date.now() - 3600 * 1000); // 1 hour ago
    const futureDate = new Date(Date.now() + 3600 * 1000); // 1 hour in future

    expect(isTokenExpired(pastDate)).toBe(true);
    expect(isTokenExpired(futureDate)).toBe(false);
  });

  it('handles the complete invitation acceptance lifecycle safely', async () => {
    const rawToken = generateSecureToken(32);
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString();

    const mockInvitationDoc = {
      id: 100,
      email: 'newstaff@geniushubglobal.com',
      name: 'Adanna Okafor',
      roles: ['content_editor'],
      jobTitle: 'Junior Editorial Assistant',
      tokenHash,
      status: 'pending',
      expiresAt,
    };

    const mockPayload = {
      find: vi.fn().mockImplementation(async ({ collection }) => {
        if (collection === 'staff-invitations') {
          return { docs: [mockInvitationDoc] };
        }
        if (collection === 'users') {
          return { docs: [] };
        }
        return { docs: [] };
      }),
      create: vi
        .fn()
        .mockImplementation(
          async ({ data }: { collection: string; data: Record<string, unknown> }) => {
            return { id: 999, ...data };
          },
        ),
      update: vi
        .fn()
        .mockImplementation(
          async ({
            id,
            data,
          }: {
            collection: string;
            id: number;
            data: Record<string, unknown>;
          }) => {
            return { id, ...data };
          },
        ),
    } as unknown as Payload;

    const result = await StaffInvitationService.acceptInvitation({
      payload: mockPayload,
      token: rawToken,
      password: 'StrongStaffPassword123!',
      name: 'Adanna Okafor',
    });

    expect(result.success).toBe(true);
    expect(result.email).toBe('newstaff@geniushubglobal.com');
    expect(mockPayload.create).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'users',
        data: expect.objectContaining({
          email: 'newstaff@geniushubglobal.com',
          status: 'active',
          roles: ['content_editor'],
        }),
      }),
    );

    // Verify invitation marked accepted
    expect(mockPayload.update).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'staff-invitations',
        id: 100,
        data: expect.objectContaining({
          status: 'accepted',
        }),
      }),
    );
  });

  it('rejects expired invitations and updates status to expired', async () => {
    const rawToken = generateSecureToken(32);
    const tokenHash = hashToken(rawToken);
    const pastExpiresAt = new Date(Date.now() - 1000).toISOString();

    const mockExpiredInvitation = {
      id: 101,
      email: 'expired@geniushubglobal.com',
      name: 'Expired User',
      roles: ['content_editor'],
      tokenHash,
      status: 'pending',
      expiresAt: pastExpiresAt,
    };

    const mockPayload = {
      find: vi.fn().mockResolvedValue({ docs: [mockExpiredInvitation] }),
      update: vi.fn().mockResolvedValue({ id: 101, status: 'expired' }),
    } as unknown as Payload;

    await expect(
      StaffInvitationService.acceptInvitation({
        payload: mockPayload,
        token: rawToken,
        password: 'Password123!',
      }),
    ).rejects.toThrow(/expired/i);

    expect(mockPayload.update).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'staff-invitations',
        id: 101,
        data: { status: 'expired' },
      }),
    );
  });

  it('rejects revoked or already accepted invitations', async () => {
    const rawToken = generateSecureToken(32);
    const tokenHash = hashToken(rawToken);

    const mockRevokedInvite = {
      id: 102,
      email: 'revoked@geniushubglobal.com',
      status: 'revoked',
      tokenHash,
      expiresAt: new Date(Date.now() + 100000).toISOString(),
    };

    const mockPayload = {
      find: vi.fn().mockResolvedValue({ docs: [mockRevokedInvite] }),
    } as unknown as Payload;

    await expect(
      StaffInvitationService.acceptInvitation({
        payload: mockPayload,
        token: rawToken,
        password: 'Password123!',
      }),
    ).rejects.toThrow(/already been revoked/i);
  });
});
