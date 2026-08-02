# Module 04 — Component API Design

## Why this matters

Component props are a **public API**. Poorly typed props lead to invalid combinations at runtime (`href` missing on a link button), accessibility bugs (`input` without `label`), and refactor pain when HTML attributes are dropped.

This module teaches how to extend native element props, encode business rules in types, and model **mutually exclusive** prop sets — patterns used in every design system (Button, Input, Modal, Link).

## Problem it solves

| UX requirement | Type-level solution |
| -------------- | ------------------- |
| Button supports all native `<button>` attrs | `ButtonProps extends React.ComponentPropsWithoutRef<"button">` |
| Input with `id` must have `label` (a11y) | Discriminated union: `{ id: string; label: string } \| { id?: undefined }` |
| Modal action is link OR button, not both | Mutually exclusive union on `mode` |

Without these patterns, teams document rules in comments and catch violations in QA.

## Concepts in this module

| Concept | Use in React |
| ------- | ------------ |
| `ComponentPropsWithoutRef` | Extend native HTML props without losing ref typing |
| `ComponentPropsWithRef` | When forwarding refs matters |
| Omit / Pick on props | Remove conflicting props when wrapping elements |
| Discriminated prop unions | Conditional required fields (`id` → `label`) |
| Mutually exclusive props | `mode: "internal" \| "external" \| "button"` with matching fields |
| `@ts-expect-error` tests | Document invalid prop combinations |

### Small conceptual examples

```tsx
// Extend native button — variant + all button HTML attrs
type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
};

// Accessibility: label required when id is set
type InputProps =
  | { id: string; label: string; value: string; onChange: (v: string) => void }
  | { id?: undefined; label?: string; value: string; onChange: (v: string) => void };

// Mutually exclusive modal actions
type ModalActionProps =
  | { mode: "internal"; href: string; children: React.ReactNode }
  | { mode: "external"; href: string; children: React.ReactNode }
  | { mode: "button"; onClick: () => void; children: React.ReactNode };
```

## Common mistakes

1. **Redefining HTML props manually** — misses `aria-*`, `data-*`, event handlers.
2. **Intersection for exclusivity** — `{ href?: string; onClick?: () => void }` allows both or neither.
3. **Optional `label` with required `id`** — fails WCAG; encode in types.
4. **Spreading unknown props without typing** — `{...rest}` on wrong element type.
5. **Over-complex conditional types early** — start with discriminated unions; add utility types only when needed.

## Files in this module

| File            | Purpose                                           |
| --------------- | ------------------------------------------------- |
| `Warmup.ts`     | `TypedButton`, `TypedInput` with native + a11y props |
| `Exercise.tsx`  | Demo wired to Warmup components                   |
| `Challenge.tsx` | `ModalAction` with mutually exclusive modes       |
| `type-tests.ts` | Negative tests for invalid prop combinations      |

## Exercise instructions

### 1. Warmup (`Warmup.ts`)

1. Extend `ButtonProps` from native `<button>` props; add optional `variant`; preserve `onClick` typing.
2. Implement `TypedButton` — spread native props onto `<button>`, apply variant class.
3. Model `InputProps` as a discriminated union — when `id` is provided, `label` is required.
4. Implement `TypedInput` — render `<label htmlFor={id}>` when label is present.

### 2. Exercise (`Exercise.tsx`)

1. Wire up `TypedButton` and `TypedInput` in the demo.
2. Verify variant styling and controlled input behavior work in the browser.

### 3. Challenge (`Challenge.tsx`)

1. Replace loose `ModalActionProps` with a discriminated union on `mode`:
   - `internal` — `href` for in-app route
   - `external` — `href` for external URL (consider `target`, `rel`)
   - `button` — `onClick` handler, no `href`
2. Implement `ModalAction` — render `<Link>`, `<a>`, or `<button>` based on mode.
3. Confirm invalid combinations fail `type-tests.ts`.

## Acceptance criteria

- [ ] `npm run typecheck` passes (including `@ts-expect-error` negative tests)
- [ ] `npm run lint` passes
- [ ] `TypedButton` accepts standard button attributes (`disabled`, `type`, `aria-*`)
- [ ] `TypedInput` requires `label` when `id` is set
- [ ] `ModalAction` rejects `href` + `onClick` on the same variant
- [ ] No `any`, `@ts-ignore`, or unsafe `as` assertions

## Production challenge

Design a `ConfirmDialog` API: primary/secondary actions, optional destructive variant, loading state on confirm — all without allowing `onConfirm` and `href` on the same action slot.

## Reflection questions

1. When would you use `ComponentPropsWithRef` instead of `ComponentPropsWithoutRef`?
2. Why are discriminated unions often clearer than a single props object with many optionals?
3. How do `@ts-expect-error` tests in `type-tests.ts` help document your component contract?
4. What accessibility rules should be encoded in types vs enforced at runtime?

## Documentation links

- [React — TypeScript](https://react.dev/learn/typescript)
- [React TypeScript Cheatsheet — Component Props](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#componentprops)
- [WAI-ARIA — Labels](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html)
