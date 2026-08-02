import { useToggle, useDebouncedValue } from "./Warmup";
import "../exercise.css";

export function AdvancedHooksExercise() {
  const [on, toggle] = useToggle(false);
  const debouncedSearch = useDebouncedValue("", 300);

  return (
    <div className="exercise-panel">
      <section>
        <h2>Exercise — useToggle & useDebouncedValue</h2>
        <button type="button" onClick={toggle}>
          Notifications: {on ? "On" : "Off"}
        </button>
        <p className="hint">Debounced: {debouncedSearch || "(empty)"}</p>
      </section>
    </div>
  );
}
