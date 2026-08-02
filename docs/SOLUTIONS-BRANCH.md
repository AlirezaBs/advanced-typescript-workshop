# Solutions branch

The **`main`** branch contains exercise scaffolds — TODOs, stubs, and type tests.

The **`solutions`** branch is where **you** keep completed work in the same paths under `src/exercises/`.

## For learners

```bash
# Work through exercises on main (TODOs)
git checkout main

# Save completed work on solutions
git checkout solutions
# Edit src/exercises/<module>/… directly
```

Compare your completed branch against the scaffold:

```bash
git diff main..solutions -- src/exercises/01-generics/
```

### Spoiler policy

- Attempt each module on `main` first (or reset files from `main` when retrying)
- Use `git diff` between branches to review what you changed
- If you look up an answer, explain every line back to yourself

## Branch layout

Both branches share the same structure:

```text
src/exercises/
├── 00-foundations/
│   ├── Warmup.ts
│   ├── Exercise.tsx
│   └── Challenge.tsx
├── 01-generics/
│   └── …
└── …
```

There are **no** parallel `*.solution.ts` files. Your solutions live in the exercise files themselves on the `solutions` branch.

## For maintainers

When updating exercise scaffolding on `main`:

```bash
git checkout solutions
git rebase main
# Resolve conflicts in src/exercises/ where learners have completed work
npm run typecheck
git push origin solutions --force-with-lease
```

Use `--force-with-lease` carefully and only on the `solutions` branch.
