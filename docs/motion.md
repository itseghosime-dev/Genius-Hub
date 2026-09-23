# Genius Hub — Motion Design & Animation Language

## 1. Motion Principles

1. **Purposeful & Calm**: Motion is never ornamental; transitions clarify state changes and maintain reading continuity.
2. **Never Obstructive**: Animations never hijack scroll behavior, delay critical content rendering, or block reading.
3. **Respect Reduced Motion**: Every animated component and SVG indicator respects OS-level `prefers-reduced-motion: reduce` settings.
4. **Lightweight Execution**: Pure CSS keyframes and native transitions keep runtime JavaScript overhead at zero.

---

## 2. Motion Tokens

- **`fast` (150ms)**: Micro-interactions, hover highlights, checkbox toggles, focus rings.
- **`normal` (250ms)**: Dropdowns, badge transitions, accordion unfolds.
- **`slow` (400ms)**: Modal entrances, drawer slide-overs.
- **`editorial` (700ms)**: Headline reveals, photography transitions.

---

## 3. BrandLoader Guidelines

The redesigned `BrandLoader` depicts community gathering points (_People, Knowledge, Opportunity, Growth_) revolving gently on a warm light surface and resolving into the Genius Hub amber sun core.

### When to Use:

- Asynchronous client-side fetching indicators.
- In-flight form submission states.

### When NOT to Use:

- Do NOT use as a mandatory blocking splash screen.
- Do NOT display if content is already pre-rendered via Server Components.
