import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { People } from './collections/People';
import { Partners } from './collections/Partners';
import { Programmes } from './collections/Programmes';
import { Projects } from './collections/Projects';
import { Events } from './collections/Events';
import { SuccessStories } from './collections/SuccessStories';
import { Articles } from './collections/Articles';

import { SiteSettings } from './globals/SiteSettings';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
  sharp,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(__dirname),
    },
    meta: {
      titleSuffix: '— Genius Hub CMS Admin',
    },
  },
  collections: [
    Users,
    Media,
    People,
    Partners,
    Programmes,
    Projects,
    Events,
    SuccessStories,
    Articles,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'genius_hub_development_secret_key_minimum_32_chars_long',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI ||
        'postgresql://postgres:postgrespassword@127.0.0.1:5432/genius_hub',
    },
    migrationDir: path.resolve(__dirname, 'migrations'),
    push: false,
  }),
});
