# Module 02 — Utility and Mapped Types

## Why this matters

Real domain models (`User`, `Order`, `Payment`) are **large**. You rarely need every field in every context — forms need editable fields, API responses need immutability, PATCH payloads need partial updates, and permission maps need keyed lookups.

Utility types (`Pick`, `Omit`, `Partial`, `Record`, `Readonly`) and mapped types let you **derive** specialized shapes from one source of truth instead of duplicating interfaces that drift apart.

## Problem it solves

| Scenario | Derived type |
| -------- | ------------ |
| Admin edit form | `StrictOmit<User, "id" \| "createdAt">` |
| Profile preview card | `Pick<User, "name" \| "avatar" \| "role">` |
| PATCH `/users/:id` | `Partial<UserFormData>` |
| Immutable API response | `Readonly<User>` |
| Role → permissions map | `Record<User["role"], Permission[]>` |

Without derivation, teams maintain parallel types and miss fields when the model changes.

## Concepts in this module

| Concept | Use in React |
| ------- | ------------ |
| `Pick` / `Omit` | Slice domain models for UI surfaces |
| `Partial` | Form drafts, PATCH payloads |
| `Readonly` | Props that must not mutate server data |
| `Record<K, V>` | Maps from union keys to values |
| `keyof` | Constrain form field names |
| Mapped types | Transform properties (see `Prettify`, `StrictOmit` in `src/lib/types.ts`) |
| `Prettify<T>` | Expand intersections for readable tooltips |
| `StrictOmit<T, K>` | Omit keys that must exist on `T` (safer than built-in `Omit` for strict models) |

### Small conceptual examples

```ts
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "support" | "finance";
}

// Form: editable fields only
type UserFormData = StrictOmit<User, "id">;

// PATCH: any subset of editable fields
type UserPatch = Partial<UserFormData>;

// Permissions keyed by role
type RolePermissions = Record<User["role"], string[]>;

// Form config constrained to real keys
type FormConfig<T> = {
  fields: Array<{ name: keyof T; label: string }>;
  requiredKeys: Array<keyof T>;
};
```

## Common mistakes

1. **Duplicating interfaces** — `UserForm`, `UserDTO`, `UserEntity` with overlapping fields.
2. **Using `Omit` with non-existent keys** — typos silently succeed; prefer `StrictOmit`.
3. **`Partial` on everything** — PATCH payloads yes; create forms often need required fields.
4. **`Record<string, T>`** when keys should be a union — loses exhaustiveness.
5. **Forgetting `Readonly`** on data fetched from the server that flows through context.

## Files in this module

| File            | Purpose                                           |
| --------------- | ------------------------------------------------- |
| `Warmup.ts`     | Derive `UserFormData`, `UserPreview`, `UserPatch`, `RolePermissions` |
| `Exercise.tsx`  | Typed `FormConfig<T>` and `AdminUserForm`         |
| `Challenge.tsx` | Render role-to-permissions map from `User` model  |
| `type-tests.ts` | Negative tests for invalid field keys             |

## Exercise instructions

### 1. Warmup (`Warmup.ts`)

1. Define `UserFormData` using `StrictOmit` — exclude server-managed fields (`id`, `createdAt`, `updatedAt`).
2. Define `UserPreview` using `Pick` — name, avatar, role for card UI.
3. Define `UserPatch` as `Partial<UserFormData>` for PATCH requests.
4. Define `UserResponse` as `Readonly<User>` for API responses.
5. Define `RolePermissions` as `Record<User["role"], string[]>` mapping each role to permission strings.

### 2. Exercise (`Exercise.tsx`)

1. Ensure `FormConfig<T>` constrains `fields[].name` and `requiredKeys` to `keyof T`.
2. Implement `AdminUserForm` — render fields from config, validate required keys, use typed `initialValues`.

### 3. Challenge (`Challenge.tsx`)

1. Populate `RolePermissions` with realistic permission strings per role.
2. Render each role and its permissions in the UI.
3. Ensure adding a new role to `User` forces updating the permissions map (compile error if missing).

## Acceptance criteria

- [ ] `npm run typecheck` passes (including `@ts-expect-error` negative tests)
- [ ] `npm run lint` passes
- [ ] All derived types trace back to `User` — no duplicated field lists
- [ ] `FormConfig` rejects invalid field names at compile time
- [ ] `RolePermissions` keys cover every `User["role"]` variant
- [ ] No `any`, `@ts-ignore`, or unsafe `as` assertions

## Production challenge

Design a typed admin CRUD layer: `CreateUserInput`, `UpdateUserInput`, `UserListItem`, and `UserDetail` all derived from a single `User` schema. When product adds a field, one schema update propagates everywhere.

## Reflection questions

1. When is `Pick` preferable to `Omit`?
2. Why might `StrictOmit` catch bugs that built-in `Omit` misses?
3. How does `Record<Role, Permission[]>` enforce exhaustiveness compared to a plain object?
4. What is the tradeoff of `Partial<T>` on form state vs explicit optional fields?

## Documentation links

- [TypeScript Handbook — Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [TypeScript Handbook — Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [TypeScript Handbook — Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
