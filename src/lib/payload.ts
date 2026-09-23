import { getPayload } from 'payload';
import config from '@payload-config';

/**
 * Access the local Payload API instance within React Server Components and Server Actions.
 */
export async function getPayloadClient() {
  return await getPayload({ config });
}
