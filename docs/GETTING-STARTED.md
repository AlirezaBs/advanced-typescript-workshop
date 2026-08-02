# Getting started

This guide walks you through the workshop from clone to first completed module.

## Prerequisites

- **Node.js 18+**
- **npm** (or pnpm/yarn — commands below use npm)
- Familiarity with React and basic TypeScript

## Setup

```bash
git clone https://github.com/AlirezaBs/advanced-typescript-workshop.git
cd advanced-typescript-workshop
npm install
npm run dev
```

The learning dashboard opens in your browser. Module **00** is the starting point.

## Daily workflow

### 1. Read

Open the module README, for example:

```text
src/exercises/00-foundations/README.md
```

Understand **why** the concept matters before writing code.

### 2. Warm up (TypeScript only)

Edit `Warmup.ts` in the module folder. These files have no React — focus on types and narrowing.

### 3. Exercise (React)

Edit `Exercise.tsx`. Save and check the browser demo updates.

### 4. Challenge (production-style)

Edit `Challenge.tsx`. This is closer to real admin/payment/dashboard code.

### 5. Verify

```bash
npm run typecheck
npm run lint
```

`typecheck` is the primary success signal. Some files include `@ts-expect-error` lines that **must fail** — that is intentional.

### 6. Reflect

- Update [`LEARNING-PROGRESS.md`](./LEARNING-PROGRESS.md)
- Add a section to [`CHEATSHEET.md`](./CHEATSHEET.md) for the module you finished

## When you are stuck

1. Re-read the module README **Common mistakes** section
2. Read the TypeScript error carefully — what did the compiler infer?
3. Check [`CHEATSHEET.md`](./CHEATSHEET.md)
4. Open a Discussion on GitHub
5. After a genuine attempt, browse the [`solutions` branch](../README.md#solutions-branch)

Avoid copying solutions before trying — you lose the inference practice that this workshop is built for.

## Module completion criteria

You have finished a module when you can:

- [ ] Explain the concept in your own words
- [ ] Implement the pattern without copying
- [ ] Write one invalid example TypeScript rejects
- [ ] Pass `npm run typecheck` and `npm run lint`
- [ ] Complete the production challenge
- [ ] Explain when **not** to use the pattern

## Strict TypeScript

This project uses strict compiler options (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, etc.). If you are used to looser settings, expect more errors — that is the point.

## Optional: Cursor mentor rules

If you use [Cursor](https://cursor.com), the rules in `.cursor/rules/` configure the AI as a mentor (hints, not auto-solutions). They are optional and not required for the workshop.

## Suggested pace

| Module         | Approx. time        |
| -------------- | ------------------- |
| 00 Foundations | 1–2 hours           |
| 01–04          | 1–2 hours each      |
| 05–07          | 2–3 hours each      |
| 08–09          | 2–3 hours each      |
| 10             | Ongoing (your code) |

Take breaks between modules. Spaced practice beats rushing.
