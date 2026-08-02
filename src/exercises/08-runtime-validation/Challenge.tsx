import { transactionSchema } from "./Warmup";
import "../exercise.css";

/** TODO: Fetch mock JSON, parse with Zod before rendering — never use `as Transaction[]`. */
export async function fetchTransactionsUnsafe(): Promise<unknown> {
  return [{ id: "tx_1", amount: 100, currency: "USD", status: "paid" }];
}

export function RuntimeValidationChallenge() {
  const parsed = transactionSchema.safeParse({
    id: "tx_1",
    amount: 50,
    currency: "EUR",
    status: "pending",
  });

  return (
    <div className="exercise-panel">
      <p>{parsed.success ? "Valid transaction payload" : "Invalid transaction payload"}</p>
      <p className="hint">Replace unsafe cast pattern documented in README.</p>
    </div>
  );
}
