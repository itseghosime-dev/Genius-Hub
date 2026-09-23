import { DevelopmentEmailService } from './development';
import type { EmailService } from './types';

export * from './types';
export * from './development';

let emailServiceInstance: EmailService | null = null;

/**
 * Resolves the active email service instance (defaults to DevelopmentEmailService).
 */
export function getEmailService(): EmailService {
  if (!emailServiceInstance) {
    emailServiceInstance = new DevelopmentEmailService();
  }
  return emailServiceInstance;
}
