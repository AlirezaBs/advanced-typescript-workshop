import { useEffect, useState } from "react";
import { parseTransactionList, transactionSchema, type Transaction } from "./Warmup";
import "../exercise.css";

export async function fetchTransactionsUnsafe(): Promise<unknown> {
  return [
    { id: "tx_1", amount: 100, currency: "USD", status: "paid" },
    { id: "tx_2", amount: 42, currency: "EUR", status: "pending" },
  ];
}

export function RuntimeValidationChallenge() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetchTransactionsUnsafe().then((payload) => {
      const parsed = parseTransactionList(payload);
      if (parsed.success) {
        setTransactions(parsed.data);
        setError(null);
        return;
      }
      setError(parsed.error);
    });
  }, []);

  const single = transactionSchema.safeParse({
    id: "tx_1",
    amount: 50,
    currency: "EUR",
    status: "pending",
  });

  return (
    <div className="exercise-panel">
      <p>{single.success ? "Valid transaction payload" : "Invalid transaction payload"}</p>
      {error ? <p className="hint">{error}</p> : null}
      <div className="demo-row">
        {transactions.map((tx) => (
          <span key={tx.id} className="status-badge status-badge--paid">
            {tx.id}: {tx.currency} {tx.amount}
          </span>
        ))}
      </div>
    </div>
  );
}
