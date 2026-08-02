# TypeScript in React — Cheatsheet

Your personal, growing reference. Add one section **after you complete each module**.

**Rules for this file:**

- Key syntax and decision guidelines only
- One short React example per module
- One common mistake per module
- **No full exercise solutions** — those belong on the `solutions` branch

---

## Module 00 — Type System Foundations

### Key syntax

```ts
// Derive a union from a const object
const STATUS = { pending: "pending", paid: "paid" } as const;
type Status = (typeof STATUS)[keyof typeof STATUS];

// Exhaustive switch
function handle(status: Status): string {
  switch (status) {
    case "pending":
      return "Waiting…";
    case "paid":
      return "Done";
    default:
      return assertNever(status);
  }
}
```

### React example

Render payment badges by narrowing on `payment.status` — each branch knows the exact literal type.

### Common mistake

Using `(await response.json()) as User` — a compile-time lie; runtime data is still `unknown`.

### Decision guideline

Use `unknown` + narrowing for external data. Use discriminated unions when variants carry different fields. Derive literal unions from `as const` config.

---

## Module 01 — Generics

_Add after completing Module 01._

---

## Module 02 — Utility and Mapped Types

_Add after completing Module 02._

---

## Module 03 — Discriminated Unions

_Add after completing Module 03._

---

## Module 04 — Component API Design

_Add after completing Module 04._

---

## Module 05 — Advanced Hooks

_Add after completing Module 05._

---

## Module 06 — Context and Reducer

_Add after completing Module 06._

---

## Module 07 — Polymorphic Components

_Add after completing Module 07._

---

## Module 08 — Runtime Validation

_Add after completing Module 08._

---

## Module 09 — Type-Safe API Layer

_Add after completing Module 09._

---

## Module 10 — Real Project Refactor

_Add after completing Module 10._
