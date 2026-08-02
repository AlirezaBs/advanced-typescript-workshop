import { useCallback, useEffect, useRef, useState } from "react";

export type AsyncState<TData, TError> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: TData }
  | { status: "error"; error: TError };

export function useAsyncOperation<TData, TError, TArgs extends unknown[]>(
  operation: (...args: TArgs) => Promise<TData>,
): {
  state: AsyncState<TData, TError>;
  run: (...args: TArgs) => Promise<void>;
} {
  const [state, setState] = useState<AsyncState<TData, TError>>({ status: "idle" });
  const operationRef = useRef(operation);

  useEffect(() => {
    operationRef.current = operation;
  });

  const run = useCallback(async (...args: TArgs) => {
    setState({ status: "loading" });
    try {
      const data = await operationRef.current(...args);
      setState({ status: "success", data });
    } catch (error) {
      setState({ status: "error", error: error as TError });
    }
  }, []);

  return { state, run };
}

export function AdvancedHooksChallenge() {
  const { state, run } = useAsyncOperation<string, Error, [userId: string]>(async (userId) => {
    return `${userId}:balance=100`;
  });

  return (
    <div className="exercise-panel">
      <p>Status: {state.status}</p>
      {state.status === "success" ? <p className="hint">{state.data}</p> : null}
      {state.status === "error" ? <p className="hint">{state.error.message}</p> : null}
      <button type="button" onClick={() => void run("u_1")}>
        Load balance
      </button>
    </div>
  );
}
