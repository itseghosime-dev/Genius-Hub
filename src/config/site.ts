import { env } from '@/config/env';

export const siteConfig = {
  name: 'Genius Hub',
  legalName: 'Genius Hub Global',
  description:
    'A global development organization originating from Nigeria, empowering individuals and institutions through innovative training programmes, human capital development, and technology-driven solutions.',
  url: env.NEXT_PUBLIC_APP_URL,
  links: {
    twitter: 'https://twitter.com/geniushubglobal',
    linkedin: 'https://linkedin.com/company/geniushubglobal',
    facebook: 'https://facebook.com/geniushubglobal',
    instagram: 'https://instagram.com/geniushubglobal',
  },
} as const;

export type SiteConfig = typeof siteConfig;

