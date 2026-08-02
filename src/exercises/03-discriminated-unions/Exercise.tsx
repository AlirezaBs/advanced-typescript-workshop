import type { RequestState, Transaction } from "./Warmup";
import "../exercise.css";

type AsyncBoundaryProps<T> = {
  state: RequestState<T>;
  renderSuccess: (data: T) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: (error: NonNullable<RequestState<T>["error"]>) => React.ReactNode;
};

/** TODO: Implement AsyncBoundary with exhaustive switch on state.status. */
export function AsyncBoundary<T>(_props: AsyncBoundaryProps<T>) {
  return <p className="placeholder">Implement AsyncBoundary&lt;T&gt;</p>;
}

const demoState: RequestState<Transaction> = { status: "loading" };

export function DiscriminatedUnionsExercise() {
  return (
    <div className="exercise-panel">
      <section>
        <h2>Exercise — AsyncBoundary</h2>
        <AsyncBoundary state={demoState} renderSuccess={(tx) => <span>{tx.id}</span>} />
      </section>
    </div>
  );
}
