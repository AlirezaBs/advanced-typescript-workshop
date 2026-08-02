# Module 01 — Generics

## Why this matters

Generics let one component or function work with many types while keeping compile-time safety. Without them, you duplicate `UserList`, `TransactionList`, etc., or fall back to `any[]`.

## Concepts

Generic functions, constraints (`K extends keyof T`), inference, generic React components and hooks.

## Files

| File            | Purpose                              |
| --------------- | ------------------------------------ |
| `Warmup.ts`     | `identity`, `first`, `getProperty`   |
| `Exercise.tsx`  | Generic `List<T>`                    |
| `Challenge.tsx` | `DataTable<T>`, `useLocalStorage<T>` |
| `type-tests.ts` | Column key constraint tests          |

## Acceptance criteria

- [ ] `List<T>` infers item type from props
- [ ] `DataTable<T>` columns use `keyof T`
- [ ] `useLocalStorage<Theme>` persists theme without `any`
- [ ] `npm run typecheck` passes

## Reflection questions

1. When must you add an explicit generic argument at the call site?
2. What breaks if `List` used `items: unknown[]`?

## Links

- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
