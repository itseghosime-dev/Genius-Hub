const SENSITIVE_KEYS = new Set([
  'password',
  'confirmpassword',
  'hash',
  'salt',
  'token',
  'tokenhash',
  'resetpasswordtoken',
  'reset_password_token',
  'secret',
  'session',
  'sessionid',
  'apikey',
  'api_key',
  'authorization',
  'cookie',
]);

/**
 * Deeply sanitizes an object or payload before saving into AuditLogs.
 * Replaces sensitive keys with '[REDACTED]'.
 */
export function sanitizeAuditData<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeAuditData(item)) as unknown as T;
  }

  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    const normalizedKey = key.toLowerCase().replace(/[-_]/g, '');

    if (SENSITIVE_KEYS.has(normalizedKey)) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeAuditData(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}
