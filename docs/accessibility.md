# Genius Hub — Accessibility (a11y) Standards

## 1. Compliance Target

Genius Hub is committed to ensuring full digital accessibility for all beneficiaries, partners, staff, and visitors. The official standard for the platform is **WCAG 2.2 Level AA** conformance.

---

## 2. Implemented Foundation & Navigation Systems (Phases 01–05)

### A. Semantic Document Tree & Landmark Regions

- Root layout enforces `<html lang="en">` with multi-language selector support (`en`, `fr`, `de`).
- Semantic landmark elements: `<header role="banner">`, `<main id="main-content">`, `<footer role="contentinfo">`, `<nav aria-label="...">`.
- Top-of-page accessible skip link: `"Skip to main content"` (`<a href="#main-content">`) visible immediately on keyboard focus.
- Logical heading progression (`<h1>` -> `<h2>` -> `<h3>`) across all public layout templates.

### B. Navigation & Modal Accessibility (Phase 05)

- **Desktop Mega Menu**: Navigable via keyboard tab navigation, with clear visual hover and focus highlights and semantic link descriptions.
- **Mobile Drawer Navigation (`MobileNav`)**:
  - Semantic `role="dialog"` with `aria-modal="true"` and `aria-label="Mobile Navigation"`.
  - Focus trapping contained inside drawer while open.
  - Background scrolling locked (`overflow: hidden`).
  - Escape key listener for immediate dismissal.
  - Interactive accordion sections with `aria-expanded` attributes.
- **Global Search Modal (`SearchDialog`)**:
  - `role="dialog"` with `aria-modal="true"`.
  - Accessible `searchbox` input with explicit label and `aria-autocomplete`.
  - Full keyboard accessibility with `Cmd+K` global shortcut.
- **Breadcrumb Navigation (`PageHeader`)**:
  - Accessible `<nav aria-label="Breadcrumb">` containing structured `<ol>` list.
  - Active current page indicated with `aria-current="page"`.

### C. Motion Accessibility & Reduced Motion

- Hook `src/hooks/use-reduced-motion.ts` detects OS `prefers-reduced-motion: reduce`.
- Global CSS `@media (prefers-reduced-motion: reduce)` in `src/styles/globals.css` eliminates non-essential transitions and motion effects.
- `BrandLoader` respects reduced motion by disabling pulse and orbital rotation.

### D. Keyboard Operability & Focus States

- Visible high-contrast focus rings (`:focus-visible` with 2px solid `--focus-ring` and 2px offset).
- UI Primitives (`Button`, `IconButton`, `LinkButton`, `Input`, `Select`, `Checkbox`, `Radio`) feature full keyboard operability and accessible error state mappings (`aria-invalid`, `aria-describedby`).
- Minimum touch targets of 44–48px across all mobile buttons, links, and navigation items.

---

## 3. Engineering Guidelines for Subsequent Phases

All UI components, layout structures, and interactive features built in subsequent phases must adhere to these non-negotiable standards:

1. **Complete Keyboard Operability**: Every interactive element must be reachable and actionable via keyboard.
2. **Focus Management**: Focus restoration on modal close; no keyboard traps.
3. **Color Contrast**: Normal text minimum `4.5:1`; large text minimum `3.0:1`; interactive graphical elements minimum `3.0:1`.
4. **Color Independence**: Color must never be the sole visual indicator of information, state, or an action.
5. **Touch Targets**: All interactive touch targets must measure at least `44 × 44px`.
6. **Media Accessibility**: Descriptive `alt` attributes on all contextual images; `alt=""` and `aria-hidden="true"` on decorative icons.
