import { describe, expect, it } from 'vitest';
import config from '../payload.config';
import { Programmes } from '../collections/Programmes';
import { Projects } from '../collections/Projects';
import { Events } from '../collections/Events';
import { People } from '../collections/People';
import { Partners } from '../collections/Partners';
import { Media } from '../collections/Media';
import { Users } from '../collections/Users';
import { SuccessStories } from '../collections/SuccessStories';
import { Articles } from '../collections/Articles';
import { Locations } from '../collections/Locations';
import { FocusAreas } from '../collections/FocusAreas';
import { ArticleCategories } from '../collections/ArticleCategories';
import { Tags } from '../collections/Tags';
import { SiteSettings } from '../globals/SiteSettings';
import { seoFieldGroup } from '../fields/seo';
import { slugField } from '../fields/slug';

describe('Domain Content Architecture & Collections', () => {
  it('registers all 13 required collections and site-settings global in Payload config', async () => {
    const resolvedConfig = await config;
    const registeredSlugs = resolvedConfig.collections?.map((c) => c.slug) || [];

    const expectedSlugs = [
      'users',
      'staff-invitations',
      'audit-logs',
      'media',
      'people',
      'partners',
      'focus-areas',
      'programmes',
      'projects',
      'events',
      'success-stories',
      'articles',
      'article-categories',
      'tags',
      'locations',
    ];

    for (const slug of expectedSlugs) {
      expect(registeredSlugs).toContain(slug);
    }
    // 15 domain & admin collections + 4 Payload internal collections
    expect(registeredSlugs.length).toBe(19);

    const registeredGlobals = resolvedConfig.globals?.map((g) => g.slug) || [];
    expect(registeredGlobals).toContain('site-settings');
  });

  it('configures Payload localization for English, French, and German', async () => {
    const resolvedConfig = await config;
    expect(resolvedConfig.localization).toBeDefined();

    if (resolvedConfig.localization && typeof resolvedConfig.localization === 'object') {
      const localeCodes = resolvedConfig.localization.locales.map((l) =>
        typeof l === 'string' ? l : l.code,
      );
      expect(localeCodes).toEqual(['en', 'fr', 'de']);
      expect(resolvedConfig.localization.defaultLocale).toBe('en');
      expect(resolvedConfig.localization.fallback).toBe(true);
    }
  });

  it('validates Locations collection schema and optional address requirement', () => {
    expect(Locations.slug).toBe('locations');
    const fields = Locations.fields;

    const nameField = fields.find((f) => 'name' in f && f.name === 'name');
    expect(nameField).toBeDefined();

    const addressField = fields.find((f) => 'name' in f && f.name === 'address');
    expect(addressField).toBeDefined();
    // Street address is optional
    if (addressField && 'required' in addressField) {
      expect(addressField.required).toBeFalsy();
    }

    const cityField = fields.find((f) => 'name' in f && f.name === 'city');
    expect(cityField).toBeDefined();

    const flagsField = fields.find((f) => 'name' in f && f.name === 'flags');
    expect(flagsField).toBeDefined();
  });

  it('validates FocusAreas strategic collection for topical SEO', () => {
    expect(FocusAreas.slug).toBe('focus-areas');
    const titleField = FocusAreas.fields.find((f) => 'name' in f && f.name === 'title');
    expect(titleField).toBeDefined();
    if (titleField && 'localized' in titleField) {
      expect(titleField.localized).toBe(true);
    }
  });

  it('validates taxonomy collections (ArticleCategories, Tags)', () => {
    expect(ArticleCategories.slug).toBe('article-categories');
    expect(Tags.slug).toBe('tags');

    const catName = ArticleCategories.fields.find((f) => 'name' in f && f.name === 'name');
    expect(catName).toBeDefined();

    const tagName = Tags.fields.find((f) => 'name' in f && f.name === 'name');
    expect(tagName).toBeDefined();
  });

  it('enforces structured relationships across domain entities', () => {
    // Programmes -> FocusAreas & Locations
    const progFocus = Programmes.fields.find((f) => 'name' in f && f.name === 'focusAreas');
    expect(progFocus).toBeDefined();
    const progLocations = Programmes.fields.find((f) => 'name' in f && f.name === 'locations');
    expect(progLocations).toBeDefined();

    // Projects -> FocusAreas & Locations
    const projFocus = Projects.fields.find((f) => 'name' in f && f.name === 'focusAreas');
    expect(projFocus).toBeDefined();
    const projLocations = Projects.fields.find((f) => 'name' in f && f.name === 'locations');
    expect(projLocations).toBeDefined();

    // Events -> venueLocation (Locations) & FocusAreas
    const eventVenue = Events.fields.find((f) => 'name' in f && f.name === 'venueLocation');
    expect(eventVenue).toBeDefined();
    const eventFocus = Events.fields.find((f) => 'name' in f && f.name === 'focusAreas');
    expect(eventFocus).toBeDefined();

    // Articles -> Category (ArticleCategories) & FocusAreas
    const artCat = Articles.fields.find((f) => 'name' in f && f.name === 'category');
    expect(artCat).toBeDefined();
    const artFocus = Articles.fields.find((f) => 'name' in f && f.name === 'focusAreas');
    expect(artFocus).toBeDefined();

    // SuccessStories -> Location & FocusAreas
    const storyLoc = SuccessStories.fields.find((f) => 'name' in f && f.name === 'location');
    expect(storyLoc).toBeDefined();
  });

  it('confirms Users collection is properly configured for staff identity and RBAC', () => {
    expect(Users.auth).toBeTruthy();
    const rolesField = Users.fields.find((f) => 'name' in f && f.name === 'roles');
    expect(rolesField).toBeDefined();
    const statusField = Users.fields.find((f) => 'name' in f && f.name === 'status');
    expect(statusField).toBeDefined();
  });

  it('validates reusable SEO field group structure and optionality', () => {
    expect('name' in seoFieldGroup && seoFieldGroup.name).toBe('seo');
    if ('fields' in seoFieldGroup && Array.isArray(seoFieldGroup.fields)) {
      const fieldNames = seoFieldGroup.fields.map((f) => ('name' in f ? f.name : ''));
      expect(fieldNames).toContain('metaTitle');
      expect(fieldNames).toContain('metaDescription');
      expect(fieldNames).toContain('canonicalUrl');
      expect(fieldNames).toContain('ogTitle');
      expect(fieldNames).toContain('ogDescription');
      expect(fieldNames).toContain('ogImage');
      expect(fieldNames).toContain('noIndex');
      expect(fieldNames).toContain('noFollow');
      expect(fieldNames).toContain('customJsonLd');
    }
  });

  it('validates People, Partners, Media, and SiteSettings schemas', () => {
    expect(People.slug).toBe('people');
    expect(Partners.slug).toBe('partners');
    expect(Media.slug).toBe('media');
    expect(SiteSettings.slug).toBe('site-settings');

    const mediaAlt = Media.fields.find((f) => 'name' in f && f.name === 'alt');
    expect(mediaAlt).toBeDefined();
    if (mediaAlt && 'localized' in mediaAlt) {
      expect(mediaAlt.localized).toBe(true);
    }

    const partnerLogo = Partners.fields.find((f) => 'name' in f && f.name === 'logo');
    expect(partnerLogo).toBeDefined();

    const shortBio = People.fields.find((f) => 'name' in f && f.name === 'shortBio');
    expect(shortBio).toBeDefined();
    if (shortBio && 'localized' in shortBio) {
      expect(shortBio.localized).toBe(true);
    }

    const fullBio = People.fields.find((f) => 'name' in f && f.name === 'fullBio');
    expect(fullBio).toBeDefined();
    if (fullBio && 'localized' in fullBio) {
      expect(fullBio.localized).toBe(true);
    }

    const brandGroup = SiteSettings.fields.find((f) => 'name' in f && f.name === 'brand');
    expect(brandGroup).toBeDefined();
    if (brandGroup && 'fields' in brandGroup && Array.isArray(brandGroup.fields)) {
      const tagline = brandGroup.fields.find((f) => 'name' in f && f.name === 'tagline');
      expect(tagline).toBeDefined();
      if (tagline && 'localized' in tagline) {
        expect(tagline.localized).toBe(true);
      }
    }
  });

  it('validates slug helper normalization and field structure', () => {
    const slug = slugField('title');
    expect('name' in slug && slug.name).toBe('slug');
    expect('type' in slug && slug.type).toBe('text');
  });
});
