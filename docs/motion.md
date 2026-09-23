# Genius Hub — Motion Design & Animation Language

## 1. Motion Principles

1. **Energetic & Purposeful**: Motion conveys optimism and technological connectivity without slowing down task completion.
2. **Never Obstructive**: Animations never hijack scroll behavior, delay critical content rendering, or block reading.
3. **Respect Reduced Motion**: Every animated component and SVG indicator respects OS-level `prefers-reduced-motion: reduce` settings.
4. **Lightweight Execution**: Pure CSS keyframes and native transitions keep runtime JavaScript overhead at zero.

---

## 2. Motion Tokens

- **`fast` (150ms)**: Micro-interactions, hover highlights, checkbox toggles, focus rings.
- **`normal` (250ms)**: Dropdowns, badge transitions, accordion unfolds.
- **`slow` (400ms)**: Modal entrances, drawer slide-overs.
- **`energetic` (500ms)**: Photography reveals, card hover scaling, button action ripples.

---

## 3. BrandLoader Guidelines

The redesigned `BrandLoader` depicts community people nodes (Genius Orange, Digital Blue, Electric Teal) interconnected by orbital network motion, converging into the radiant Genius Hub sun core.

### When to Use:

- Asynchronous client-side fetching indicators.
- In-flight form submission states.

### When NOT to Use:

- Do NOT use as a mandatory blocking splash screen.
- Do NOT display if content is already pre-rendered via Server Components.
