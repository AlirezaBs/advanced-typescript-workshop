import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const transactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.enum(["pending", "paid", "failed"]),
});

export type Transaction = z.infer<typeof transactionSchema>;

export function parseTransactionList(input: unknown) {
  const result = z.array(transactionSchema).safeParse(input);
  if (result.success) {
    return { success: true as const, data: result.data };
  }
  return { success: false as const, error: result.error.message };
}
