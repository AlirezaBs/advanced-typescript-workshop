import { Box } from "./Warmup";
import "../exercise.css";

export function PolymorphicExercise() {
  return (
    <div className="exercise-panel">
      <section>
        <h2>Exercise — Polymorphic Box</h2>
        <p className="hint">
          Implement <code>BoxProps</code> so intrinsic props like <code>href</code> and{" "}
          <code>type</code> flow through when <code>as</code> changes.
        </p>
        <Box as="button">Pay now</Box>
        <Box as="a">API docs</Box>
        <Box as="div">Static container</Box>
      </section>
    </div>
  );
}
