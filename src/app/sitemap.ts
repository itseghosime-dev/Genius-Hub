import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  }> = [
    // Top-Level
    { path: '', priority: 1.0, changeFrequency: 'daily' },

    // About Section
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/about/leadership', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about/our-story', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about/governance', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about/locations', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about/partners', priority: 0.8, changeFrequency: 'monthly' },

    // What We Do Section
    { path: '/focus-areas', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/programmes', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/projects', priority: 0.9, changeFrequency: 'weekly' },

    // Impact Section
    { path: '/impact', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/impact/success-stories', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/impact/reports', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/impact/geographic-reach', priority: 0.7, changeFrequency: 'monthly' },

    // Events Section
    { path: '/events', priority: 0.8, changeFrequency: 'daily' },

    // Stories / News Section
    { path: '/stories', priority: 0.8, changeFrequency: 'daily' },

    // Social Enterprise Shop
    { path: '/shop', priority: 0.8, changeFrequency: 'weekly' },

    // Opportunities & CTAs
    { path: '/opportunities', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/apply', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/partner', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/donate', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },

    // Legal & Trust
    { path: '/privacy', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/accessibility', priority: 0.5, changeFrequency: 'yearly' },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
