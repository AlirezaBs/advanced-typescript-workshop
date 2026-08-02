# Module 07 — Polymorphic Components

## Why this matters

Design systems need one component that renders as different HTML elements: a `Box` as `div`, `button`, or `a`; a `Text` as `p`, `span`, or `h1`. The **`as` prop** pattern avoids duplicating styled wrappers while preserving correct intrinsic props (`href` on anchors, `type` on buttons).

Polymorphic typing is one of the hardest React + TypeScript patterns — and one of the most common in component libraries (Chakra, Radix, MUI).

## Problem it solves

| Need | Polymorphic solution |
| ---- | -------------------- |
| Same styles, different semantics | `<Box as="button">` vs `<Box as="a">` |
| Correct HTML attributes per element | `href` only when `as="a"` |
| Ref forwarding to the right element | `ComponentPropsWithRef<C>` |
| Default element | `C extends ElementType = "div"` |

Without polymorphic types, teams use overloads, casts, or separate `BoxButton` / `BoxLink` components.

## Concepts in this module

| Concept | Use in React |
| ------- | ------------ |
| `ElementType` | Union of intrinsic tags and component types |
| `as` prop | `as?: C` where `C extends ElementType` |
| `ComponentPropsWithoutRef<C>` | Merge intrinsic props for chosen element |
| Default type parameter | `C = "div"` when `as` omitted |
| Prop merging | Spread own props + intrinsic props onto rendered element |
| Limitations | Complex refs, incompatible prop intersections |

### Small conceptual examples

```tsx
import type { ElementType, ComponentPropsWithoutRef } from "react";

type BoxProps<C extends ElementType = "div"> = {
  as?: C;
  children?: React.ReactNode;
} & ComponentPropsWithoutRef<C>;

function Box<C extends ElementType = "div">({ as, children, ...rest }: BoxProps<C>) {
  const Component = as ?? "div";
  return <Component {...rest}>{children}</Component>;
}

// href valid — as="a"
<Box as="a" href="/docs">API docs</Box>;

// href invalid — as="button" (compile error)
<Box as="button" href="/docs">Pay</Box>;
```

## Common mistakes

1. **Loose `as?: string`** — no prop checking for the chosen element.
2. **Intersection hell** — `Props & ComponentProps<"div"> & ComponentProps<"button">` allows everything.
3. **Forgetting to omit conflicting props** — custom `onClick` vs native conflicts.
4. **Ref typing ignored** — consumers can't attach refs to the rendered element.
5. **Over-engineering** — use polymorphic only when `as` is a real product requirement.

## Files in this module

| File            | Purpose                                    |
| --------------- | ------------------------------------------ |
| `Warmup.ts`     | Simplified polymorphic `Box`               |
| `Exercise.tsx`  | Demo: button, anchor, div variants         |
| `Challenge.tsx` | Full `Text` component with `as` prop       |
| `type-tests.ts` | Invalid prop combinations per element      |

## Exercise instructions

### 1. Warmup (`Warmup.ts`)

1. Expand `BoxProps<C>` to merge intrinsic props via `ComponentPropsWithoutRef<C>`.
2. Implement `Box` — resolve `Component = as ?? "div"`, spread remaining props.
3. Verify `href` works on `as="a"` and fails on `as="button"`.

### 2. Exercise (`Exercise.tsx`)

1. Run the demo — three `Box` variants should render correct elements.
2. Fix any TypeScript errors on invalid attribute combinations.

### 3. Challenge (`Challenge.tsx`)

1. Implement polymorphic `Text<C extends ElementType = "span">` with merged props.
2. Support `as="p"`, `as="span"`, and heading tags if desired.
3. Document known limitations in this README (see below).

## Known limitations (document after implementing)

After you implement `Text`, note tradeoffs you encountered:

- Ref forwarding complexity with generic `C`
- Props valid on one element but not another
- Performance of deeply nested conditional types in IDE tooltips
- When a simpler union (`as: "p" | "span"`) is enough

Add your notes here as you complete the challenge:

```
<!-- Your limitations notes -->
```

## Acceptance criteria

- [ ] `npm run typecheck` passes (including `@ts-expect-error` negative tests)
- [ ] `npm run lint` passes
- [ ] `Box as="a"` accepts `href`; `Box as="button"` rejects `href`
- [ ] `Box as="button"` accepts `type="submit"`
- [ ] `Text` renders the correct semantic element per `as`
- [ ] No `any`, `@ts-ignore`, or unsafe `as` assertions

## Production challenge

Build a polymorphic `Link` that renders React Router's `Link` when `as="internal"` and `<a>` when `as="external"` — with mutually exclusive prop sets (Module 04 + 07 combined).

## Reflection questions

1. Why use `ComponentPropsWithoutRef` vs `ComponentPropsWithRef`?
2. When is a fixed union of elements simpler than full polymorphism?
3. What props should your component `Omit` from intrinsic props?
4. How do design systems test polymorphic components?

## Documentation links

- [React — TypeScript](https://react.dev/learn/typescript)
- [React TypeScript Cheatsheet — Polymorphic Components](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#polymorphic-components)
- [Radix UI — Polymorphism](https://www.radix-ui.com/primitives/docs/guides/composition)
