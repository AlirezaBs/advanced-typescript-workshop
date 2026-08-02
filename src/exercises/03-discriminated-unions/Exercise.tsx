import { assertNever } from "../../lib/exhaustive";
import type { AppError, RequestState, Transaction } from "./Warmup";
import "../exercise.css";

type AsyncBoundaryProps<T> = {
  state: RequestState<T>;
  renderSuccess: (data: T) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: (error: AppError) => React.ReactNode;
};

function formatAppError(error: AppError): string {
  switch (error.kind) {
    case "validation":
      return Object.values(error.fields).join(", ");
    case "authorization":
      return error.message;
    case "network":
      return error.reason;
    case "server":
      return error.message;
    default:
      return assertNever(error);
  }
}

export function AsyncBoundary<T>({
  state,
  renderSuccess,
  renderLoading,
  renderError,
}: AsyncBoundaryProps<T>) {
  switch (state.status) {
    case "idle":
      return <p className="hint">Waiting to load…</p>;
    case "loading":
      return renderLoading?.() ?? <p className="hint">Loading…</p>;
    case "success":
      return <>{renderSuccess(state.data)}</>;
    case "error":
      return (
        renderError?.(state.error) ?? (
          <div className="error-card">
            <h4>Error</h4>
            <p>{formatAppError(state.error)}</p>
          </div>
        )
      );
    default:
      return assertNever(state);
  }
}

const demoStates: RequestState<Transaction>[] = [
  { status: "loading" },
  { status: "success", data: { id: "tx_1", amount: 100, currency: "USD" } },
  {
    status: "error",
    error: { kind: "network", reason: "offline" },
  },
];

export function DiscriminatedUnionsExercise() {
  return (
    <div className="exercise-panel">
      {demoStates.map((state, index) => (
        <section key={index}>
          <h3>State: {state.status}</h3>
          <AsyncBoundary
            state={state}
            renderSuccess={(tx) => (
              <span>
                {tx.id} — {tx.currency} {tx.amount}
              </span>
            )}
          />
        </section>
      ))}
    </div>
  );
}
