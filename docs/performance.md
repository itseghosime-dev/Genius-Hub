# Genius Hub — Performance Engineering Principles

## 1. Performance Philosophy

Genius Hub will house extensive media archives, high-resolution photography collections, active programme catalogues, and high-concurrency event registrations. Performance is treated as an essential architectural foundation rather than an afterthought.

---

## 2. Media & Image Delivery Strategy

Photography will be a major storytelling element across the platform. To maintain sub-second loading times:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Original Upload (S3 / R2)                       │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                    Next.js Image / CDN Edge Transform                  │
│       - Modern format encoding (AVIF first, fallback WebP)             │
│       - Dynamic resizing & responsive srcset generation                │
│       - Metadata stripping & lossy/lossless compression                │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                       Global Edge CDN Cache                            │
│                 Cache-Control: public, max-age=31536000                │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                         Browser Client Render                          │
│         - Native lazy loading (loading="lazy", decoding="async")       │
│         - Hero images: priority={true} / fetchpriority="high"          │
│         - Explicit width/height to eliminate Layout Shift (CLS)        │
└────────────────────────────────────────────────────────────────────────┘
```

### Media Rules

1. **Next.js Image Component**: Raw `<img>` tags are strictly prohibited. All imagery must use `next/image` with explicit `sizes` attributes for responsive breakpoints.
2. **Next-Gen Formats**: Configuration in `next.config.ts` forces automatic delivery of AVIF and WebP formats.
3. **LCP Hero Prioritization**: Above-the-fold hero images must use `priority` flag to pre-load critical assets.
4. **Offscreen Assets**: All below-the-fold media will load lazily with lightweight blurred placeholder backdrops.

---

## 3. Rendering & Caching Architecture

### A. React Server Components (RSC) First

- Keep client bundle sizes minimal by rendering all structural, editorial, and layout trees on the server.
- Interactive client components (`'use client'`) must be pushed to the leaves of the component tree.

### B. Dynamic Imports for Heavy Components

- Rich widgets (such as interactive maps, chart dashboards, modal dialogues, rich text editors, or QR code scanners) must be dynamically loaded using `next/dynamic` to avoid bloating initial route bundles.

### C. Static & Incremental Generation (SSG / ISR)

- High-traffic public pages (Home, About, Programme Catalogues, Editorial Articles) will leverage Incremental Static Regeneration (ISR) with revalidation periods, serving static HTML from the edge cache while refreshing asynchronously in the background.

### D. Multi-Tiered Caching

1. **Edge CDN**: Static assets (`/_next/static/*`, media) cached with immutable 1-year headers.
2. **Redis In-Memory Cache**: High-frequency database read operations (active programme lists, event capacity checks, site settings) cached in Redis with granular cache-invalidation tags.
3. **Database Query Optimization**: Parameterized queries with composite indexes on high-cardinality filters (`cohort_id`, `status`, `published_at`).

---

## 4. Background Job Offloading

Any task requiring more than 100ms of processing time must NEVER block HTTP response cycles. The following workloads will be dispatched to background Redis worker queues:

- Bulk newsletter and marketing email dispatches.
- Transactional PDF receipt and ticket QR code rendering.
- Beneficiary application batch exports.
- High-resolution image transform pipelines.
- External webhook retry cycles.

---

## 5. Performance Budget & Metrics

| Metric                              | Target              | Enforced By                |
| :---------------------------------- | :------------------ | :------------------------- |
| **First Contentful Paint (FCP)**    | `< 1.2s`            | Lighthouse / Web Vitals CI |
| **Largest Contentful Paint (LCP)**  | `< 2.0s`            | Lighthouse / Web Vitals CI |
| **Interaction to Next Paint (INP)** | `< 200ms`           | Real User Monitoring (RUM) |
| **Cumulative Layout Shift (CLS)**   | `< 0.05`            | Lighthouse / Web Vitals CI |
| **Total Initial Client JS Bundle**  | `< 100kB` (gzipped) | Next.js Build Analytics    |
