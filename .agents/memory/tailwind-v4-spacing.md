---
name: Tailwind v4 spacing/max-width conflict
description: How to handle the unified spacing scale conflict between custom spacing tokens and max-w-* utilities in Tailwind v4
---

## The Problem
In Tailwind v4, `max-w-{named-size}` utilities (xs, sm, md, lg, xl, 2xl, 3xl) use `var(--spacing-{size})` from the unified spacing scale. Defining `--spacing-2xl: 3rem` in `@theme` makes `max-w-2xl = 3rem` (96px) instead of the expected 42rem.

## The Fix
Define `--spacing-{size}` in `@theme` with the CONTAINER values (matching Tailwind v3's named max-w scale):
- `--spacing-xs: 20rem`, `--spacing-sm: 24rem`, `--spacing-md: 28rem`
- `--spacing-lg: 32rem`, `--spacing-xl: 36rem`
- `--spacing-2xl: 42rem`, `--spacing-3xl: 48rem`

Then OVERRIDE gap/padding/margin utilities in `@layer utilities` with design-system values. CSS cascade: `@layer utilities` declarations defined AFTER `@import "tailwindcss"` win within the same layer.

**Why:** Tailwind v4 has a unified spacing scale — one `--spacing-*` variable affects both max-w and spacing utilities. The `@layer utilities` override pattern separates concerns cleanly.

**How to apply:** Any Next.js + Tailwind v4 project using named spacing tokens AND `max-w-*` named sizes.

## Note on container scale
`max-w-4xl`, `max-w-5xl`, `max-w-6xl`, `max-w-7xl` use `var(--container-4xl)` etc. (separate token), so these are NOT affected by the spacing scale conflict.
