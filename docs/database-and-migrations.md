# Genius Hub — Database, PostgreSQL & Migration Architecture

## 1. Database Architecture & Technology Stack

Genius Hub utilizes **PostgreSQL 16+** as its primary relational store. Database access, schema management, and domain collections are integrated via **Payload CMS 3.x** and the `@payloadcms/db-postgres` Drizzle adapter.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Next.js App Runtime                             │
│                     (Payload Local API & Admin)                        │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │  Connection Pool (pg / node-postgres)
┌──────────────────────────────────▼─────────────────────────────────────┐
│                        PostgreSQL 16+ Database                         │
├───────────────────┬───────────────────┬────────────────────────────────┤
│  Core Entities    │  Taxonomies & Hubs│   Editorial & Impact           │
│  - users          │  - focus_areas    │   - articles                   │
│  - media          │  - locations      │   - article_categories         │
│  - people         │  - tags           │   - success_stories            │
│  - partners       │  - programmes     │   - site_settings (global)     │
│                   │  - projects       │                                │
│                   │  - events         │                                │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

---

## 2. Schema Topology & Localization Architecture

Under PostgreSQL, `@payloadcms/db-postgres` separates static metadata from localized fields and relational joins:

1. **Base Entity Tables**: `programmes`, `projects`, `events`, `people`, `partners`, `media`, `locations`, `focus_areas`, `article_categories`, `tags`, `success_stories`, `articles`, `users`.
2. **Localization Tables (`*_locales`)**: e.g., `programmes_locales`, `projects_locales`, `events_locales`, `people_locales`, `locations_locales`, `focus_areas_locales`, `site_settings_locales`.
   - Stores localized textual content tagged with `_locale: ('en' | 'fr' | 'de')` and `_parent_id`.
   - Unique composite index on `(_locale, _parent_id)` prevents translation duplication.
3. **Relational Join Tables (`*_rels`)**: e.g., `programmes_rels`, `projects_rels`, `events_rels`, `articles_rels`, `success_stories_rels`.
   - Normalizes many-to-many and polymorphic foreign key relationships (FocusAreas, Locations, Partners, Speakers, Media galleries, Tags).

---

## 3. Local Database Setup (Docker)

A lightweight `docker-compose.yml` is provided for local PostgreSQL development:

```bash
# Start PostgreSQL in the background
docker compose up -d

# Verify container health
docker compose ps

# View database logs
docker compose logs -f postgres

# Stop the database
docker compose down
```

### Default Local Credentials

- **Host**: `127.0.0.1` (or `localhost`)
- **Port**: `5432`
- **Username**: `postgres`
- **Password**: `postgrespassword`
- **Database**: `genius_hub`
- **Connection URI**: `postgresql://postgres:postgrespassword@127.0.0.1:5432/genius_hub`

---

## 4. Migration-Driven Database Strategy

All database schema modifications MUST be migration-driven. Uncontrolled production schema synchronization (`push: true`) is strictly disabled in `src/payload.config.ts`.

### Available Scripts

| Command                            | Description                                                                                 |
| :--------------------------------- | :------------------------------------------------------------------------------------------ |
| `bun run db:migrate`               | Runs all pending database migrations against the configured `DATABASE_URI`                  |
| `bun run db:migrate:create <name>` | Generates a new migration file by calculating diffs between collections and existing schema |
| `bun run db:migrate:status`        | Outputs the current execution status of all recorded migrations                             |
| `bun run generate:types`           | Re-generates TypeScript interfaces in `src/payload-types.ts` matching the schema            |
| `bun run generate:importmap`       | Re-generates the Payload Admin UI import map                                                |

---

## 5. Migration Development Workflow

### Step 1: Modify or Add Collections

Update or add collection definitions in `src/collections/` or `src/globals/`.

### Step 2: Generate TypeScript Types & Import Map

```bash
bun run generate:importmap
bun run generate:types
```

### Step 3: Create the Migration File

```bash
bun run db:migrate:create add_taxonomies_locations_localization
```

This inspects the collection schema changes and automatically generates a timestamped migration in `src/migrations/` with reversible `up` and `down` SQL transactions.

### Step 4: Apply Migrations Locally

```bash
bun run db:migrate
```

---

## 6. Production Deployment & Rollback Strategy

### Production Execution

1. CI/CD pipelines run `bun run db:migrate` as a release phase step prior to rolling out new container images.
2. Migrations execute in atomic database transactions. If any step fails, the entire transaction rolls back cleanly without leaving the schema in an inconsistent state.
3. Applied migrations are tracked in the `payload_migrations` table.

### Rollback Considerations

- Every generated migration file exports an explicit `down` function containing the inverse SQL operations.
- Destructive operations (dropping columns or tables) must be staged across two deployment cycles:
  1. _Cycle 1_: Deprecate and decouple the column in code.
  2. _Cycle 2_: Execute the migration dropping the column after verifying zero remaining dependencies.

---

## 7. Media Storage Strategy: Local to S3/R2 Evolution

In Phase 02, uploaded assets are stored in the local file system at `public/media/` for zero-configuration development.

In future infrastructure phases:

1. The `@payloadcms/storage-s3` plugin will be integrated without altering collection schemas.
2. Binary assets will be uploaded directly to AWS S3 or Cloudflare R2.
3. Media delivery will be served through a high-performance global CDN (`cdn.geniushubglobal.com`).
4. Database tables (`media`) only store file metadata (URLs, dimensions, MIME types, focal coordinates, alt text, attribution, and tags). Large binary data is never stored in PostgreSQL.
