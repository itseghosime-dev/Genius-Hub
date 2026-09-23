# Genius Hub — Search Engine Optimization (SEO) Architecture

## 1. Architectural Principles

Search Engine Optimization is a foundational engineering requirement for Genius Hub. The platform's global positioning as a development organization originating from Nigeria requires first-class international discoverability, rich structured metadata, and fast crawlability.

---

## 2. Reusable CMS SEO Field Architecture (Phase 02)

All public and indexable collections (`Programmes`, `Projects`, `Events`, `People`, `Partners`, `SuccessStories`, `Articles`, `ArticleCategories`, `FocusAreas`, `Locations`) and the `SiteSettings` global embed the standardized `seoFieldGroup` (`src/fields/seo.ts`).

### Field Schema & Behavior

| Field                 | Type           | Localized                  | Purpose & Fallback Strategy                                                                  |
| :-------------------- | :------------- | :------------------------- | :------------------------------------------------------------------------------------------- |
| **`metaTitle`**       | Text           | **Yes** (`en`, `fr`, `de`) | Search engine result title. Falls back to entity `title` or `name`.                          |
| **`metaDescription`** | Textarea       | **Yes** (`en`, `fr`, `de`) | Search snippet summary (150–160 chars). Falls back to `shortDescription` or `summary`.       |
| **`canonicalUrl`**    | Text           | No                         | Optional absolute canonical URL override. Defaults to auto-computed canonical route.         |
| **`ogTitle`**         | Text           | **Yes** (`en`, `fr`, `de`) | Social share title (Facebook, LinkedIn, Twitter/X). Falls back to `metaTitle`.               |
| **`ogDescription`**   | Textarea       | **Yes** (`en`, `fr`, `de`) | Social share snippet. Falls back to `metaDescription`.                                       |
| **`ogImage`**         | Upload (Media) | No                         | Open Graph share image (1200 × 630px). Falls back to `heroMedia` or global site brand image. |
| **`noIndex`**         | Checkbox       | No                         | Sets `robots: { index: false }` to prevent indexing of draft or private pages.               |
| **`noFollow`**        | Checkbox       | No                         | Sets `robots: { follow: false }` to instruct crawlers not to follow outbound links.          |
| **`customJsonLd`**    | Textarea       | No                         | Optional raw Schema.org JSON-LD override for specialized custom structured data.             |

> **Non-Forced Design**: Editors are never forced to fill out SEO fields. The frontend dynamic `generateMetadata()` function automatically synthesizes optimal fallback values from the entity's core content.

---

## 3. Strategic Topical SEO via Focus Areas

The `focus-areas` collection represents Genius Hub's primary development pillars (e.g., _Digital Skills & Tech Innovation_, _TVET & Vocational Mastery_, _Enterprise Incubation_, _Migration Reintegration_).

- Each Focus Area acts as a high-authority topical hub page (`/focus-areas/[slug]`).
- Aggregates and links all related `Programmes`, `Projects`, `Events`, `Articles`, and `SuccessStories`.
- Creates deep semantic topic clusters that establish search engine topical authority.

---

## 4. Multilingual SEO & `hreflang` Architecture

- Configured with `en` (default), `fr`, and `de` locales in Payload CMS.
- The future Next.js frontend will generate `hreflang` alternate tags for all localized routes:
  ```html
  <link
    rel="alternate"
    href="https://geniushubglobal.com/en/programmes/digital-skills"
    hreflang="en"
  />
  <link
    rel="alternate"
    href="https://geniushubglobal.com/fr/programmes/competences-numeriques"
    hreflang="fr"
  />
  <link
    rel="alternate"
    href="https://geniushubglobal.com/de/programmes/digitale-kompetenzen"
    hreflang="de"
  />
  <link
    rel="alternate"
    href="https://geniushubglobal.com/en/programmes/digital-skills"
    hreflang="x-default"
  />
  ```

---

## 5. Structured Data (JSON-LD) Schemas

Embedded dynamically via server-rendered `<script type="application/ld+json">` tags:

- **`Organization`**: Identifies Genius Hub Global, Nigeria origin, official contact channels, social handles, and founder citation (Isimeme Whyte).
- **`EducationalOccupationalProgram` / `Course`**: Details training curricula, duration, delivery format, and credentials.
- **`Event`**: Details workshop dates, venues, coordinates, and virtual livestream access.
- **`Article`**: Details author profiles, publication dates, and publisher info.
- **`BreadcrumbList`**: Enhances search engine result page breadcrumb navigation snippets.
- **`Place` / `CivicStructure`**: Details physical innovation hubs and training centers.

---

## 6. Core Web Vitals (CWV) Standards

Targeting top-tier performance percentiles:

- **Largest Contentful Paint (LCP)**: `< 2.0s`
- **Interaction to Next Paint (INP)**: `< 200ms`
- **Cumulative Layout Shift (CLS)**: `< 0.05`
