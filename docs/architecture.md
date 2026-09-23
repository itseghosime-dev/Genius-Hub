# Genius Hub — Platform Architecture

## 1. Architectural Vision & Paradigm

Genius Hub is architected as a **modular monolith**. This architecture maximizes developer velocity, maintains strict type safety across domains, avoids the operational complexity and network latency of premature microservices, and facilitates clean domain boundaries.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Next.js App Router (SSR / SSG)                  │
├───────────────────┬───────────────────┬────────────────────────────────┤
│   Public Web &    │    Programmes &   │    Commerce, Payments, &       │
│  Editorial CMS    │   Applications    │          Events                │
├───────────────────┴───────────────────┴────────────────────────────────┤
│                  Domain Features & Shared Core Services                │
├───────────────────┬───────────────────┬────────────────────────────────┤
│  PostgreSQL Store │   Redis / Queue   │  S3 / R2 Object Storage & CDN  │
│  (Data & Payload) │ (Cache / Workers) │    (High-Res Media Archive)    │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

---

## 2. Directory Structure & Organization

The project strictly follows the `src/` directory layout with `@/*` path aliasing:

```text
src/
├── app/                  # Next.js App Router routes, layouts, error boundaries, metadata
├── components/
│   ├── ui/               # Reusable UI primitives (buttons, dialogs, inputs)
│   ├── layout/           # Global structural components (header, footer, containers)
│   └── shared/           # Composite components reused across multiple domains
├── features/             # Domain-driven feature modules
│   ├── auth/             # Authentication, MFA, session management
│   ├── users/            # Accounts, role management, staff profiles
│   ├── content/          # Editorial, articles, success stories, pages
│   ├── programmes/       # Training programmes, cohorts, curriculums
│   ├── applications/     # Beneficiary applications, review workflows
│   ├── events/           # Event scheduling, ticketing, QR code check-in
│   ├── commerce/         # Products (physical, digital, training services)
│   ├── payments/         # Paystack/Flutterwave integrations, ledgers
│   ├── donations/        # Donor tracking, fundraising campaigns
│   ├── communications/   # Newsletter, transactional email dispatch
│   ├── media/            # Image galleries, photo archives, CDN hooks
│   ├── audit/            # Administrative activity and compliance logging
│   └── seo/              # Dynamic JSON-LD, sitemap indexing, metadata
├── lib/                  # Third-party library clients and SDK wrappers
├── config/               # App configuration and runtime environment validation
├── constants/            # Immutable brand constants, navigation keys, conversion goals
├── hooks/                # Reusable client-side React hooks (e.g., useReducedMotion)
├── types/                # Core TypeScript interfaces, API response envelopes, pagination
├── styles/               # Global styling, Tailwind CSS theme layers
└── utils/                # Pure utility and formatting functions
```

---

## 3. Feature Domain Encapsulation Pattern

When a feature domain is introduced in subsequent phases, it MUST follow a standard modular structure:

```text
src/features/<domain-name>/
├── components/     # Domain-scoped UI components
├── hooks/          # Domain-scoped React hooks
├── actions/        # Next.js Server Actions for mutations
├── api/            # Route handlers or API query clients
├── types/          # Domain TypeScript interfaces and Zod validation schemas
├── utils/          # Domain-specific transformation and computation logic
└── index.ts        # Explicit public API for cross-domain imports
```

### Domain Isolation Rules

1. Cross-domain dependencies MUST only import from the target feature's `index.ts` public interface.
2. Domain internal implementations (internal helper components or private utils) must not leak across features.
3. Server-only logic (database queries, secrets, API keys) must never be imported into client components.

---

## 4. Technology Stack & Planned Evolution

| Component            | Current Implementation (Phase 02)               | Planned Evolution / Adoption Phase                   |
| :------------------- | :---------------------------------------------- | :--------------------------------------------------- |
| **Framework**        | Next.js 16 (App Router, Turbopack, React 19)    | App Router with Turbopack & React 19                 |
| **Language**         | TypeScript 5 (Strict Mode)                      | Full end-to-end type safety                          |
| **Styling**          | Tailwind CSS v4                                 | Custom design token system + Tailwind                |
| **Package Manager**  | Bun (committed `bun.lock`)                      | Bun for local execution and CI                       |
| **CMS**              | Payload CMS 3.x (Embedded App Router)           | Dynamic editorial workflows, preview & RBAC          |
| **Database**         | PostgreSQL 16+ via `@payloadcms/db-postgres`    | Cloud PostgreSQL with connection pooling (PgBouncer) |
| **Rich Text**        | `@payloadcms/richtext-lexical` (Lexical engine) | Custom lexical block nodes & embed renderers         |
| **Migrations**       | Migration-driven (`bun run db:migrate`)         | Automated release phase CI/CD execution              |
| **Caching / Queues** | Deferred                                        | Redis (Upstash / Valkey) + BullMQ                    |
| **Object Storage**   | Local `/public/media` (Architecture S3-ready)   | AWS S3 / Cloudflare R2 + Global CDN                  |
| **Email Gateway**    | Console logger in dev                           | Amazon SES + React Email templates                   |
| **Payments**         | Deferred                                        | Paystack / Flutterwave / Stripe webhook handlers     |
| **Motion**           | Baseline accessibility hook                     | GSAP + ScrollTrigger with reduced-motion support     |
| **CI / CD**          | GitHub Actions (Validation)                     | GitHub Actions automated pipelines                   |

---

## 5. Core Architectural Decisions

1. **Modular Monolith over Microservices**: Prevents distributed systems failures, simplifies data integrity and transactions, and reduces DevOps overhead.
2. **Server-First Execution (RSC)**: Defaults to React Server Components to keep client JavaScript bundles minimal, improve initial page loads (LCP), and enhance SEO.
3. **Strict Validation at Boundaries**: All environment variables and external payloads (forms, webhooks, API requests) are strictly validated with Zod schemas.
4. **Resilient Error Boundaries**: Multi-tier error handling with `error.tsx`, `global-error.tsx`, and `not-found.tsx` preventing full-page application crashes.
