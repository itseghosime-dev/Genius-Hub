# Genius Hub — Digital Platform

> **Content Architecture & CMS Foundation (Phase 02)**  
> A production-grade digital platform for **Genius Hub**, a global development organization originating from Nigeria.

---

## 1. Project Purpose & Positioning

Genius Hub is a global development organization empowering individuals, enterprises, and institutions through human capital development, vocational training programmes, technology-driven learning, and entrepreneurship incubation.

### Brand & Architectural Context

- **Master Brand**: Genius Hub
- **Positioning**: A global development organization originating from Nigeria.
- **Experience Direction**: Human/social impact + technology/future of work.
- **Visual & Storytelling Direction**: Photography and human narratives are central design pillars. Leadership and founder storytelling (featuring Isimeme Whyte) is integrated prominently while maintaining an institution-led identity.
- **Primary Platform Conversion Goals**:
  1. **Apply for training** (Beneficiaries, students, professionals)
  2. **Partner with Genius Hub** (NGOs, governments, international development agencies, enterprises)
  3. **Buy Genius Hub products/services** (E-commerce merchandise, digital courses, studio/consulting bookings)

---

## 2. Current Status — Phase 02: Payload CMS + PostgreSQL + Domain Content Architecture

This repository contains the **Phase 02 domain content and data architecture**. The CMS and database layers model Genius Hub's real organizational entities and cross-domain relationships.

### Core Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, Turbopack)
- **CMS**: [Payload CMS 3.x](https://payloadcms.com/) (Embedded App Router Native Architecture)
- **Database**: [PostgreSQL 16+](https://www.postgresql.org/) via `@payloadcms/db-postgres`
- **Rich Text Editor**: `@payloadcms/richtext-lexical` (Lexical Engine)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict mode, `noUncheckedIndexedAccess`, zero `any`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Package Manager**: [Bun](https://bun.sh/) (with committed `bun.lock`)
- **Code Quality**: ESLint 9 (Flat Config), Prettier with Tailwind CSS plugin
- **Testing**: [Vitest](https://vitest.dev/) (Unit & collections tests) & [Playwright](https://playwright.dev/) (End-to-End smoke tests)
- **Environment Validation**: [Zod](https://zod.dev/) runtime schema validation

---

## 3. Prerequisites

- **[Bun](https://bun.sh/)**: `^1.2.0` (declared in `package.json` as `bun@1.4.2`)
- **[Docker](https://www.docker.com/)**: Optional (for running local PostgreSQL 16 container)
- **[Node.js](https://nodejs.org/)**: `>= 20.0.0` (for auxiliary tooling environments)

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

Start the Next.js development server with Payload CMS:

```bash
bun run dev
```

- Public Web App: [http://localhost:3000](http://localhost:3000)
- Payload CMS Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)
- GraphQL Endpoint: [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)

---

## 5. Available Scripts

| Command                            | Description                                                         |
| :--------------------------------- | :------------------------------------------------------------------ |
| `bun run dev`                      | Starts the Next.js development server with Turbopack                |
| `bun run build`                    | Compiles the production-ready optimized build                       |
| `bun run start`                    | Runs the compiled production server                                 |
| `bun run lint`                     | Runs ESLint across all TypeScript/JavaScript files                  |
| `bun run typecheck`                | Runs the TypeScript compiler (`tsc --noEmit`) to verify type safety |
| `bun run test`                     | Runs the Vitest unit & domain collection test suite                 |
| `bun run test:watch`               | Runs Vitest in interactive watch mode                               |
| `bun run test:e2e`                 | Runs Playwright end-to-end browser tests                            |
| `bun run format`                   | Automatically formats the codebase with Prettier                    |
| `bun run format:check`             | Verifies code formatting compliance without modifying files         |
| `bun run db:migrate`               | Executes pending database migrations against PostgreSQL             |
| `bun run db:migrate:create <name>` | Generates a new migration file from collection schema diffs         |
| `bun run db:migrate:status`        | Displays migration status history                                   |
| `bun run generate:types`           | Generates TypeScript interfaces from Payload collections            |
| `bun run generate:importmap`       | Generates Payload Admin UI import map                               |

---

## 6. Domain Content Collections

The data layer models Genius Hub's organizational ecosystem:

- **`Programmes` (`programmes`)**: Long-running training initiatives, focus areas, delivery modes, eligibility, and impact metrics.
- **`Projects` (`projects`)**: Specific funded delivery efforts, partner grants, target community locations, and outcomes.
- **`Events` (`events`)**: Workshops, summits, hackathons, and ceremonies with hybrid venue details and speakers.
- **`People` (`people`)**: Leadership (including founder Isimeme Whyte), staff, facilitators, speakers, and authors.
- **`Partners` (`partners`)**: International development organizations, donors, government agencies, and corporate sponsors.
- **`Media` (`media`)**: Central reusable asset library with upload capabilities, image sizing, and copyright attribution.
- **`SuccessStories` (`success-stories`)**: Beneficiary narratives, pull-quotes, and verified outcome statistics.
- **`Articles` (`articles`)**: Editorial thought leadership, institutional news, and case studies.
- **`Users` (`users`)**: Authenticated admin users with role-based governance.
- **`SiteSettings` (Global)**: Brand identity, headquarters contact info, social links, and fallback SEO.

---

## 7. Architectural Documentation

Comprehensive engineering documentation is available in the `docs/` directory:

- [Architecture Guide](docs/architecture.md) — System topology, domain encapsulation, and future stack roadmap.
- [Database & Migrations Guide](docs/database-and-migrations.md) — PostgreSQL schema, Docker workflow, and migration lifecycle.
- [Security Architecture](docs/security.md) — Implemented baseline and planned OWASP / ASVS defense-in-depth model.
- [SEO Architecture](docs/seo.md) — Metadata API, dynamic sitemaps, JSON-LD schemas, and CWV guidelines.
- [Accessibility Standards](docs/accessibility.md) — WCAG 2.2 Level AA compliance guidelines and motion preferences.
- [Performance Principles](docs/performance.md) — Media/CDN pipelines, caching strategies, and RSC optimization.
- [Git & Engineering Workflow](docs/git-workflow.md) — Branching standards, conventional commits, and CI pipelines.

---

## 8. License

Copyright © Genius Hub Global. All rights reserved.
