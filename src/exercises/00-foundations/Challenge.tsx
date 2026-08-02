import "../exercise.css";

/**
 * TODO: Model API errors as a discriminated union.
 *
 * Each variant must include a unique `kind` literal and only the fields valid
 * for that error type. Example shapes (adjust field names as needed):
 *
 * - validation: field-level messages
 * - authorization: required role or permission
 * - network: offline or timeout context
 * - server: status code and optional retry hint
 */
export type AppError =
  | { kind: "validation"; message: string }
  | { kind: "authorization"; message: string }
  | { kind: "network"; message: string }
  | { kind: "server"; message: string };

const sampleErrors: AppError[] = [
  { kind: "validation", message: "Amount must be greater than zero." },
  { kind: "authorization", message: "You do not have permission to refund payments." },
  { kind: "network", message: "Unable to reach the payment service." },
  { kind: "server", message: "Payment gateway returned an unexpected error." },
];

/**
 * TODO: Render a user-facing title and message for each AppError variant.
 *
 * Requirements:
 * - Exhaustive switch on error.kind
 * - Use assertNever for impossible cases
 * - No `any` or unsafe assertions
 * - Titles should be distinct per error kind (not all "Error")
 */
export function renderAppError(error: AppError): { title: string; message: string } {
  // Stub — replace with exhaustive handling
  return { title: "Error", message: error.message };
}

export function FoundationsChallenge() {
  return (
    <div className="exercise-panel">
      {sampleErrors.map((error, index) => {
        const { title, message } = renderAppError(error);

        return (
          <div key={`${error.kind}-${index}`} className="error-card">
            <h4>{title}</h4>
            <p>{message}</p>
          </div>
        );
      })}
    </div>
  );
}
