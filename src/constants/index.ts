/**
 * Core brand constants for Genius Hub.
 */
export const BRAND = {
  name: 'Genius Hub',
  legalName: 'Genius Hub Global',
  tagline: 'Human impact and the future of work',
  origin: 'Nigeria',
} as const;

/**
 * Primary conversion goals guiding platform architecture and user journeys.
 */
export const CONVERSION_GOALS = {
  TRAINING: 'apply_for_training',
  PARTNERSHIP: 'partner_with_genius_hub',
  COMMERCE: 'buy_products_and_services',
} as const;

/**
 * Supported internationalization locales (planned).
 */
export const LOCALES = {
  DEFAULT: 'en',
  SUPPORTED: ['en', 'fr'] as const,
} as const;
