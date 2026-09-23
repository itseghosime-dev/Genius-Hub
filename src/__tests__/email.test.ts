import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DevelopmentEmailService } from '../lib/email/development';

describe('Email Service & Invitation Token Safety', () => {
  const originalEnv = process.env.NODE_ENV;
  let consoleInfoSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    (process.env as Record<string, string | undefined>).NODE_ENV = originalEnv;
    consoleInfoSpy.mockRestore();
  });

  it('prints invite URL to console in development mode for easy developer onboarding', async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = 'development';
    const emailService = new DevelopmentEmailService();

    const rawToken = 'abcdef1234567890abcdef1234567890';
    const inviteUrl = `http://localhost:3000/admin/accept-invitation?token=${rawToken}`;

    await emailService.sendStaffInvitation({
      email: 'dev@geniushubglobal.com',
      name: 'Developer User',
      inviteUrl,
      roles: ['admin'],
      expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    });

    const loggedMessages = consoleInfoSpy.mock.calls.flat().join(' ');
    expect(loggedMessages).toContain(inviteUrl);
    expect(loggedMessages).toContain('dev@geniushubglobal.com');
  });

  it('strictly redacts invitation token and URL from logs in production mode', async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
    const emailService = new DevelopmentEmailService();

    const rawToken = 'super_secret_cryptographic_invitation_token_99999';
    const inviteUrl = `https://geniushubglobal.com/admin/accept-invitation?token=${rawToken}`;

    await emailService.sendStaffInvitation({
      email: 'prod-staff@geniushubglobal.com',
      name: 'Production Staff',
      inviteUrl,
      roles: ['content_editor'],
      expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    });

    const loggedMessages = consoleInfoSpy.mock.calls.flat().join(' ');
    // Production mock logger must not leak the raw token or full inviteUrl
    expect(loggedMessages).not.toContain(rawToken);
    expect(loggedMessages).not.toContain(inviteUrl);
    expect(loggedMessages).toContain('[EmailService:ProdMock]');
    expect(loggedMessages).toContain('prod-staff@geniushubglobal.com');
  });
});
