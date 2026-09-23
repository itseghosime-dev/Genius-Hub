# Genius Hub — Digital Design System & Editorial Foundation

## 1. Digital Design Principles

1. **Human Before Interface**: Real documentary photography and authentic beneficiary narratives anchor every page.
2. **Evidence Over Decoration**: Verified quantitative milestones and factual outcomes replace arbitrary decorative graphics.
3. **Global Quality, Nigerian Origin**: World-class engineering, responsive accessibility, and performance celebrating African development leadership.
4. **Warmth & Dignity**: Earth-toned, warm paper palettes and editorial serif headlines replace sterile, cold technology dashboards.
5. **Motion With Purpose**: Calm, understated transitions that clarify reading continuity and strictly respect `prefers-reduced-motion`.
6. **Accessibility By Default**: WCAG 2.2 AA compliance, visible 2px focus outlines, minimum 48px touch targets, and full keyboard operability.

---

## 2. Token Architecture & CSS Variables

Declared in `src/styles/tokens.css` and mapped to Tailwind CSS v4 in `src/styles/globals.css`.

### A. Surface Architecture

- **`--surface-canvas` (`#FAF8F5`)**: Primary light background for all public layouts.
- **`--surface-primary` (`#FFFFFF`)**: Crisp document and card surfaces.
- **`--surface-cream` (`#FDFBF7`)**: Soft warm section canvas.
- **`--surface-sand` (`#F3EDE2`)**: Editorial callout sections, statistical backgrounds, and pull-quotes.
- **`--surface-stone` (`#EAE2D5`)**: Subtle neutral tone for input fields and tags.
- **`--surface-inverse` (`#1C1917`)**: Mineral Charcoal for global footer and high-contrast moments.

### B. Brand & Earth Accent Colors

- **`--brand-primary` (`#D97706`)**: Genius Amber Gold. Primary CTA buttons and key milestones.
- **`--brand-terracotta` (`#C2410C`)**: Earth Terracotta for artisanal and creative arts contexts.
- **`--brand-sage` (`#36533E`)**: Muted Forest Sage for agricultural and sustainability initiatives.
- **`--text-primary` (`#1C1917`)**: Mineral Charcoal text.
- **`--text-secondary` (`#57534E`)**: Warm Slate text.
- **`--border-default` (`#E7DFD3`)**: Subtle warm divider border.

---

## 3. Typography Hierarchy

- **Editorial Serif (`Lora`)**: Used for Display XL through Heading XL to evoke institutional prestige and editorial warmth.
- **Humanist Sans (`Plus Jakarta Sans`)**: Used for Heading LG down to Caption for high legibility and clean UI mechanics.

| Token             | Family | Clamp / Size                                  | Purpose                       |
| :---------------- | :----- | :-------------------------------------------- | :---------------------------- |
| `text-display-xl` | Serif  | `clamp(2.5rem, 5vw + 1rem, 4.25rem)`          | Hero headlines                |
| `text-display-lg` | Serif  | `clamp(2rem, 3.5vw + 0.75rem, 3.25rem)`       | Major section titles          |
| `text-heading-xl` | Serif  | `clamp(1.625rem, 2.5vw + 0.5rem, 2.25rem)`    | Page titles, primary headings |
| `text-heading-lg` | Sans   | `clamp(1.25rem, 1.75vw + 0.5rem, 1.75rem)`    | Sub-headers, dialogue headers |
| `text-heading-md` | Sans   | `clamp(1.125rem, 1.25vw + 0.35rem, 1.375rem)` | Card titles                   |
| `text-body-lg`    | Sans   | `1.125rem` (line-height: 1.65)                | Lead narrative paragraphs     |
| `text-body-md`    | Sans   | `1rem` (line-height: 1.6)                     | Standard body copy            |
| `text-label`      | Sans   | `0.75rem` (letter-spacing: 0.06em)            | Uppercase category eyebrows   |
| `text-caption`    | Sans   | `0.75rem`                                     | Photo credits, timestamps     |

---

## 4. UI Components & Editorial Primitives

- **Buttons**: `Button` (Primary Amber, Secondary Sand, Outline, Ghost, Danger), `IconButton`, `LinkButton`.
- **Form Foundation**: `FormField`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`.
- **Editorial Cards**: `Card` (`editorial`, `sand`, `cream`, `default`), `MediaCard` (with `editorial` open layout support).
- **Photography Layouts**: `ResponsiveImage`, `MediaFrame` (`1:1`, `4:5`, `3:2`, `16:9`, `21:9`), `ImageWithCaption`, `PhotoGrid`.
- **Impact & Navigation**: `Stat` (editorial milestone layout), `Avatar`, `Badge`, `Tag`, `Divider`, `Breadcrumbs`, `BrandLoader`.

---

## 5. Development Showcase Route

Visit:
`http://localhost:3000/dev/design-system` (Protected with `robots: { index: false, follow: false }`).
