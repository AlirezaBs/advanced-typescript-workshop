import { assertNever } from "../../lib/exhaustive";

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

export type PaymentChannel = (typeof PAYMENT_CHANNELS)[keyof typeof PAYMENT_CHANNELS];

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.id === "string" &&
    typeof record.name === "string" &&
    typeof record.email === "string"
  );
}

export function parseUnknownUser(value: unknown): User | null {
  return isUser(value) ? value : null;
}

export function getChannelLabel(channel: PaymentChannel): string {
  switch (channel) {
    case "card":
      return "Card";
    case "bank":
      return "Bank";
    case "wallet":
      return "Wallet";
    default:
      return assertNever(channel);
  }
}

export const unknownUserSamples: unknown[] = [
  { id: "u_1", name: "Ada Lovelace", email: "ada@example.com" },
  { id: 42, name: "Invalid id type" },
  null,
  "not-an-object",
];
