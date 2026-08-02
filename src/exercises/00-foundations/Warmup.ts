/**
 * Module 00 — Warmup (pure TypeScript)
 *
 * Complete the TODOs below. Run `npm run typecheck` after each change.
 * Read README.md for acceptance criteria.
 */

export interface User {
  id: string;
  name: string;
  email: string;
}

export const PAYMENT_CHANNELS = {
  card: "card",
  bank: "bank",
  wallet: "wallet",
} as const;

/** TODO: Derive this type from PAYMENT_CHANNELS — do not hardcode a string union. */
export type PaymentChannel = string;

/**
 * TODO: Safely parse an unknown API value into a User.
 *
 * Requirements:
 * - Accept only plain objects with string id, name, and email
 * - Return null when the shape is invalid (do not throw)
 * - Do not use `any` or unsafe `as User`
 */
export function parseUnknownUser(value: unknown): User | null {
  // Stub — replace with proper narrowing
  void value;
  return null;
}

/**
 * TODO: Return a human-readable label for each payment channel.
 *
 * Requirements:
 * - Narrow the PaymentChannel union exhaustively
 * - Do not use `as` assertions
 * - Consider using assertNever from src/lib/exhaustive.ts for the default branch
 */
export function getChannelLabel(channel: PaymentChannel): string {
  // Stub — replace with exhaustive narrowing
  return channel;
}

/**
 * Sample unknown payloads for manual testing in the browser console or a REPL.
 */
export const unknownUserSamples: unknown[] = [
  { id: "u_1", name: "Ada Lovelace", email: "ada@example.com" },
  { id: 42, name: "Invalid id type" },
  null,
  "not-an-object",
];
