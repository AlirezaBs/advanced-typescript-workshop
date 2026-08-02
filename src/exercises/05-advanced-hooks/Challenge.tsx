import { useState } from "react";
import "../exercise.css";

export type AsyncState<TData, TError> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: TData }
  | { status: "error"; error: TError };

/** TODO: Typed async hook with args, result, error, loading, stale/cancel handling. */
export function useAsyncOperation<TData, TError, TArgs extends unknown[]>(
  ..._args: [operation: (...args: TArgs) => Promise<TData>]
): {
  state: AsyncState<TData, TError>;
  run: (...args: TArgs) => Promise<void>;
} {
  const [state] = useState<AsyncState<TData, TError>>({ status: "idle" });
  return {
    state,
    run: async () => undefined,
  };
}

export function AdvancedHooksChallenge() {
  const { state, run } = useAsyncOperation(async (userId: string) => {
    return { userId, balance: 100 };
  });

  return (
    <div className="exercise-panel">
      <p>Status: {state.status}</p>
      <button type="button" onClick={() => void run("u_1")}>
        Load balance
      </button>
    </div>
  );
}
