# Module 05 — Advanced Hooks

## Why this matters

Custom hooks are reusable stateful logic. TypeScript can infer **tuple shapes**, **generic return types**, and **callback signatures** — but only if you design hooks deliberately. Loose typing (`any`, mutable arrays) erases the benefits.

Production hooks (`useToggle`, debounced search, async data fetching) appear in every app. This module covers patterns that keep hooks type-safe under refactors.

## Problem it solves

| Hook pattern | Typing goal |
| ------------ | ----------- |
| `useToggle` | Readonly tuple `[boolean, toggle, setValue]` — stable destructuring |
| `useDebouncedValue<T>` | Output type matches input type |
| `usePrevious<T>` | Previous render value typed as `T \| undefined` |
| `useEventCallback` | Stable reference without losing parameter types |
| `useAsyncOperation` | Args, data, and error types flow from the operation function |

## Concepts in this module

| Concept | Use in React |
| ------- | ------------ |
| Tuple return types | `as const` + readonly tuples for hook APIs |
| Generic hooks | `<T>` for debounce, previous value, async data |
| Ref typing | `useRef<HTMLInputElement>(null)` |
| Stable callbacks | Ref + `useCallback` / `useEventCallback` pattern |
| Discriminated async state | `AsyncState<TData, TError>` from Module 03 |
| Stale closure avoidance | Refs for latest callback without dependency churn |

### Small conceptual examples

```ts
// Readonly tuple — callers destructure safely
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return [value, toggle, setValue] as const;
}

// Generic debounce preserves T
function useDebouncedValue<T>(value: T, delayMs: number): T {
  // ... useEffect debounce logic
  return debounced;
}

// Async hook infers args from operation
function useAsyncOperation<TData, TError, TArgs extends unknown[]>(
  operation: (...args: TArgs) => Promise<TData>
) {
  // run(...args) must match TArgs
}
```

## Common mistakes

1. **Returning plain arrays** — `[boolean, Function]` loses tuple inference.
2. **Untyped refs** — `useRef(null)` becomes overly permissive or requires casts.
3. **Updating refs during render** — triggers React 19 lint rules; use `useEffect` for `usePrevious`.
4. **Generic hooks with `any` errors** — loses discriminated error handling downstream.
5. **Missing cleanup in async hooks** — race conditions (not TypeScript, but common pairing).

## Files in this module

| File            | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `Warmup.ts`     | `useToggle`, `useDebouncedValue`, `usePrevious`, `useEventCallback` |
| `Exercise.tsx`  | Demo: toggle + debounced search                      |
| `Challenge.tsx` | `useAsyncOperation` with typed args and async state  |
| `type-tests.ts` | Compile-time tests for hook return shapes            |

## Exercise instructions

### 1. Warmup (`Warmup.ts`)

1. Implement `useToggle` — return readonly tuple `[value, toggle, setValue]`.
2. Implement `useDebouncedValue<T>` — debounce `value` by `delayMs`, return latest debounced value.
3. Implement `usePrevious<T>` — return previous render's value (use ref + effect pattern).
4. Implement `useEventCallback<T>` — stable function reference that always calls latest `fn`.

### 2. Exercise (`Exercise.tsx`)

1. Wire `useToggle` to the notifications button — label reflects on/off state.
2. Add a search input; pass its value through `useDebouncedValue` and display debounced result.

### 3. Challenge (`Challenge.tsx`)

1. Implement `useAsyncOperation<TData, TError, TArgs>`:
   - Accept an async `operation(...args: TArgs) => Promise<TData>`
   - Return `{ state: AsyncState<TData, TError>; run: (...args: TArgs) => Promise<void> }`
2. Handle loading, success, error transitions on `run`.
3. Optional: ignore stale responses when `run` is called again before prior completes.

## Acceptance criteria

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `useToggle` return type is a readonly tuple with three elements
- [ ] `useDebouncedValue<string>` returns `string`
- [ ] `useAsyncOperation` infers `TArgs` from the operation function
- [ ] `run("u_1")` type-checks; wrong arg types fail at compile time
- [ ] No `any`, `@ts-ignore`, or unsafe `as` assertions

## Production challenge

Build `useQuery<TData, TError>(fetcher)` with discriminated state, abort on unmount, and typed error mapping — the foundation of a mini React Query.

## Reflection questions

1. Why return `as const` tuples instead of `{ value, toggle }` objects?
2. When is explicit `TError` needed vs inferring from thrown errors?
3. What problem does `useEventCallback` solve that `useCallback` alone does not?
4. How does `TArgs extends unknown[]` enable typed `run(...args)`?

## Documentation links

- [React — Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React — TypeScript](https://react.dev/learn/typescript)
- [React TypeScript Cheatsheet — Hooks](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks)
