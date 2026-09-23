# Genius Hub — Motion Design & Animation Language

## 1. Motion Principles

1. **Purposeful & Calm**: Motion is never ornamental; every transition serves to clarify state changes, reveals, or navigation continuity.
2. **Never Obstructive**: Animations must never block user interaction, slow down reading, or hijack scroll behavior.
3. **Respect Reduced Motion**: Every animation incorporates `prefers-reduced-motion: reduce` overrides globally, converting transforms into instant transitions or subtle opacity fades.
4. **Lightweight Execution**: Core primitives and loaders use native CSS transitions and SVG vector keyframes to maintain zero runtime JavaScript animation overhead.

---

## 2. Motion Tokens

Declared in `src/lib/motion/tokens.ts` and `src/styles/tokens.css`:

### Durations

- **`fast` (150ms)**: Micro-interactions, hover highlights, checkbox toggles, focus rings.
- **`normal` (250ms)**: Dropdown menus, badge transitions, accordion unfolds.
- **`slow` (400ms)**: Modal entrances, drawer slide-overs, tab switching.
- **`editorial` (700ms)**: Cinematic headline reveals, large photography cross-fades.

### Easing Curves

- **`standard` (`cubic-bezier(0.2, 0.0, 0, 1.0)`)**: Natural UI movement for everyday controls.
- **`enter` (`cubic-bezier(0.0, 0.0, 0.2, 1.0)`)**: Entering viewport / opening dialogs.
- **`exit` (`cubic-bezier(0.4, 0.0, 1.0, 1.0)`)**: Leaving viewport / dismissals.
- **`editorial` (`cubic-bezier(0.16, 1.0, 0.3, 1.0)`)**: Decelerating curve for editorial hero elements.

---

## 3. BrandLoader Guidelines

The `BrandLoader` component visually depicts interconnected nodes (People, Knowledge, Opportunity, Impact) revolving smoothly and connecting to the radiant Genius Hub amber core.

### When to Use:

- Initial async client-side data fetches.
- Standalone page transition states.
- Async form submission verification.

### When NOT to Use:

- Do NOT use as a mandatory blocking splash screen on initial page visits.
- Do NOT display if content is already pre-rendered via Server Components.
