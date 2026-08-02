# Solutions branch

The **`master`** branch contains exercise scaffolds — TODOs, stubs, and type tests.

Reference implementations are published on a separate **`solutions`** branch so learners can attempt exercises without spoilers.

## For learners

```bash
git checkout master     # work on exercises
git checkout solutions  # compare reference implementations
```

Attempt each module on `master` before switching to `solutions`.

> The `solutions` branch may not exist on a fresh clone until it is published — check available branches on GitHub.

## For maintainers

When exercise scaffolding changes on `master`, rebase `solutions` onto `master` and verify:

```bash
npm run typecheck
npm run lint
npm run build
```
