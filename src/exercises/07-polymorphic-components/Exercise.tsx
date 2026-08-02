import { Box } from "./Warmup";
import "../exercise.css";

export function PolymorphicExercise() {
  return (
    <div className="exercise-panel">
      <section>
        <h2>Exercise — Polymorphic Box</h2>
        <div className="demo-row">
          <Box as="button" type="button" onClick={() => undefined}>
            Pay now
          </Box>
          <Box as="a" href="https://example.com/docs">
            API docs
          </Box>
          <Box as="div">Static container</Box>
        </div>
      </section>
    </div>
  );
}
