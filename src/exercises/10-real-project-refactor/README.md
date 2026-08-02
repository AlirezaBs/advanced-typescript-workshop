# Module 10 — Real Project Refactor

## Why this matters

Workshop exercises use small, focused files. **Your production codebase** is where TypeScript wins or loses: legacy `any`, duplicated DTOs, untyped context, and cast-heavy fetch calls accumulate over years.

This capstone module applies Modules 00–09 to **your** code — incrementally, without a risky big-bang rewrite.

## Problem it solves

Real projects often have:

- Components with `props: any` or overly wide interfaces
- API layers that cast JSON without validation
- Global state with string actions and optional payloads
- Permission checks as magic strings
- Missing exhaustive handling for status unions

Module 10 turns those weaknesses into a prioritized refactor checklist and ships improvements one PR at a time.

## Concepts applied (full course recap)

| Module | Apply to your code |
| ------ | ------------------ |
| 00 Foundations | Replace `any` with `unknown` + narrowing; discriminated errors |
| 01 Generics | Reusable list/table/hook components |
| 02 Utility types | Derive form/DTO types from domain models |
| 03 Discriminated unions | Async state, payment flows, error rendering |
| 04 Component API | Native prop extension, mutually exclusive props |
| 05 Advanced hooks | Typed custom hooks, async operations |
| 06 Context + reducer | Typed context, action unions, permissions |
| 07 Polymorphic | Design system `as` prop (if applicable) |
| 08 Runtime validation | Zod at API/form boundaries |
| 09 API layer | Endpoint registry + honest fetch typing |

## How this module works

There is **no Warmup, Challenge, or type-tests** file. You bring the code; the mentor guides the refactor.

### Step 1 — Choose a target

Pick one file or small feature area (recommended size: 50–200 lines):

- A component with weak props typing
- A hook that fetches and casts API data
- A context/reducer with loose actions
- An API module with duplicated interfaces

Paste the code in chat or point to a path in your repo.

### Step 2 — Assessment checklist

The mentor will identify:

1. **`any` and unsafe assertions** — count and locate
2. **Missing narrowing** — `unknown` data used without guards
3. **Impossible states** — optional fields that should be discriminated unions
4. **Duplicated types** — parallel interfaces that should derive from one model
5. **Untyped boundaries** — fetch, forms, URL params without validation
6. **Missing exhaustiveness** — switches without `assertNever`

### Step 3 — Incremental refactor plan

Changes are ordered by **impact vs risk**:

1. Quick wins — replace `any`, add `z.infer`, derive types with `Pick`/`Omit`
2. Structural — discriminated unions for state/errors
3. Architectural — typed context, API registry (only if scope allows)

Each step should be a small, reviewable diff — not a full rewrite.

### Step 4 — Verify

After each change:

```bash
npm run typecheck
npm run lint
npm run build
```

Run your app's manual test path for the affected feature.

## Files in this module

| File           | Purpose                                      |
| -------------- | -------------------------------------------- |
| `Exercise.tsx` | Placeholder UI — instructions for capstone   |
| `README.md`    | This guide                                   |

## What to prepare before starting

1. **One concrete file** — not your entire app.
2. **Known pain point** — e.g. "this hook crashes when API shape changes."
3. **Constraints** — breaking changes OK? Must keep runtime behavior identical?
4. **Test path** — how you manually verify the feature works.

## Example refactor targets

### Good targets

```tsx
// Before: fake safety
const users = (await res.json()) as User[];

// After: Module 08 + 09
const raw: unknown = await res.json();
const parsed = userListSchema.safeParse(raw);
```

```tsx
// Before: impossible states
type State = { loading?: boolean; data?: T; error?: string };

// After: Module 03
type State<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: AppError };
```

### Avoid for first pass

- Entire app migration to strict mode
- Replacing state management library
- Introducing codegen across all endpoints at once

## Acceptance criteria

- [ ] Target file has zero `any` (or documented exceptions with plan to remove)
- [ ] External data validated or narrowed — no bare `as` on JSON
- [ ] State/errors modeled as discriminated unions where applicable
- [ ] `npm run typecheck` and `npm run lint` pass in the workshop repo (for exercises) or your project
- [ ] Behavior unchanged unless explicitly improving error handling UX
- [ ] Refactor split into reviewable steps with clear commit messages

## Reflection questions

1. Which module's pattern gave the highest ROI on your real code?
2. What `any` was hardest to remove — and why?
3. Where did runtime validation (Zod) catch something TypeScript missed?
4. What would you tackle in a second refactor pass?

## Documentation links

- [TypeScript Handbook — Migrating from JavaScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Convex / general backend typing](https://docs.convex.dev/using/types) — if your project uses Convex

## Ready?

Open `Exercise.tsx` for a reminder, then share your target file with the mentor:

> "Here's my component/hook from production — help me refactor it using the workshop patterns."

We'll build your checklist together and implement changes step by step.
