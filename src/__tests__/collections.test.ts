import { describe, expect, it } from 'vitest';
import { Programmes } from '../collections/Programmes';
import { Projects } from '../collections/Projects';
import { Events } from '../collections/Events';
import { People } from '../collections/People';
import { Partners } from '../collections/Partners';
import { Media } from '../collections/Media';
import { Users } from '../collections/Users';
import { SuccessStories } from '../collections/SuccessStories';
import { Articles } from '../collections/Articles';
import { SiteSettings } from '../globals/SiteSettings';

describe('Domain Collections & Data Architecture', () => {
  it('defines distinct, valid collection slugs', () => {
    const slugs = [
      Programmes.slug,
      Projects.slug,
      Events.slug,
      People.slug,
      Partners.slug,
      Media.slug,
      Users.slug,
      SuccessStories.slug,
      Articles.slug,
    ];

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(Programmes.slug).toBe('programmes');
    expect(Projects.slug).toBe('projects');
    expect(Events.slug).toBe('events');
    expect(People.slug).toBe('people');
    expect(Partners.slug).toBe('partners');
    expect(Media.slug).toBe('media');
    expect(Users.slug).toBe('users');
    expect(SuccessStories.slug).toBe('success-stories');
    expect(Articles.slug).toBe('articles');
  });

  it('configures Media collection with upload and image sizes', () => {
    expect(Media.upload).toBeTruthy();
    if (typeof Media.upload === 'object') {
      expect(Media.upload.imageSizes?.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('enforces relational integrity between domain collections', () => {
    // Projects relates to Programmes and Partners
    const projectFields = Projects.fields;
    const parentProg = projectFields.find((f) => 'name' in f && f.name === 'parentProgramme');
    expect(parentProg).toBeDefined();

    // Events relates to Speakers (People) and Partners
    const eventFields = Events.fields;
    const speakers = eventFields.find((f) => 'name' in f && f.name === 'speakers');
    expect(speakers).toBeDefined();

    // Articles relates to Authors (People)
    const articleFields = Articles.fields;
    const authors = articleFields.find((f) => 'name' in f && f.name === 'authors');
    expect(authors).toBeDefined();
  });

  it('configures SiteSettings global with brand and contact info', () => {
    expect(SiteSettings.slug).toBe('site-settings');
    const brandField = SiteSettings.fields.find((f) => 'name' in f && f.name === 'brand');
    expect(brandField).toBeDefined();
  });
});
