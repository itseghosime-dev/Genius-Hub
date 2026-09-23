# Genius Hub — Motion Design & Animation Language

## 1. Motion Principles

1. **Energetic & Purposeful**: Motion conveys optimism, brilliance, and community connectivity without slowing down user tasks.
2. **Never Obstructive**: Animations never hijack scroll behavior, delay critical content rendering, or block reading.
3. **Respect Reduced Motion**: Every animated component and SVG indicator respects OS-level `prefers-reduced-motion: reduce` settings with static or minimal fallbacks.
4. **Lightweight Execution**: Pure CSS keyframes and native transitions keep runtime JavaScript overhead at zero.

---

## 2. Motion Tokens

- **`fast` (150ms)**: Micro-interactions, hover highlights, checkbox toggles, focus rings.
- **`normal` (250ms)**: Dropdowns, badge transitions, accordion unfolds.
- **`slow` (400ms)**: Modal entrances, drawer slide-overs.
- **`energetic` (500ms)**: Photography reveals, card hover scaling, button action ripples.

---

## 3. BrandLoader Guidelines

The `BrandLoader` reflects the Genius Hub logo concept: a central **"G"** as the anchor surrounded by an orbiting constellation of **stars** representing brilliance, people, opportunity, and impact within a vibrant community ecosystem.

### Key Visual Attributes:

- **Central "G"**: Anchors the brand mark in signature Genius Orange (`#FF6B00`).
- **Surrounding Stars**: 5-star orbital constellation (Genius Orange, Digital Blue, Electric Teal, Optimistic Yellow) that pulses and gently rotates.
- **Light-First Background**: Designed for crisp white and soft cloud surfaces.
- **Accessibility**: Full `role="status"` with default label `Loading Genius Hub...` and complete reduction under `prefers-reduced-motion`.

### When to Use:

- Asynchronous client-side fetching indicators.
- In-flight form submission states.

### When NOT to Use:

- Do NOT use as a mandatory blocking splash screen.
- Do NOT display if content is already pre-rendered via Server Components.
