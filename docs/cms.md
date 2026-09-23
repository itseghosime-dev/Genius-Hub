# Genius Hub — Payload CMS Integration & Developer Guide

## 1. Architecture Overview

Payload CMS 3.x is embedded natively within the Next.js App Router application. It shares the same Node.js/Bun runtime, database connections, and type system as the public frontend.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Next.js 16 Application                          │
├──────────────────────────────────┬─────────────────────────────────────┤
│         Public Frontend          │           Payload CMS               │
│  - React Server Components (RSC) │  - Admin GUI (/admin)               │
│  - Server Actions & ISR          │  - REST API (/api/[...slug])        │
│  - Local API (getPayloadClient)  │  - GraphQL API (/api/graphql)       │
└──────────────────────────────────┴─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                 PostgreSQL 16+ Database (@payloadcms/db-postgres)      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Accessing Content via the Local API

In React Server Components (RSC) and Server Actions, always use the **Payload Local API** for maximum performance and direct PostgreSQL querying without HTTP roundtrips:

```typescript
import { getPayloadClient } from '@/lib/payload';

export default async function ProgrammesPage() {
  const payload = await getPayloadClient();

  const { docs: programmes } = await payload.find({
    collection: 'programmes',
    where: {
      status: {
        equals: 'published',
      },
    },
    locale: 'en', // 'en' | 'fr' | 'de'
    depth: 2, // Resolves focusAreas, locations, and heroMedia relations
    sort: '-createdAt',
  });

  return (
    <main>
      <h1>Programmes</h1>
      {programmes.map((prog) => (
        <article key={prog.id}>
          <h2>{prog.title}</h2>
          <p>{prog.shortDescription}</p>
        </article>
      ))}
    </main>
  );
}
```

---

## 3. API Endpoints

| Route                     | Interface | Description                                             |
| :------------------------ | :-------- | :------------------------------------------------------ |
| `/admin`                  | GUI       | Web administrative panel for content editors and staff. |
| `/api/[...slug]`          | REST      | Standardized REST API for all collections (CRUD).       |
| `/api/graphql`            | GraphQL   | GraphQL query and mutation endpoint.                    |
| `/api/graphql-playground` | GUI       | Interactive GraphQL explorer.                           |

---

## 4. Media & Asset Processing

- Uploads are processed with `sharp` to automatically generate responsive variants:
  - `thumbnail` (320 × 240, cover)
  - `card` (640 × 480, cover)
  - `hero` (1920 × 1080, cover)
- Uploaded files are stored in `public/media/` in local development and designed for seamless S3/R2 cloud storage migration in future infrastructure phases.

---

## 5. Administration & Governance Roadmap (Phase 03 Scope)

The `users` collection in Phase 02 provides minimal authentication credentials for the Payload Admin panel. The following security and governance capabilities are scheduled for Phase 03:

- Role-Based Access Control (Super Admin, Programme Manager, Admissions Reviewer, Editorial Staff, Media Manager)
- Multi-tier approval workflows (grant disbursements, admissions publishing)
- Staff email invitation workflows
- Account locking and suspension policies
- Multi-Factor Authentication (TOTP / Authenticator apps)
