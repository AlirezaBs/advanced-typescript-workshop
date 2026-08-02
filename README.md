# Advanced TypeScript in React

A hands-on workshop for learning **advanced TypeScript patterns in real React applications** — payments, admin panels, user management, dashboards, and API typing.

Exercises are **TODO-based**. The `main` branch contains scaffolds with TODOs. Keep your completed work on the optional [`solutions`](https://github.com/AlirezaBs/advanced-typescript-workshop/tree/solutions) branch — same paths under `src/exercises/`, no separate answer files.

## Who this is for

You are a good fit if you:

- Know React and basic TypeScript (props, `useState`, simple interfaces)
- Want stronger **type modeling**, **inference**, and **production patterns**
- Prefer learning by doing over reading theory alone

This is not a beginner React course. It focuses on TypeScript reasoning inside React codebases.

## Quick start

```bash
git clone https://github.com/AlirezaBs/advanced-typescript-workshop.git
cd advanced-typescript-workshop
npm install
npm run dev
```

Open the URL from the terminal. Use the sidebar to navigate modules **00–10**.

### Verify your work

```bash
npm run typecheck   # primary check — includes intentional @ts-expect-error tests
npm run lint
npm run format      # format with Prettier
npm run build
```

## How to learn

Each module follows the same structure:

| File            | Purpose                                                       |
| --------------- | ------------------------------------------------------------- |
| `README.md`     | Concepts, mistakes, acceptance criteria, reflection questions |
| `Warmup.ts`     | Pure TypeScript warm-up (no React)                            |
| `Exercise.tsx`  | Runnable React exercise with browser demo                     |
| `Challenge.tsx` | Production-style challenge                                    |
| `type-tests.ts` | Positive and negative compile-time tests                      |

**Recommended order:**

1. Read the module `README.md`
2. Complete `Warmup.ts` → `Exercise.tsx` → `Challenge.tsx`
3. Run `npm run typecheck`
4. Update your copy of [`docs/LEARNING-PROGRESS.md`](docs/LEARNING-PROGRESS.md)
5. Add notes to [`docs/CHEATSHEET.md`](docs/CHEATSHEET.md) after you finish a module

Do not skip ahead for the best learning outcome — later modules reuse earlier patterns.

## Curriculum

| Module                                                                           | Topic                                                  | Difficulty   |
| -------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------ |
| [00 — Foundations](src/exercises/00-foundations/README.md)                       | `unknown`, narrowing, `as const`, discriminated unions | Foundations  |
| [01 — Generics](src/exercises/01-generics/README.md)                             | Generic components, hooks, `DataTable<T>`              | Intermediate |
| [02 — Utility types](src/exercises/02-utility-and-mapped-types/README.md)        | `Pick`, `Omit`, `Partial`, form config typing          | Intermediate |
| [03 — Discriminated unions](src/exercises/03-discriminated-unions/README.md)     | `RequestState<T>`, payment lifecycle                   | Intermediate |
| [04 — Component API](src/exercises/04-component-api-design/README.md)            | Conditional props, mutually exclusive APIs             | Intermediate |
| [05 — Advanced hooks](src/exercises/05-advanced-hooks/README.md)                 | Tuple inference, generic hooks, async hook             | Advanced     |
| [06 — Context & reducer](src/exercises/06-context-and-reducer/README.md)         | Typed context, permissions                             | Intermediate |
| [07 — Polymorphic components](src/exercises/07-polymorphic-components/README.md) | `as` prop, `ElementType`                               | Advanced     |
| [08 — Runtime validation](src/exercises/08-runtime-validation/README.md)         | Zod, parse vs cast                                     | Intermediate |
| [09 — Type-safe API layer](src/exercises/09-type-safe-api-layer/README.md)       | Endpoints, pagination, validated fetch                 | Advanced     |
| [10 — Real project refactor](src/exercises/10-real-project-refactor/README.md)   | Refactor your own code incrementally                   | Advanced     |

## Solutions branch

Use a second branch to save your completed exercises without overwriting the TODO scaffolds on `main`:

```bash
git checkout solutions          # your completed src/exercises/ work
git diff main..solutions -- src/exercises/00-foundations/   # compare vs scaffold
git checkout main               # return to TODOs
```

See [`docs/SOLUTIONS-BRANCH.md`](docs/SOLUTIONS-BRANCH.md) for workflow details.

> **Note:** There are no pre-written `*.solution.ts` files. You implement answers directly in `src/exercises/` on the `solutions` branch.

## Project structure

```text
src/
├── App.tsx                 # Learning dashboard
├── exercises/00–10/        # One folder per module
├── lib/                    # Shared utilities (added per module)
└── modules.ts              # Module registry
docs/
├── GETTING-STARTED.md      # Detailed setup and workflow
├── LEARNING-PROGRESS.md    # Personal progress template
├── CHEATSHEET.md           # Your growing reference
└── SOLUTIONS-BRANCH.md     # Solutions branch documentation
.cursor/rules/              # Cursor mentor rules (optional)
solutions/README.md         # Explains the solutions branch workflow
```

## Using with Cursor (optional)

This repo includes [Cursor rules](.cursor/rules/) that encourage a mentor-style workflow: progressive hints, no auto-solving, review-first feedback. They are optional — the workshop works in any editor.

## Contributing

Contributions welcome: exercise clarity, type-test coverage, docs, and bug fixes. Please **do not open PRs with solution code on `main`**.

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before submitting changes.

## License

[MIT](LICENSE) — free to use, fork, and adapt with attribution.

## Author

Maintained by [AlirezaBs](https://github.com/AlirezaBs). Issues and discussions welcome on GitHub.
