# Genius Hub — Digital Platform

> **Public Information Architecture, Global Navigation & Route Hierarchy (Phase 05)**  
> A production-grade digital platform for **Genius Hub**, a global development organization originating from Nigeria.

---

## 1. Project Purpose & Positioning

Genius Hub is a global development organization empowering individuals, enterprises, and institutions through human capital development, vocational training programmes (TVET), technology-driven learning, and entrepreneurship incubation.

### Brand & Architectural Context

- **Master Brand**: Genius Hub
- **Positioning**: A global development organization originating from Nigeria.
- **Experience Direction**: Human/social impact + technology/future of work.
- **Visual & Storytelling Direction**: Photography, documentary storytelling, and human narratives are central design pillars. Leadership and founder storytelling (featuring Isimeme Whyte) is integrated prominently while maintaining an institution-led identity.
- **Primary Platform Conversion Goals**:
  1. **Apply for training** (Beneficiaries, students, professionals)
  2. **Partner with Genius Hub** (NGOs, governments, international development agencies, enterprises)
  3. **Buy Genius Hub products/services** (Artisan social enterprise merchandise, creative studio services, events)

---

## 2. Platform Architecture & Status (Phases 01–05)

- **Phase 01**: Engineering Foundation, Next.js 16 App Router, Turbopack, Tailwind CSS v4, Biome/ESLint, Vitest, Playwright.
- **Phase 02**: Payload CMS 3.x, PostgreSQL relational content model, 13 domain collections, Lexical rich text, multilingual (`en`/`fr`/`de`), migrations.
- **Phase 03**: Staff identity, invitation cryptographic token lifecycle, RBAC access control matrix, approval workflows, audit logging.
- **Phase 04**: Digital Brand System, semantic design tokens, WCAG 2.2 AA light-first theme, responsive layout primitives, accessible UI components (`Button`, `Form`, `Media`, `BrandLoader`).
- **Phase 05 (Current)**: Public Information Architecture (IA), typed central navigation configuration (`src/config/navigation.ts`), accessible desktop mega menus, responsive slide-out mobile drawer (`MobileNav`), global search dialog modal (`SearchDialog`), language switcher (`LanguageSelector`), 5-column footer (`Footer`), page header primitive with semantic breadcrumbs (`PageHeader`), public shell layout (`PublicLayout`), and crawlable public routes catalog.

---

## 3. Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, Turbopack)
- **CMS**: [Payload CMS 3.x](https://payloadcms.com/) (Embedded App Router Native Architecture)
- **Database**: [PostgreSQL 16+](https://www.postgresql.org/) via `@payloadcms/db-postgres`
- **Navigation & IA**: Strongly typed central config (`src/config/navigation.ts`)
- **Localization**: English (`en`), French (`fr`), German (`de`) with automatic fallback
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict mode, `noUncheckedIndexedAccess`, zero `any`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with semantic CSS variables
- **Package Manager**: [Bun](https://bun.sh/) (with committed `bun.lock`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) (Unit & components) & [Playwright](https://playwright.dev/) (E2E browser tests)

---

## 4. Getting Started

### Installation

Clone the repository and install dependencies using the frozen lockfile:

```bash
git clone https://github.com/itseghosime-dev/Genius-Hub.git
cd Genius-Hub
bun install --frozen-lockfile
```

### Environment Configuration

Copy the template environment file:

```bash
cp .env.example .env.local
```

### Local Database (PostgreSQL via Docker)

Start the local PostgreSQL database:

```bash
docker compose up -d
```

### Apply Database Migrations

```bash
bun run db:migrate
```

### Running Locally

Start the Next.js development server:

```bash
bun run dev
```

- Public Web App: [http://localhost:3000](http://localhost:3000)
- Design System Showcase: [http://localhost:3000/dev/design-system](http://localhost:3000/dev/design-system)
- Payload CMS Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 5. Available Scripts

| Command                | Description                                                     |
| :--------------------- | :-------------------------------------------------------------- |
| `bun run dev`          | Starts Next.js development server with Turbopack                |
| `bun run build`        | Compiles the production-ready optimized build                   |
| `bun run start`        | Runs compiled production server                                 |
| `bun run lint`         | Runs ESLint across all TypeScript/JavaScript files              |
| `bun run typecheck`    | Runs TypeScript compiler (`tsc --noEmit`) to verify type safety |
| `bun run test`         | Runs Vitest unit and component test suite                       |
| `bun run test:watch`   | Runs Vitest in interactive watch mode                           |
| `bun run test:e2e`     | Runs Playwright end-to-end browser tests                        |
| `bun run format`       | Formats the codebase with Prettier                              |
| `bun run format:check` | Verifies code formatting compliance                             |
| `bun run db:migrate`   | Executes pending database migrations against PostgreSQL         |

---

## 6. Public Route Hierarchy

- **Home**: `/`
- **About**: `/about`, `/about/leadership`, `/about/our-story`, `/about/governance`, `/about/locations`, `/about/partners`
- **What We Do**: `/focus-areas`, `/focus-areas/[slug]`, `/programmes`, `/programmes/[slug]`, `/projects`, `/projects/[slug]`
- **Impact & Stories**: `/impact`, `/impact/success-stories`, `/impact/success-stories/[slug]`, `/impact/reports`, `/impact/geographic-reach`
- **Events**: `/events`, `/events/[slug]`
- **Stories / News**: `/stories`, `/stories/[slug]`
- **Shop / Social Enterprise**: `/shop`, `/shop/[slug]`
- **Opportunities & Direct Action**: `/opportunities`, `/apply`, `/partner`, `/donate`, `/contact`
- **Legal & Trust**: `/privacy`, `/terms`, `/accessibility`

---

## 7. Architectural Documentation

Comprehensive engineering documentation is available in the `docs/` directory:

- [Information Architecture & Route Hierarchy](docs/information-architecture.md) — Public content taxonomy, route inventory, and priority hierarchy.
- [Global Navigation & Header System](docs/navigation.md) — Navigation config, mega menus, mobile drawer, search modal, and breadcrumbs.
- [Brand Audit & Digital Identity Translation](docs/brand-audit.md) — Brand colors, typography heritage, and digital translation.
- [Digital Design System & UI Foundation](docs/design-system.md) — Design tokens, light-first palette, typography, containers, and UI primitives.
- [Motion Design & Animation Language](docs/motion.md) — Motion principles, timing/easing tokens, BrandLoader, and reduced-motion rules.
- [Accessibility Standards](docs/accessibility.md) — WCAG 2.2 Level AA conformance pledge, focus management, and drawer trapping.
- [SEO Architecture](docs/seo.md) — Topical Focus Areas, dynamic metadata, JSON-LD schemas, and multilingual structure.
- [Access Control & RBAC Matrix](docs/access-control.md) — Role-to-permission mapping and least privilege enforcement.
- [Staff Authentication & Lifecycle](docs/staff-auth.md) — Cryptographic invitation workflows and session security.
- [Content Workflow & Governance](docs/content-workflow.md) — Multi-stage publication pipeline and separation of duties.
- [Content Model & Domain Topology](docs/content-model.md) — Domain entities, authoritative relationships, and ER diagram.

---

## 8. License

Copyright © Genius Hub Global. All rights reserved.
