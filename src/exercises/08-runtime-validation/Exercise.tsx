import { loginSchema } from "./Warmup";
import "../exercise.css";

export function RuntimeValidationExercise() {
  const result = loginSchema.safeParse({ email: "bad", password: "short" });

  return (
    <div className="exercise-panel">
      <section>
        <h2>Exercise — Login validation</h2>
        <p className="hint">
          Valid: {result.success ? "yes" : "no"}
          {!result.success && ` — ${result.error.issues[0]?.message}`}
        </p>
      </section>
    </div>
  );
}
