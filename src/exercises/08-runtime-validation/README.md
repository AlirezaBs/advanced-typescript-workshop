# Module 08 — Runtime Validation

## Why this matters

TypeScript types **disappear at runtime**. JSON from `fetch`, query params, and `localStorage` are `unknown` until validated. Casting with `as User[]` tells the compiler to trust you — it does not validate.

**Zod** (and similar libraries) bridge compile-time and runtime: define a schema once, infer types with `z.infer`, parse at boundaries, and fail safely when data is wrong.

## Problem it solves

| Boundary | Without validation | With Zod |
| -------- | ------------------ | -------- |
| Login form | `{ email: any }` | `loginSchema.safeParse(input)` |
| API response | `res.json() as Transaction[]` | `transactionSchema.array().safeParse(data)` |
| Error handling | Runtime crash on missing field | Structured `{ success: false, error }` |
| Type sync | TS interface drift from API | `type T = z.infer<typeof schema>` |

This module teaches the **parse, don't cast** rule for all external data.

## Concepts in this module

| Concept | Use in React |
| ------- | ------------ |
| Zod schemas | `z.object`, `z.string().email()`, refinements |
| `z.infer<typeof schema>` | Single source of truth for TS type |
| `safeParse` vs `parse` | Non-throwing vs throwing validation |
| `unknown` input | All external JSON starts as `unknown` |
| Result types | `{ success: true, data } \| { success: false, error }` |
| Form integration | Map Zod issues to field errors |

### Small conceptual examples

```ts
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "At least 8 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

function parseLogin(input: unknown) {
  const result = loginSchema.safeParse(input);
  if (!result.success) {
    return { success: false as const, error: result.error };
  }
  return { success: true as const, data: result.data };
}

// Never: const data = await res.json() as Transaction[];
// Always: parse with schema first
```

## Common mistakes

1. **`as` after fetch** — `#1 source of fake type safety.
2. **Duplicating Zod schema and TS interface** — use `z.infer` instead.
3. **Using `parse` in UI** — uncaught throws crash React; prefer `safeParse`.
4. **Validating too late** — validate at the boundary, trust inside the app.
5. **Loose schemas** — `z.any()` or `z.string()` for enums that should be `z.enum([...])`.

## Files in this module

| File            | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `Warmup.ts`     | `loginSchema`, `transactionSchema`, `parseTransactionList` |
| `Exercise.tsx`  | Demo login validation with `safeParse`               |
| `Challenge.tsx` | Fetch mock JSON, parse before render                 |
| `type-tests.ts` | Inferred types match schema shapes                   |

## Exercise instructions

### 1. Warmup (`Warmup.ts`)

1. Complete `loginSchema` — email (valid format) and password (min length).
2. Replace manual `LoginForm` type with `z.infer<typeof loginSchema>`.
3. Complete `transactionSchema` — `id`, `amount`, `currency`, `status` (use `z.enum` for status).
4. Replace manual `Transaction` type with `z.infer<typeof transactionSchema>`.
5. Implement `parseTransactionList(input: unknown)` — return success with typed array or failure with error message.

### 2. Exercise (`Exercise.tsx`)

1. Run the demo — invalid login `{ email: "bad", password: "short" }` should show validation failure.
2. Fix schema rules until messages are user-friendly.

### 3. Challenge (`Challenge.tsx`)

1. Implement async fetch flow: call `fetchTransactionsUnsafe()`, parse with `transactionSchema.array()`.
2. Render transaction list only after successful parse.
3. Show error UI on parse failure — never render unvalidated data.

## Acceptance criteria

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `LoginForm` and `Transaction` are inferred from Zod schemas (not hand-written duplicates)
- [ ] Invalid login input fails `safeParse` with clear messages
- [ ] `parseTransactionList` never uses `as` casts on unknown input
- [ ] Challenge renders only schema-valid transactions
- [ ] No `any`, `@ts-ignore`, or unsafe `as` assertions on external data

## Production challenge

Add a Zod schema for paginated API responses `{ items: Transaction[]; nextCursor: string | null }` and a hook `useValidatedQuery(schema, fetcher)` that returns discriminated loading/success/error state.

## Reflection questions

1. Why does TypeScript not protect you from malformed JSON?
2. When is `z.infer` preferable to maintaining a separate interface?
3. Where should validation live — client, server, or both?
4. How do you map Zod `ZodError` issues to form field errors?

## Documentation links

- [Zod Documentation](https://zod.dev/)
- [Zod — inferring types](https://zod.dev/?id=type-inference)
- [TypeScript Handbook — Narrowing from unknown](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown)
