# Solutions branch

This branch is **your workspace for completed exercises**.

## How it works

- **`main`** — exercise scaffolds with TODOs (start here for a clean slate)
- **`solutions`** — same files under `src/exercises/`, with **your implementations**

There is no separate `solutions/00-foundations/Warmup.solution.ts` tree. You write answers directly in:

```text
src/exercises/00-foundations/Warmup.ts
src/exercises/00-foundations/Exercise.tsx
src/exercises/00-foundations/Challenge.tsx
…
```

## Workflow

```bash
git checkout main          # reset / practice with TODOs
git checkout solutions     # your completed work
```

Compare branches side by side:

```bash
git diff main..solutions -- src/exercises/00-foundations/
```

## Verification

When a module is done, it should pass:

```bash
npm run typecheck
npm run lint
npm run build
```

## Module 10

Module 10 uses **your real project code** — there is no generic reference solution.

## Progress

Track completion in `docs/LEARNING-PROGRESS.md` and notes in `docs/CHEATSHEET.md`.
