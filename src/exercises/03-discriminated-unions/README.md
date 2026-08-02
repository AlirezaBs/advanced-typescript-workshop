# Module 03 — Discriminated Unions

## Why this matters

Async UI, payment flows, and error handling are **state machines**. A request is idle, loading, succeeded, or failed — never all at once. A payment might be awaiting checkout, confirming, paid, or expired — each state has different valid fields.

Discriminated unions (tagged unions) model these states so TypeScript **narrows** fields after you check the discriminator (`status`, `kind`, `type`). This module builds directly on Module 00 foundations.

## Problem it solves

**Bad pattern** — optional everything:

```ts
type RequestState<T> = {
  status: string;
  data?: T;
  error?: AppError;
};
// Allows: { status: "success", error: {...} } — impossible in reality
```

**Good pattern** — each variant carries only valid fields:

```ts
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: AppError };
```

After `if (state.status === "success")`, TypeScript knows `state.data` exists and `state.error` does not.

## Concepts in this module

| Concept | Use in React |
| ------- | ------------ |
| Discriminant field | `status`, `kind`, or `type` property shared across variants |
| Narrowing | Switch/if on discriminant unlocks variant-specific fields |
| `RequestState<T>` | Generic async data fetching pattern |
| `AsyncBoundary` | Render loading/success/error from one typed prop |
| Exhaustive switches | Catch missing variants when union grows |
| Payment lifecycle | Model multi-step flows with state-specific metadata |

### Small conceptual examples

```tsx
function AsyncBoundary<T>({ state, renderSuccess }: Props<T>) {
  switch (state.status) {
    case "idle":
      return null;
    case "loading":
      return <Spinner />;
    case "success":
      return renderSuccess(state.data); // data is T
    case "error":
      return <ErrorCard error={state.error} />;
  }
}

// Payment: paid state has transactionId; created state does not
type PaymentProcess =
  | { status: "created"; paymentId: string }
  | { status: "paid"; paymentId: string; transactionId: string; paidAt: string };
```

## Common mistakes

1. **Optional fields instead of variants** — `{ data?: T; error?: E }` allows impossible combinations.
2. **Stringly-typed status** — `status: string` prevents narrowing; use literal unions.
3. **Accessing fields before narrowing** — `state.data` without checking `status === "success"`.
4. **Non-exhaustive switch** — new variant added but UI falls through silently.
5. **Same discriminant value on different shapes** — breaks narrowing consistency.

## Files in this module

| File            | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `Warmup.ts`     | Expand `AppError`, model `RequestState<T>`           |
| `Exercise.tsx`  | `AsyncBoundary<T>` with exhaustive status switch     |
| `Challenge.tsx` | Payment lifecycle union + `getPaymentProcessLabel`   |
| `type-tests.ts` | Compile-time tests for invalid field access          |

## Exercise instructions

### 1. Warmup (`Warmup.ts`)

1. Expand `AppError` into a discriminated union — each `kind` from `AppErrorKind` carries only valid fields (e.g. validation errors include `fieldErrors`, network errors include `retryable`).
2. Replace the loose `RequestState<T>` with a proper discriminated union — `idle`, `loading`, `success` (with `data`), `error` (with `error`).

### 2. Exercise (`Exercise.tsx`)

1. Implement `AsyncBoundary<T>` — switch on `state.status` exhaustively.
2. Use `renderSuccess`, optional `renderLoading`, and optional `renderError` callbacks.
3. Ensure TypeScript narrows `data` and `error` inside the correct branches.

### 3. Challenge (`Challenge.tsx`)

1. Replace the loose `PaymentProcess` stub with a discriminated union covering: `created`, `awaitingPayment` (with `checkoutUrl`), `confirming`, `paid` (with `transactionId`, `paidAt`), `failed` (with `reason`), `expired` (with `expiredAt`).
2. Implement `getPaymentProcessLabel` with an exhaustive switch — each status gets a distinct admin-facing label.
3. Update `samples` to use valid variant shapes.

## Acceptance criteria

- [ ] `npm run typecheck` passes (including `@ts-expect-error` negative tests)
- [ ] `npm run lint` passes
- [ ] `RequestState<T>` prevents impossible combinations (data + error together)
- [ ] `AsyncBoundary` handles all four request states
- [ ] `PaymentProcess` variants expose only valid fields per status
- [ ] All switches are exhaustive (use `assertNever` from `src/lib/exhaustive.ts` where appropriate)
- [ ] No `any`, `@ts-ignore`, or unsafe `as` assertions

## Production challenge

Model a full checkout flow UI: cart → payment method → processing → receipt/error. Each step is a discriminated union member; the router component renders step-specific forms without optional-field guessing.

## Reflection questions

1. What impossible state does `{ data?: T; error?: E; status: string }` allow?
2. Why is a generic `RequestState<T>` better than separate types per entity?
3. When would you use `kind` vs `status` vs `type` as the discriminant?
4. How do discriminated unions help API error rendering compared to a flat `{ message: string }`?

## Documentation links

- [TypeScript Handbook — Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
- [TypeScript Handbook — Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [React — Conditional Rendering](https://react.dev/learn/conditional-rendering)
