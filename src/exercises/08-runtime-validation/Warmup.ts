import { z } from "zod";

/** TODO: Define login schema and infer LoginForm type with z.infer. */
export const loginSchema = z.object({
  // Stub — add email and password fields with validation
});

export type LoginForm = {
  email: string;
  password: string;
};

/** TODO: Parse unknown API JSON safely — return { success, data } | { success: false, error }. */
export function parseTransactionList(_input: unknown) {
  void _input;
  return { success: false as const, error: "Not implemented" };
}

export const transactionSchema = z.object({
  // Stub — add id, amount, currency, status fields
});

export type Transaction = {
  id: string;
  amount: number;
  currency: string;
  status: string;
};
