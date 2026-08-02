import { createApiClient } from "./Warmup";
import "../exercise.css";

export function ApiLayerExercise() {
  const api = createApiClient("/api");

  return (
    <div className="exercise-panel">
      <section>
        <h2>Exercise — Typed API client</h2>
        <button type="button" onClick={() => void api.get<{ id: string }[]>("/users")}>
          Fetch users (stub)
        </button>
      </section>
    </div>
  );
}
