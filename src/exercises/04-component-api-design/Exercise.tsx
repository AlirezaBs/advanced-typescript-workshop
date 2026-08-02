import { TypedButton, TypedInput } from "./Warmup";
import "../exercise.css";

export function ComponentApiExercise() {
  return (
    <div className="exercise-panel">
      <section>
        <h2>Exercise — Button and Input</h2>
        <TypedButton variant="primary">Save payment</TypedButton>
        <TypedInput value="0" onChange={() => undefined} />
      </section>
    </div>
  );
}
