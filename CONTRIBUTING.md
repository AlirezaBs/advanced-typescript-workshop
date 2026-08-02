# Contributing

Thank you for helping improve this workshop. This project is designed for **learning**, not for shipping production apps — contributions should preserve that goal.

## What we welcome

- Clearer exercise instructions and README improvements
- Better type tests (positive and `@ts-expect-error` negative cases)
- Bug fixes in scaffolding, navigation, or tooling
- Documentation fixes and translations
- Accessibility or UX improvements to the learning dashboard

## What we do not merge on `master`

- Reference implementations or completed TODOs
- Solution files under `src/exercises/**`
- Changes that remove intentional `@ts-expect-error` tests without replacement
- Use of `any`, `@ts-ignore`, or unsafe assertions in exercise scaffolding

**Solution code belongs on the `solutions` branch only.** See [`docs/SOLUTIONS-BRANCH.md`](docs/SOLUTIONS-BRANCH.md).

## Before you open a PR

1. Fork and branch from `master`
2. Run all checks:

   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

3. Describe **why** the change helps learners
4. Keep PRs focused — one concern per PR when possible

## Reporting issues

Open an issue if:

- Instructions are ambiguous or incorrect
- `typecheck` fails on a clean clone of `master`
- A module demo does not run in the browser

Do not open issues asking for solutions — use the `solutions` branch after attempting the exercise.

## Code of conduct

Be respectful and constructive. This is a learning space for developers at different skill levels.

## Questions

Use [GitHub Discussions](https://github.com/AlirezaBs/advanced-typescript-workshop/discussions) for conceptual questions when possible, so others can benefit from the answers.
