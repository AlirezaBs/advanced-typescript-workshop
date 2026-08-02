# Module 09 — Type-Safe API Layer

## Why this matters

Frontend teams often have **typed** API calls that lie: `get<User[]>("/users")` compiles but nothing validates the response at runtime (Module 08). Worse, path params, query strings, and request bodies are stringly typed — typos ship to production.

A type-safe API layer connects **endpoint definitions** (params, query, body, response, error) to **fetch helpers** so call sites get autocomplete and compile-time checks — while staying honest about runtime validation boundaries.

## Problem it solves

| Layer | Responsibility |
| ----- | -------------- |
| `EndpointDefinition` | Document contract per route (types only) |
| `createApiClient` | Typed `get`/`post` helpers — no fake runtime safety |
| Zod (from Module 08) | Validate responses at the boundary |
| Pagination types | `Paginated<T>` reused across list endpoints |

**Important:** Typed fetch wrappers improve developer experience; they do **not** replace runtime parsing. The best teams combine both.

## Concepts in this module

| Concept | Use in React |
| ------- | ------------ |
| Phantom types | `_types?` bag on endpoint defs (compile-time only) |
| Generic endpoint defs | Params, query, body, response, error type params |
| `Paginated<T>` | Reusable list response shape |
| API client factory | `createApiClient(baseUrl)` with typed methods |
| Endpoint registry | Central `endpoints` object for all routes |
| Honest typing | Don't claim runtime safety TypeScript can't provide |

### Small conceptual examples

```ts
type EndpointDefinition<
  TParams = Record<string, never>,
  TQuery = Record<string, never>,
  TBody = undefined,
  TResponse = unknown,
  TError = ApiError,
> = {
  path: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  _types?: {
    params: TParams;
    query: TQuery;
    body: TBody;
    response: TResponse;
    error: TError;
  };
};

type UserListEndpoint = EndpointDefinition<
  Record<string, never>,
  { cursor?: string; limit?: string },
  undefined,
  Paginated<User>
>;

// Typed client — still validate response with Zod at boundary
const api = createApiClient("/api");
const raw = await api.get<unknown>("/users?limit=20");
const parsed = userListSchema.safeParse(raw);
```

## Common mistakes

1. **Trusting generic `get<T>` return type** — `T` is a cast, not validation.
2. **Duplicating path strings** — typo in `"user"` vs `"users"`; centralize in `endpoints`.
3. **Untyped query params** — `?cursor=${cursor}` without encoding or typing.
4. **Mixing transport and domain errors** — network vs validation vs server.
5. **Over-engineering code gen early** — start with a simple registry; add OpenAPI/tRPC later if needed.

## Files in this module

| File            | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `Warmup.ts`     | `EndpointDefinition`, `Paginated<T>`, `createApiClient` |
| `Exercise.tsx`  | Demo typed fetch button                              |
| `Challenge.tsx` | Full `endpoints` registry + wired client             |
| `type-tests.ts` | Endpoint definition shape tests                      |

## Exercise instructions

### 1. Warmup (`Warmup.ts`)

1. Review `EndpointDefinition` — understand phantom `_types` for inference at call sites.
2. Review `UserListEndpoint` as an example of paginated list typing.
3. Implement `createApiClient(baseUrl)`:
   - `get<TResponse>(path): Promise<TResponse>` — fetch JSON (mock/stub OK for workshop)
   - `post<TBody, TResponse>(path, body): Promise<TResponse>`
   - Document in comments that callers should validate with Zod before trusting `TResponse`.

### 2. Exercise (`Exercise.tsx`)

1. Wire the demo button to call `api.get` with a typed response shape.
2. Optional: add error handling for network failures.

### 3. Challenge (`Challenge.tsx`)

1. Define `endpoints` registry with at least:
   - `listUsers` — GET paginated users
   - `listTransactions` — GET paginated transactions
   - `createPayment` — POST with body `{ amount: number; currency: string }` and typed response
2. Create helper `callEndpoint(client, endpoint, options)` that uses path/method from definition.
3. Pair with Zod schemas from Module 08 for response validation (recommended).

## Acceptance criteria

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `EndpointDefinition` encodes params, query, body, response, error
- [ ] `createApiClient` methods are generic without using `any`
- [ ] `endpoints` registry covers users, transactions, and create payment
- [ ] README or code comments acknowledge runtime validation requirement
- [ ] No `any`, `@ts-ignore`, or unsafe `as` on API responses

## Production challenge

Integrate with your real backend: one OpenAPI spec or hand-written endpoint map, Zod schemas generated or maintained alongside, and a `useQuery` hook that validates before updating React state.

## Reflection questions

1. What does TypeScript guarantee vs what must Zod guarantee?
2. Why use a phantom `_types` field instead of runtime metadata?
3. When would tRPC or OpenAPI codegen replace a hand-written layer?
4. How do typed errors (`ApiError` discriminated union) improve UI handling?

## Documentation links

- [TypeScript Handbook — Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Zod Documentation](https://zod.dev/) (Module 08)
- [tRPC — End-to-end typesafe APIs](https://trpc.io/) (alternative approach)
