/** TODO: Implement identity — returns the same value it receives, fully typed. */
export function identity<T>(_value: T): T {
  // Stub — replace with implementation
  void _value;
  return undefined as T;
}

/** TODO: Return the first item or undefined when the array is empty. */
export function first<T>(_items: readonly T[]): T | undefined {
  // Stub — replace with implementation
  void _items;
  return undefined;
}

/** TODO: Constrain K to keyof T and return obj[key] with correct return type. */
export function getProperty<T, K extends keyof T>(_obj: T, _key: K): T[K] {
  // Stub — replace with implementation
  void _obj;
  void _key;
  return undefined as T[K];
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
