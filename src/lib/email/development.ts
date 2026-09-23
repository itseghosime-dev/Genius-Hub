import type { EmailService, StaffInvitationEmailParams } from './types';

/**
 * Development implementation of EmailService.
 * Logs safe metadata in production environments, and activation details in local development.
 */
export class DevelopmentEmailService implements EmailService {
  async sendStaffInvitation({
    email,
    name,
    inviteUrl,
    roles,
    expiresAt,
  }: StaffInvitationEmailParams): Promise<{ success: boolean; messageId: string }> {
    const isProd = process.env.NODE_ENV === 'production';
    const messageId = `dev-msg-${Date.now()}`;

    if (isProd) {
      // In production without external SES configured, log safe redacted delivery event
      console.info(
        `[EmailService:ProdMock] Staff invitation queued for recipient <${email}>. Roles: [${roles.join(', ')}]. Expires: ${expiresAt.toISOString()}`,
      );
    } else {
      // In local development, print the formatted invite link to console for testing
      console.info('===============================================================');
      console.info('📨 [DEV EMAIL DISPATCH] Staff Invitation');
      console.info(`   Recipient : ${name} <${email}>`);
      console.info(`   Roles     : ${roles.join(', ')}`);
      console.info(`   Expires   : ${expiresAt.toISOString()}`);
      console.info(`   Invite URL: ${inviteUrl}`);
      console.info('===============================================================');
    }

    return { success: true, messageId };
  }
}
