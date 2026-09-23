# Genius Hub — Accessibility (a11y) Standards

## 1. Compliance Target

Genius Hub is committed to ensuring full digital accessibility for all beneficiaries, partners, staff, and visitors. The official standard for the platform is **WCAG 2.2 Level AA** conformance.

---

## 2. Implemented Foundation (Phase 01)

### A. Semantic Document Tree

- Root layout enforces `<html lang="en">` for screen reader localization.
- Application templates enforce valid HTML5 landmark elements: `<main>`, `<header>`, `<footer>`, `<nav>`, `<aside>`, and `<section>`.
- Logical heading progression (`<h1>` -> `<h2>` -> `<h3>`) without skipped heading levels.

### B. Motion Accessibility Foundation

- Created `src/hooks/use-reduced-motion.ts` to detect the OS-level `prefers-reduced-motion: reduce` media query.
- Establishes the prerequisite hook for future GSAP and CSS animations to ensure motion can be disabled or minimized for users with vestibular disorders.

### C. Keyboard Operability & Focus State Foundations

- Base focus state utilities configured using visible high-contrast focus rings (`focus:ring-2`, `focus:outline-hidden`).
- Custom 404 and Error boundary pages are fully operable via standard keyboard interactions (`Tab`, `Enter`, `Space`).

---

## 3. Engineering Guidelines for Subsequent Phases

All UI primitives, layout structures, and interactive features built in subsequent phases must adhere to these non-negotiable standards:

### 1. Keyboard Navigation & Focus Management

- **Complete Keyboard Operability**: Every interactive element (buttons, links, form inputs, modal triggers, accordions, tabs) must be reachable and actionable via keyboard.
- **Focus Order**: DOM order must match the visual reading order.
- **Focus Trapping**: Modals, drawer sidebars, and dialog overlays must trap keyboard focus within the active container while open.
- **Focus Restoration**: Closing a modal or overlay must return focus to the triggering element.
- **No Keyboard Traps**: Users must never become trapped in any widget.

### 2. ARIA Roles & Screen Reader Semantics

- Native HTML elements (`<button>`, `<a>`, `<input>`, `<select>`) must always be preferred over `<div>` or `<span>` with click handlers.
- When composite widgets require ARIA:
  - Use `aria-expanded` on collapsible menus and accordions.
  - Use `aria-haspopup` and `aria-controls` where appropriate.
  - Use `aria-live="polite"` or `aria-live="assertive"` for dynamic status messages, toast notifications, and cart updates.
  - Use `aria-invalid` and `aria-describedby` to link form fields to their specific error messages.

### 3. Color Contrast & Visual Design

- **Normal Text**: Contrast ratio of at least `4.5:1` against its background.
- **Large Text (>= 18pt or 14pt bold)**: Contrast ratio of at least `3:0:1`.
- **UI Components & Graphical Objects**: Contrast ratio of at least `3.0:1` for interactive borders and active icons.
- **Color Independence**: Color must never be the sole visual indicator of information, state, or an action (e.g., error fields must have icons or explanatory text, not just a red border).

### 4. Touch Targets & Spacing

- All interactive controls on mobile and touch devices must maintain a minimum target size of **44 × 44 CSS pixels**, including adequate surrounding touch padding.

### 5. Media & Imagery Accessibility

- All images rendered via `next/image` must include descriptive `alt` text explaining context and content.
- Purely decorative images must use empty `alt=""` and `aria-hidden="true"`.
- Video media must include closed captions and transcript availability.

### 6. Automated Verification

- Future CI/CD pipelines will integrate `@axe-core/playwright` to automatically audit rendered pages during E2E runs and fail builds on accessibility regressions.
