import crypto from 'node:crypto';

/**
 * Generates a cryptographically secure, high-entropy random token.
 * Default 32 bytes yields a 64-character hexadecimal string.
 */
export function generateSecureToken(byteLength = 32): string {
  return crypto.randomBytes(byteLength).toString('hex');
}

/**
 * Computes a SHA-256 hash of the provided plaintext token for safe database persistence.
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token.trim()).digest('hex');
}

/**
 * Checks whether an expiration timestamp has passed.
 */
export function isTokenExpired(expiresAt: Date | string | number): boolean {
  const expiry = new Date(expiresAt).getTime();
  return Date.now() > expiry;
}
