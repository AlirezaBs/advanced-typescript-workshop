import "../exercise.css";

/**
 * Module 10 — Real Project Refactor
 *
 * This module has no invented exercise. Provide a file from your project;
 * the mentor will create a refactoring checklist and review incrementally.
 */
export function RealProjectRefactorExercise() {
  return (
    <div className="exercise-panel">
      <section>
        <h2>Real Project Refactor</h2>
        <p className="hint">
          Paste or point to a real component, hook, or API module from your work. The mentor will
          identify TypeScript weaknesses and guide incremental refactors without rewriting
          everything at once.
        </p>
        <ul>
          <li>
            Remove <code>any</code> and unsafe assertions
          </li>
          <li>Model API responses with discriminated unions</li>
          <li>Type permissions and route/query parameters</li>
          <li>Separate runtime validation from compile-time types</li>
        </ul>
      </section>
    </div>
  );
}
