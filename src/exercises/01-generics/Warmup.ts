export function identity<T>(value: T): T {
  return value;
}

export function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

export type Transaction = {
  id: string;
  amount: number;
  status: "pending" | "paid" | "failed";
};

export const sampleTransactions: Transaction[] = [
  { id: "tx_1", amount: 100, status: "pending" },
  { id: "tx_2", amount: 250, status: "paid" },
];
