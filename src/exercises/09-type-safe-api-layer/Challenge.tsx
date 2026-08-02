import type { EndpointDefinition, Paginated, User } from "./Warmup";
import "../exercise.css";

export const endpoints = {
  listUsers: {
    path: "/users",
    method: "GET",
  } satisfies EndpointDefinition<
    Record<string, never>,
    { cursor?: string },
    undefined,
    Paginated<User>
  >,
  listTransactions: {
    path: "/transactions",
    method: "GET",
  } satisfies EndpointDefinition<
    Record<string, never>,
    { cursor?: string },
    undefined,
    Paginated<{ id: string; amount: number; status: string }>
  >,
  createPayment: {
    path: "/payments",
    method: "POST",
  } satisfies EndpointDefinition<
    Record<string, never>,
    Record<string, never>,
    { amount: number; currency: string },
    { paymentId: string; status: "created" | "awaitingPayment" }
  >,
};

export function ApiLayerChallenge() {
  return (
    <div className="exercise-panel">
      <p className="hint">Typed endpoint definitions for users, transactions, and createPayment.</p>
      <pre>{JSON.stringify(endpoints, null, 2)}</pre>
    </div>
  );
}
