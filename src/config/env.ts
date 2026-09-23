import { z } from 'zod';

const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('3000'),
});

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1).default('Genius Hub'),
});

/**
 * Validates and extracts environment variables.
 * Server-only variables are only validated and accessible on the server.
 */
function getEnv() {
  const isServer = typeof window === 'undefined';

  const clientParsed = clientSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  });

  if (!clientParsed.success) {
    console.error('Invalid public environment variables:', clientParsed.error.flatten().fieldErrors);
    throw new Error('Invalid public environment variables');
  }

  if (isServer) {
    const serverParsed = serverSchema.safeParse({
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
    });

    if (!serverParsed.success) {
      console.error('Invalid server environment variables:', serverParsed.error.flatten().fieldErrors);
      throw new Error('Invalid server environment variables');
    }

    return {
      ...serverParsed.data,
      ...clientParsed.data,
    };
  }

  return {
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    PORT: '3000',
    ...clientParsed.data,
  };
}

export const env = getEnv();

