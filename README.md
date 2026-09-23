# Genius Hub — Digital Platform

> **Engineering Foundation (Phase 01)**  
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

## 2. Current Status — Phase 01: Project Foundation

This repository currently contains the **Phase 01 engineering foundation**. Product features (CMS integration, authentication, payments, databases, and e-commerce) are intentionally deferred to dedicated subsequent phases.

### Core Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, Turbopack)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict mode, `noUncheckedIndexedAccess`, zero `any`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Package Manager**: [Bun](https://bun.sh/) (with committed `bun.lock`)
- **Code Quality**: ESLint 9 (Flat Config), Prettier with Tailwind CSS plugin
- **Testing**: [Vitest](https://vitest.dev/) (Unit/DOM tests) & [Playwright](https://playwright.dev/) (End-to-End smoke tests)
- **Environment Validation**: [Zod](https://zod.dev/) runtime schema validation

---

## 3. Prerequisites

- **[Bun](https://bun.sh/)**: `^1.2.0` (declared in `package.json` as `bun@1.4.2`)
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

### Running Locally

Start the Next.js development server:

```bash
bun run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 5. Available Scripts

| Command                | Description                                                         |
| :--------------------- | :------------------------------------------------------------------ |
| `bun run dev`          | Starts the Next.js development server with Turbopack                |
| `bun run build`        | Compiles the production-ready optimized build                       |
| `bun run start`        | Runs the compiled production server                                 |
| `bun run lint`         | Runs ESLint across all TypeScript/JavaScript files                  |
| `bun run typecheck`    | Runs the TypeScript compiler (`tsc --noEmit`) to verify type safety |
| `bun run test`         | Runs the Vitest unit/integration test suite                         |
| `bun run test:watch`   | Runs Vitest in interactive watch mode                               |
| `bun run test:e2e`     | Runs Playwright end-to-end browser tests                            |
| `bun run format`       | Automatically formats the codebase with Prettier                    |
| `bun run format:check` | Verifies code formatting compliance without modifying files         |

---

## 6. Project Architecture

The codebase enforces a clean, modular monolith architecture within `src/`:

```text
src/
├── app/                  # Next.js App Router (pages, layouts, robots, sitemap, error boundaries)
├── components/
│   ├── ui/               # Reusable UI primitives (buttons, inputs, dialogs)
│   ├── layout/           # Structural layout shells (header, footer, containers)
│   └── shared/           # Composite widgets reused across features
├── features/             # Domain-driven feature modules (auth, programmes, events, commerce, etc.)
├── lib/                  # Third-party SDK wrappers and client instances
├── config/               # App configuration and Zod environment schemas
├── constants/            # Immutable brand constants and conversion goals
├── hooks/                # Custom React hooks (e.g., useReducedMotion)
├── types/                # Core TypeScript interfaces and API envelopes
├── styles/               # Global styling and Tailwind CSS layers
└── utils/                # Pure utility functions and formatters
```

---

## 7. Architectural Documentation

Comprehensive engineering documentation is available in the `docs/` directory:

- [Architecture Guide](docs/architecture.md) — System topology, domain encapsulation, and future stack roadmap.
- [Security Architecture](docs/security.md) — Implemented baseline and planned OWASP / ASVS defense-in-depth model.
- [SEO Architecture](docs/seo.md) — Metadata API, dynamic sitemaps, JSON-LD schemas, and CWV guidelines.
- [Accessibility Standards](docs/accessibility.md) — WCAG 2.2 Level AA compliance guidelines and motion preferences.
- [Performance Principles](docs/performance.md) — Media/CDN pipelines, caching strategies, and RSC optimization.
- [Git & Engineering Workflow](docs/git-workflow.md) — Branching standards, conventional commits, and CI pipelines.

---

## 8. License

Copyright © Genius Hub Global. All rights reserved.
