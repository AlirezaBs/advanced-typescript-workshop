# Module 01 — Generics

## Why this matters

Without generics, every reusable piece of UI becomes either duplicated (`UserList`, `TransactionList`, `ProductList`) or untyped (`items: any[]`). Generics let you write **one** `List<T>` or `DataTable<T>` that preserves item shape through props, callbacks, and return values.

In React, generics appear in components, hooks, context, and utility functions. Mastering them is the bridge from "TypeScript on one file" to "typed design systems and data layers."

## Problem it solves

| Without generics | With generics |
| ---------------- | ------------- |
| `function first(items: any[])` | `function first<T>(items: T[]): T \| undefined` |
| Copy-paste list components per entity | Single `List<T>` infers `T` from `items` |
| Column keys as loose `string` | `key: keyof T` catches typos at compile time |
| `localStorage.getItem` + manual casts | `useLocalStorage<Theme>` read/write with one type |

## Concepts in this module

| Concept | Use in React |
| ------- | ------------ |
| Generic functions | Reusable utilities (`identity`, `first`, `getProperty`) |
| Type parameters | `<T>` on components and hooks |
| Constraints | `K extends keyof T` for safe property access |
| Inference | Let TypeScript infer `T` from props — avoid redundant `<User>` at call site |
| Generic components | `List<T>`, `DataTable<T>` |
| Generic hooks | `useLocalStorage<T>`, tuple-return hooks |

### Small conceptual examples

```ts
// Constraint: K must be a key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: "u_1", name: "Ada" };
getProperty(user, "name"); // string
getProperty(user, "email"); // compile error — not a key of user

// Inference at the call site
function List<T>(props: { items: T[]; renderItem: (item: T) => React.ReactNode }) {
  return props.items.map(props.renderItem);
}

// T inferred as User — no explicit type argument needed
<List items={users} renderItem={(user) => user.name} />;
```

## Common mistakes

1. **Over-specifying generics** — `List<User>` when inference from `items` is enough.
2. **Using `any[]` instead of `T[]`** — loses type flow into `renderItem`.
3. **Forgetting constraints** — `key: string` on columns instead of `keyof T`.
4. **Defaulting to `unknown`** when a type parameter is appropriate.
5. **Generic hooks without stable types** — returning `any` from `useLocalStorage` defeats the purpose.

## Files in this module

| File            | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `Warmup.ts`     | Pure TS: `identity`, `first`, `getProperty`          |
| `Exercise.tsx`  | React: generic `List<T>` component                   |
| `Challenge.tsx` | `DataTable<T>` with column keys + `useLocalStorage<T>` |
| `type-tests.ts` | Compile-time tests for column key constraints        |

## Exercise instructions

### 1. Warmup (`Warmup.ts`)

1. Implement `identity<T>` — return the input value with full type preservation.
2. Implement `first<T>` — return the first element or `undefined` for empty arrays.
3. Implement `getProperty<T, K extends keyof T>` — return `obj[key]` with correct return type `T[K]`.

### 2. Exercise (`Exercise.tsx`)

1. Review `ListProps<T>` — ensure it includes `items`, `renderItem`, and optional `emptyMessage`.
2. Implement `List<T>` — map over `items`, call `renderItem`, show `emptyMessage` when empty.
3. Verify TypeScript infers `User` from `sampleUsers` without an explicit generic argument.

### 3. Challenge (`Challenge.tsx`)

1. Change `Column<T>.key` from `string` to `keyof T`.
2. Implement `DataTable<T>` — render headers and cells; optional sort UI for `sortableKeys`.
3. Implement `useLocalStorage<T>` — read initial value from `localStorage`, persist on update, handle SSR-safe fallback to `initial`.

## Acceptance criteria

- [ ] `npm run typecheck` passes (including `@ts-expect-error` negative tests)
- [ ] `npm run lint` passes
- [ ] `List<T>` infers item type from the `items` prop
- [ ] `DataTable` column keys are constrained to `keyof T`
- [ ] `useLocalStorage<Theme>` toggles theme without `any` or unsafe casts
- [ ] No `any`, `@ts-ignore`, or unsafe `as` assertions

## Production challenge

Build a reusable admin table hook pair: `useDataTable<T>(rows, columns)` where sort state is typed to `keyof T`, and column definitions reject invalid keys at compile time.

## Reflection questions

1. When must you add an explicit generic argument at the call site (e.g. `useLocalStorage<Theme>`)?
2. What breaks if `List` used `items: unknown[]` instead of `T[]`?
3. Why is `K extends keyof T` better than `key: string` for column definitions?
4. How does generic inference interact with React's `children` prop?

## Documentation links

- [TypeScript Handbook — Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript Handbook — Generics: Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
- [React — TypeScript](https://react.dev/learn/typescript)
- [React TypeScript Cheatsheet — Generics](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#generic-components)
