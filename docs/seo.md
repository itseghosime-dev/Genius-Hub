# Genius Hub — Search Engine Optimization (SEO) Architecture

## 1. Architectural Principles

Search Engine Optimization is a foundational engineering requirement for Genius Hub. The platform's global positioning as a development organization originating from Nigeria requires first-class international discoverability, rich structured metadata, and fast crawlability.

---

## 2. Implemented Foundation (Phase 01)

The Phase 01 architecture implements the baseline Next.js App Router SEO primitives:

### A. Centralized Site Metadata & Metadata API
- Configured in `src/config/site.ts` and applied via `src/app/layout.tsx`.
- **Title Template**: `%s | Genius Hub` ensures consistent branded title hierarchy across all future routes.
- **Metadata Base**: Uses canonical `NEXT_PUBLIC_APP_URL` to ensure relative Open Graph and Twitter image URLs resolve to absolute URLs during crawling.
- **Default Open Graph & Twitter Cards**: Base tags for `type: website`, `locale: en_US`, and `card: summary_large_image`.

### B. Dynamic Robots & Sitemap Routes
- `src/app/robots.ts`: Generates standard `robots.txt` allowing general crawling while disallowing `/api/` and `/admin/` paths, and linking to the dynamic sitemap.
- `src/app/sitemap.ts`: Generates standard `sitemap.xml` with automatic change frequency and priority headers.

---

## 3. Planned SEO Architecture (Subsequent Phases)

As the CMS (Payload) and dynamic domains are integrated, the SEO system will expand as follows:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Dynamic Next.js Route                           │
├──────────────────────────────────┬─────────────────────────────────────┤
│         generateMetadata()       │          Page Component (RSC)       │
│  - Meta Title, Description       │  - Semantic HTML (h1, h2, nav, main)│
│  - Canonical URL & Alternates    │  - High-performance images with alt │
│  - OpenGraph / Dynamic Social Img│  - JSON-LD Schema Scripts           │
│  - Robots index/noindex controls │                                     │
└──────────────────────────────────┴─────────────────────────────────────┘
```

### 1. Dynamic Structured Data (JSON-LD)
Schema.org structured data components will be embedded via server-rendered `<script type="application/ld+json">` tags:
- **`Organization`**: Identifies Genius Hub Global, Nigeria origin, social links, contact points, and founder/leadership references.
- **`Course` / `EducationalOccupationalProgram`**: Details training curricula, duration, prerequisites, certification, and provider.
- **`Event`**: Details workshop dates, venues (physical and virtual), registration URLs, and ticketing.
- **`Article`**: Details editorial blogs, author profiles, publication dates, and publisher info.
- **`Product`**: Details e-commerce physical and digital merchandise with currency, availability, and pricing.
- **`BreadcrumbList`**: Enhances search engine result page navigation snippets.
- **`FAQPage`**: Embeds structured answers for programme admissions and partner inquiries.

### 2. Multilingual SEO & `hreflang`
- Dynamic language routing supporting English (`en`) and French (`fr`).
- Automatic generation of `hreflang` alternate link tags in HTML `<head>` and `sitemap.xml`.
- Dedicated `x-default` canonical fallback mapping.

### 3. CMS-Driven Slug & Redirect Engine
- All CMS content types (Pages, Programmes, Articles, Events, Products) will support:
  - Custom URL slugs.
  - Automatic historical slug tracking: when an editor modifies a slug, a `301 Permanent Redirect` rule is stored in the database to prevent broken inbound backlinks.
  - Granular `noindex` and `nofollow` overrides for private or draft pages.
  - Custom canonical URL overrides.

### 4. Image SEO & Dynamic Social Graph Generation
- Mandatory descriptive `alt` text validation across all CMS image uploads.
- Dynamic social share image generation using `@vercel/og` (`ImageResponse` API) to generate customized Open Graph cards featuring programme titles, dates, and branding.

### 5. Sitemap Indexing for Large Datasets
- For high-volume archives (event archives, media galleries, alumni directories), dynamic sitemap indexing (`sitemap-index.xml`) splitting sitemaps into domain chunks (e.g., `/sitemap-programmes.xml`, `/sitemap-blog.xml`).

### 6. Core Web Vitals (CWV) Standards
Targeting top-tier performance percentiles:
- **Largest Contentful Paint (LCP)**: `< 2.0s`
- **Interaction to Next Paint (INP)**: `< 200ms`
- **Cumulative Layout Shift (CLS)**: `< 0.05`

