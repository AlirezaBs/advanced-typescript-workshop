import type { Transaction } from "./Warmup";
import { first, getProperty, sampleTransactions } from "./Warmup";

const tx: Transaction = { id: "tx_1", amount: 50, status: "pending" };
const amount = getProperty(tx, "amount");
void amount;

const head = first(sampleTransactions);
void head;

/** Expected shape once Column<T>.key is constrained to keyof T */
type ExpectedColumn<T> = {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
};

// @ts-expect-error — invalid column key must not compile once Column<T> is constrained
const badColumn: ExpectedColumn<Transaction> = { key: "nonExistingField", header: "Bad" };
void badColumn;
