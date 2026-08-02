import type { AppErrorKind } from "../../lib/types";

export type AppError =
  | { kind: "validation"; fields: Record<string, string> }
  | { kind: "authorization"; message: string }
  | { kind: "network"; reason: "offline" | "timeout" }
  | { kind: "server"; statusCode: number; message: string };

export type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: AppError };

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

void (null as AppErrorKind | null);
