# Module 00 — Type System Foundations

## Why this matters

TypeScript's value is not syntax highlighting — it is **reasoning about data shape** at compile time. Foundations like `unknown`, narrowing, literal types, and discriminated unions appear in every production React codebase: API responses, payment states, form errors, and permission checks.

If you skip these basics, later patterns (generics, polymorphic components, typed API layers) become cargo-cult copying instead of deliberate design.

## Problem it solves

Frontend code constantly receives **untrusted or partially known data**:

- JSON from a payment API (`unknown` until validated)
- UI state that can be one of several shapes (pending / paid / failed)
- Errors that look similar but need different user messages

Without narrowing and union modeling, teams fall back to `any`, optional chaining everywhere, or unsafe casts — all of which hide bugs until runtime.

## Concepts in this module

| Concept                     | Use in React                                       |
| --------------------------- | -------------------------------------------------- |
| `unknown` vs `any`          | Safe handling of fetch/JSON data before validation |
| Union + narrowing           | Render different UI per payment or request state   |
| `as const`                  | Derive literal unions from config objects          |
| `satisfies`                 | Validate object shape while keeping literal types  |
| `keyof` / indexed access    | Derive types from constants                        |
| `never` + exhaustive checks | Catch missing switch branches at compile time      |
| Discriminated unions        | Model API errors with distinct fields per kind     |

### Small conceptual examples

```ts
// as const preserves literal types
const STATUS = { pending: "pending", paid: "paid" } as const;
type Status = (typeof STATUS)[keyof typeof STATUS]; // "pending" | "paid"

// Narrow unknown safely
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof (value as Record<string, unknown>).id === "string"
    // ... more checks
  );
}
```

## Common mistakes

1. **Using** `any` **for API data** — disables all checking downstream.
2. **Casting with** `as User` — tells the compiler to trust you; does not validate.
3. **Optional everything** — `{ error?: string; data?: T }` allows impossible states (both set).
4. **String unions written by hand** — drift from runtime constants; prefer deriving from `as const`.
5. **Missing** `default` **in switch** — new union members compile but fall through silently.

## Files in this module

| File            | Purpose                                                       |
| --------------- | ------------------------------------------------------------- |
| `Warmup.ts`     | Pure TypeScript: parse `unknown`, narrow unions, derive types |
| `Exercise.tsx`  | React: exhaustive payment status renderer                     |
| `Challenge.tsx` | Production: discriminated `AppError` union + UI               |
| `type-tests.ts` | Positive and negative compile-time tests                      |

## Exercise instructions

### 1. Warmup (`Warmup.ts`)

1. Derive `PaymentChannel` from `PAYMENT_CHANNELS` using `typeof` and `keyof`.
2. Implement `parseUnknownUser` — return `User | null`, no `any`, no unsafe casts.
3. Implement `getChannelLabel` with exhaustive narrowing; use `assertNever` from `src/lib/exhaustive.ts`.

### 2. Exercise (`Exercise.tsx`)

1. Derive `PaymentStatus` from `PAYMENT_STATUS`.
2. Implement `getPaymentStatusDisplay` with an exhaustive switch and distinct badge classes per status.

### 3. Challenge (`Challenge.tsx`)

1. Expand `AppError` into a proper discriminated union — each `kind` should carry only valid fields (e.g. validation errors might include `fieldErrors: Record<string, string>`).
2. Implement `renderAppError` exhaustively with distinct titles per kind.

## Acceptance criteria

- [ ] `npm run typecheck` passes (including `@ts-expect-error` negative tests)
- [ ] `npm run lint` passes
- [ ] `parseUnknownUser` rejects invalid shapes without throwing
- [ ] Payment status badges show distinct labels and styles for all four statuses
- [ ] `AppError` variants cannot represent impossible combinations
- [ ] All switches use exhaustive handling with `assertNever`
- [ ] No `any`, `@ts-ignore`, or unsafe `as` assertions

## Production challenge

Model payment-gateway errors as a discriminated union and render admin-dashboard messages. Each error kind should expose only the metadata support staff need (field errors vs permission vs retry).

## Reflection questions

1. When is `unknown` preferable to a generic `<T>`?
2. What impossible state does a discriminated union prevent that `{ status: string; data?: T; error?: string }` allows?
3. Why derive `PaymentStatus` from `PAYMENT_STATUS` instead of writing `"pending" | "paid" | ...` manually?
4. When would you **not** use exhaustive switching?

## Documentation links

- [TypeScript Handbook — Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript Handbook — Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
- [TypeScript Handbook — Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
- [React — TypeScript](https://react.dev/learn/typescript)
