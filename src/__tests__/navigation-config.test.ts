import { describe, expect, it } from 'vitest';
import {
  headerNavigation,
  headerCta,
  footerNavigation,
  languages,
  type HeaderNavItem,
} from '../config/navigation';

describe('Navigation Configuration Structure & Integrity', () => {
  it('contains all required primary navigation sections', () => {
    const labels = headerNavigation.map((item) => item.data.label);
    expect(labels).toContain('About');
    expect(labels).toContain('What We Do');
    expect(labels).toContain('Impact & Stories');
    expect(labels).toContain('Opportunities');
    expect(labels).toContain('Store');
    expect(labels).toContain('Contact');
  });

  it('defines structured mega menus for grouped navigation items', () => {
    const aboutNav = headerNavigation.find(
      (item): item is Extract<HeaderNavItem, { type: 'megamenu' }> =>
        item.type === 'megamenu' && item.data.label === 'About',
    );
    expect(aboutNav).toBeDefined();
    expect(aboutNav?.data.groups.length).toBeGreaterThanOrEqual(2);

    const whatWeDoNav = headerNavigation.find(
      (item): item is Extract<HeaderNavItem, { type: 'megamenu' }> =>
        item.type === 'megamenu' && item.data.label === 'What We Do',
    );
    expect(whatWeDoNav).toBeDefined();
    expect(whatWeDoNav?.data.groups.length).toBeGreaterThanOrEqual(2);

    const impactNav = headerNavigation.find(
      (item): item is Extract<HeaderNavItem, { type: 'megamenu' }> =>
        item.type === 'megamenu' && item.data.label === 'Impact & Stories',
    );
    expect(impactNav).toBeDefined();
    expect(impactNav?.data.groups.length).toBeGreaterThanOrEqual(2);
  });

  it('ensures all navigation links have valid href and labels', () => {
    for (const item of headerNavigation) {
      expect(item.data.label).toBeTruthy();
      expect(item.data.href).toMatch(/^\/[a-zA-Z0-9\-_/?=]*$/);

      if (item.type === 'megamenu') {
        for (const group of item.data.groups) {
          expect(group.heading).toBeTruthy();
          for (const subItem of group.items) {
            expect(subItem.label).toBeTruthy();
            expect(subItem.href).toMatch(/^\/[a-zA-Z0-9\-_/?=]*$/);
          }
        }
      }
    }
  });

  it('defines primary CTA with dominant Apply action', () => {
    expect(headerCta.primary).toBeDefined();
    expect(headerCta.primary.label).toBe('Apply for Training');
    expect(headerCta.primary.href).toBe('/apply');
    expect(headerCta.secondary.href).toBe('/partner');
    expect(headerCta.donate.href).toBe('/donate');
  });

  it('defines multi-column footer navigation structure', () => {
    const columns = footerNavigation.columns;
    expect(columns.length).toBe(5);

    const titles = columns.map((col) => col.title);
    expect(titles).toContain('Organization');
    expect(titles).toContain('What We Do');
    expect(titles).toContain('Impact & Media');
    expect(titles).toContain('Opportunities');
    expect(titles).toContain('Trust & Legal');

    expect(footerNavigation.locations.length).toBeGreaterThanOrEqual(2);
    expect(footerNavigation.social.length).toBeGreaterThanOrEqual(4);
  });

  it('defines supported languages with English, French, German', () => {
    expect(languages.length).toBe(3);
    const codes = languages.map((l) => l.code);
    expect(codes).toContain('en');
    expect(codes).toContain('fr');
    expect(codes).toContain('de');
  });
});
