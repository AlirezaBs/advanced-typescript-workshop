import type { AppErrorKind } from "../../lib/types";

/** TODO: Expand AppError variants for async/payment errors. */
export type AppError = {
  kind: AppErrorKind;
  message: string;
};

/** TODO: Model async request state — idle, loading, success with data, error. */
export type RequestState<T> = {
  status: "idle" | "loading" | "success" | "error";
  data?: T;
  error?: AppError;
};

export type Transaction = {
  id: string;
  amount: number;
  currency: string;
};

export const sampleTransaction: Transaction = {
  id: "tx_1",
  amount: 100,
  currency: "USD",
};
