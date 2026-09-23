# Genius Hub — Digital Design System & UI Foundation

## 1. Digital Design Principles

1. **Human Before Interface**: Real photography and authentic human stories take precedence over decorative UI flourishes.
2. **Evidence Over Decoration**: Quantitative milestones, verified statistics, and concrete beneficiary outcomes anchor the visual narrative.
3. **Global Quality, Nigerian Origin**: World-class engineering, crisp aesthetics, and performance celebrating African leadership and innovation.
4. **Technology Without Sterility**: Modern design warmed by amber/gold tones, organic textures, and editorial typography.
5. **Motion With Purpose**: Calm, functional transitions and reveals that reinforce reading continuity and strictly respect `prefers-reduced-motion`.
6. **Accessibility By Default**: WCAG 2.2 AA contrast ratios, visible 2px focus rings with offsets, minimum 48px touch targets, and full keyboard navigation.

---

## 2. Token Architecture & CSS Variables

Tokens are declared in `src/styles/tokens.css` and mapped to Tailwind CSS v4 in `src/styles/globals.css`.

### A. Semantic Color Palette

| Token                 | Light Surface | Dark Surface | Semantic Purpose                                      |
| :-------------------- | :------------ | :----------- | :---------------------------------------------------- |
| `--brand-primary`     | `#D97706`     | `#D97706`    | Primary action buttons, brand accents, key milestones |
| `--brand-secondary`   | `#0B1320`     | `#0B1320`    | Institutional headers, dark surface backgrounds       |
| `--brand-accent`      | `#059669`     | `#059669`    | Agriculture, sustainability, success highlights       |
| `--brand-tertiary`    | `#0284C7`     | `#0284C7`    | Tech training, innovation, digital skills             |
| `--surface-canvas`    | `#FFFFFF`     | `#0B1320`    | Main application viewport canvas                      |
| `--surface-primary`   | `#FFFFFF`     | `#0F172A`    | Card backgrounds, dialog containers                   |
| `--surface-secondary` | `#F8FAFC`     | `#1E293B`    | Subtle section backgrounds, input fills               |
| `--text-primary`      | `#0F172A`     | `#F8FAFC`    | Primary headings, body copy                           |
| `--text-secondary`    | `#475569`     | `#CBD5E1`    | Supporting descriptions, metadata                     |
| `--text-muted`        | `#64748b`     | `#94A3B8`    | Captions, disabled text, placeholders                 |

---

## 3. Typography Hierarchy

Fluid clamp calculations deliver optimal text scaling across viewports:

- **`text-display-xl`**: `clamp(2.5rem, 5vw + 1rem, 4.5rem)` (Hero headlines)
- **`text-display-lg`**: `clamp(2rem, 4vw + 0.75rem, 3.5rem)` (Major section titles)
- **`text-heading-xl`**: `clamp(1.75rem, 3vw + 0.5rem, 2.5rem)` (Page titles, primary section headers)
- **`text-heading-lg`**: `clamp(1.375rem, 2vw + 0.5rem, 1.875rem)` (Sub-headers, modal titles)
- **`text-heading-md`**: `clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem)` (Card titles)
- **`text-heading-sm`**: `1.125rem` (Sub-item labels)
- **`text-body-lg`**: `1.125rem` (Lead paragraphs)
- **`text-body-md`**: `1rem` (Standard body copy)
- **`text-body-sm`**: `0.875rem` (Descriptions, secondary text)
- **`text-label`**: `0.8125rem` (Eyebrows, uppercase tags)
- **`text-caption`**: `0.75rem` (Photo credits, timestamps)

---

## 4. Responsive Layout & Content Widths

- **`narrow`**: `48rem` (768px) — Single-column forms, focused settings
- **`reading`**: `42.5rem` (680px) — Editorial articles, long-form narratives
- **`default`**: `75rem` (1200px) — Standard page layouts, multi-column grids
- **`wide`**: `90rem` (1440px) — Hero showcases, media galleries
- **`full`**: `100%` — Full-bleed photography sections

---

## 5. UI Component Primitives

- **Buttons**: `Button`, `IconButton`, `LinkButton` (Variants: `primary`, `secondary`, `outline`, `ghost`, `inverse`, `danger`).
- **Form Controls**: `FormField`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`.
- **Containers**: `Container`, `Section`, `Stack`, `Cluster`, `Grid`.
- **Cards & Media**: `Card`, `MediaCard`, `MediaFrame`, `ResponsiveImage`, `ImageWithCaption`, `PhotoGrid`.
- **Feedback & Information**: `Badge`, `Tag`, `Stat`, `Avatar`, `Divider`, `Breadcrumbs`, `BrandLoader`.

---

## 6. Internal Showcase Route

For developer verification, visit:
`http://localhost:3000/dev/design-system`

This route is excluded from search indexing via `robots: { index: false, follow: false }`.
