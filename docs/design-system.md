# Genius Hub — Digital Design System Foundation

## 1. Digital Design Principles

1. **Human Before Interface**: Real documentary photography and authentic beneficiary narratives lead every visual layout.
2. **Technology & Future of Work**: Clean responsive grids, subtle connective motion, modern iconography, and digital blue/teal accents.
3. **Global Quality, Nigerian Origin**: World-class engineering, responsive accessibility, and performance celebrating African development leadership.
4. **Light-First & Energetic**: Pure white canvas, soft cloud sections, and vibrant Genius Orange replace cold dark dashboards and beige luxury styling.
5. **Expressive Impact**: Bold typographic numbers integrated into layouts rather than sterile SaaS KPI boxes.
6. **Accessibility By Default**: WCAG 2.2 AA compliance, visible 2px focus outlines, minimum 48px touch targets, and full keyboard operability.

---

## 2. Token Architecture & CSS Variables

Declared in `src/styles/tokens.css` and mapped to Tailwind CSS v4 in `src/styles/globals.css`.

### A. Surface Architecture

- **`--surface-canvas` (`#FFFFFF`)**: Pure Fresh White primary page canvas.
- **`--surface-primary` (`#FFFFFF`)**: Crisp document and card surfaces.
- **`--surface-cloud` (`#F8FAFC`)**: Soft Cloud alternating section canvas.
- **`--surface-subtle` (`#F1F5F9`)**: Light Slate contrast for inputs and subtle fills.
- **`--surface-inverse` (`#0F172A`)**: Deep Ink for global footer and high-contrast moments.

### B. Brand & Innovation Colors

- **`--brand-primary` (`#FF6B00`)**: Signature Genius Hub Orange. Primary action buttons, radiant sun core, and key highlights.
- **`--brand-blue` (`#2563EB`)**: Digital Blue for technology, software development, and future-of-work tracks.
- **`--brand-teal` (`#0D9488`)**: Electric Teal for connectivity, digital skills, and innovation badges.
- **`--brand-green` (`#16A34A`)**: Growth Green for sustainability, agriculture, and livelihood outcomes.
- **`--brand-yellow` (`#F59E0B`)**: Optimistic Yellow for alerts and highlights.
- **`--text-primary` (`#0F172A`)**: Deep Ink primary text.
- **`--text-secondary` (`#475569`)**: Slate secondary copy.

---

## 3. Typography Hierarchy

- **Contemporary Display (`Outfit`)**: Bold, energetic display and heading typeface with international presence and African optimism.
- **Humanist Sans (`Plus Jakarta Sans`)**: Clean, warm sans-serif for UI, inputs, captions, and body copy across English, French, and German.

| Token              | Family  | Size / Clamp                               | Purpose                       |
| :----------------- | :------ | :----------------------------------------- | :---------------------------- |
| `text-display-2xl` | Display | `clamp(2.75rem, 5.5vw + 1rem, 4.5rem)`     | Hero display headlines        |
| `text-display-xl`  | Display | `clamp(2.25rem, 4.5vw + 0.75rem, 3.75rem)` | Primary section headlines     |
| `text-display-lg`  | Display | `clamp(1.875rem, 3vw + 0.5rem, 2.75rem)`   | Major section titles          |
| `text-heading-xl`  | Display | `clamp(1.5rem, 2.25vw + 0.35rem, 2rem)`    | Page titles, primary headings |
| `text-heading-lg`  | Display | `clamp(1.25rem, 1.5vw + 0.25rem, 1.5rem)`  | Sub-headers, dialogue headers |
| `text-heading-md`  | Sans    | `clamp(1.125rem, 1vw + 0.25rem, 1.25rem)`  | Card titles                   |
| `text-body-lg`     | Sans    | `1.125rem` (line-height: 1.65)             | Lead narrative paragraphs     |
| `text-body-md`     | Sans    | `1rem` (line-height: 1.6)                  | Standard body copy            |
| `text-label`       | Sans    | `0.75rem` (letter-spacing: 0.06em, bold)   | Uppercase category eyebrows   |
| `text-caption`     | Sans    | `0.75rem`                                  | Photo credits, timestamps     |

---

## 4. UI Components & Layout Primitives

- **Buttons**: `Button` (Primary Orange, Innovation Blue, Secondary White, Outline, Ghost, Danger), `IconButton`, `LinkButton`.
- **Form Foundation**: `FormField`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`.
- **Cards**: `Card` (`default`, `editorial`, `cloud`, `feature`, `inverse`), `MediaCard` (with `editorial` open layout and hover image zoom).
- **Photography Layouts**: `ResponsiveImage`, `MediaFrame` (`1:1`, `4:5`, `3:2`, `16:9`, `21:9`), `ImageWithCaption`, `PhotoGrid`.
- **Impact & Navigation**: `Stat` (expressive bold metrics), `Avatar`, `Badge`, `Tag`, `Divider`, `Breadcrumbs`, `BrandLoader`.

---

## 5. Development Showcase Route

Visit:
`http://localhost:3000/dev/design-system` (Protected with `robots: { index: false, follow: false }`).
