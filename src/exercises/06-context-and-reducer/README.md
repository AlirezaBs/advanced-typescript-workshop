# Module 06 — Context and Reducer

## Why this matters

Global state (cart, auth, permissions, theme) spreads across many components. **Typed context** and **discriminated reducer actions** prevent the classic bugs: `undefined` context crashes, wrong action payloads, and stringly-typed dispatch.

This module combines React patterns (`createContext`, `useReducer`) with TypeScript patterns (discriminated unions, branded permission keys) used in production apps.

## Problem it solves

| Problem | Typed solution |
| ------- | -------------- |
| `useContext` returns `undefined` | Custom hook throws outside provider; return type is never `undefined` |
| `{ type: string; payload?: any }` actions | Discriminated `CartAction` union with typed payloads per `type` |
| Permission strings typo'd at runtime | `Permission` derived from `as const` object |
| Reducer missing case | Exhaustive switch with `assertNever` |

## Concepts in this module

| Concept | Use in React |
| ------- | ------------ |
| `createContext<T \| null>` | Nullable only at creation; hook narrows to `T` |
| Custom context hooks | `useCart()` throws if missing provider |
| `useReducer` typing | `Reducer<State, Action>` with discriminated actions |
| Exhaustive reducers | Switch on `action.type`; default uses `assertNever` |
| `as const` permissions | Literal union for permission keys |
| Provider composition | Wrap app sections with typed value |

### Small conceptual examples

```ts
type CartAction =
  | { type: "ADD"; productId: string; qty: number; unitPrice: number; name: string }
  | { type: "REMOVE"; productId: string }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD":
      return { ...state, items: [...state.items, { ...action }] };
    case "REMOVE":
      return { ...state, items: state.items.filter(i => i.productId !== action.productId) };
    case "CLEAR":
      return { items: [] };
    default:
      return assertNever(action);
  }
}

// Typed hook — never undefined for consumers
function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
```

## Common mistakes

1. **Default context as `{} as CartContextValue`** — hides missing provider bugs.
2. **Single action type with optional payload** — `{ type: "ADD"; productId?: string }`.
3. **Dispatch typed as `(action: any) => void`** — loses payload checking at call site.
4. **Permissions as plain `string`** — `"users:red"` typos compile fine.
5. **Reducer mutating state** — TypeScript won't catch; still breaks React.

## Files in this module

| File            | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `Warmup.ts`     | `CartAction` union, `cartReducer`, `Permission` type |
| `Exercise.tsx`  | `CartProvider`, `useCart` with typed dispatch        |
| `Challenge.tsx` | `PermissionsProvider`, `usePermission`               |
| `type-tests.ts` | Invalid action and permission compile tests          |

## Exercise instructions

### 1. Warmup (`Warmup.ts`)

1. Review `CartAction` discriminated union — ensure each action carries only valid fields.
2. Implement `cartReducer` exhaustively — ADD merges/increments qty, REMOVE filters, CLEAR resets.

### 2. Exercise (`Exercise.tsx`)

1. Wire `useReducer(cartReducer, initialState)` inside `CartProvider`.
2. Provide `{ state, dispatch }` through `CartContext`.
3. Implement `useCart()` — `useContext` + throw when null.
4. Optional UI: add/remove buttons calling typed `dispatch({ type: "ADD", ... })`.

### 3. Challenge (`Challenge.tsx`)

1. Implement `PermissionsProvider` — hold a set or map of granted `Permission` values.
2. Implement `usePermission(permission: Permission): boolean`.
3. Ensure invalid permission strings like `"users:delete"` fail at compile time.

## Acceptance criteria

- [ ] `npm run typecheck` passes (including `@ts-expect-error` negative tests)
- [ ] `npm run lint` passes
- [ ] `useCart()` throws a clear error outside `CartProvider`
- [ ] `dispatch` accepts only valid `CartAction` shapes
- [ ] `cartReducer` handles all action types exhaustively
- [ ] `usePermission` only accepts keys from `PERMISSIONS`
- [ ] No `any`, `@ts-ignore`, or unsafe `as` assertions

## Production challenge

Extend the cart with a typed `SELECT_SHIPPING` action and derived `CartState` selectors (`subtotal`, `itemCount`) — all action payloads validated at dispatch call sites.

## Reflection questions

1. Why is `createContext<CartContextValue | null>(null)` better than a fake default object?
2. How does a discriminated union help compared to Redux-style `{ type, payload }`?
3. When would you split one context into multiple smaller contexts?
4. Why derive `Permission` from `PERMISSIONS as const` instead of a string union?

## Documentation links

- [React — Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React — Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
- [React — TypeScript](https://react.dev/learn/typescript)
