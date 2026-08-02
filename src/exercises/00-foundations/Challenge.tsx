import { assertNever } from "../../lib/exhaustive";
import "../exercise.css";

export type AppError =
  | { kind: "validation"; fields: Record<string, string> }
  | { kind: "authorization"; requiredPermission: string }
  | { kind: "network"; reason: "offline" | "timeout" }
  | { kind: "server"; statusCode: number; retryHint?: "retry" | "doNotRetry" };

const sampleErrors: AppError[] = [
  { kind: "validation", fields: { amount: "Amount must be greater than zero." } },
  { kind: "authorization", requiredPermission: "refund_payments" },
  { kind: "network", reason: "offline" },
  { kind: "server", statusCode: 500, retryHint: "retry" },
];

export function renderAppError(error: AppError): { title: string; message: string } {
  switch (error.kind) {
    case "validation":
      return { title: "Validation Error", message: Object.values(error.fields).join(", ") };
    case "authorization":
      return {
        title: "Authorization Error",
        message: `You do not have permission to ${error.requiredPermission}.`,
      };
    case "network":
      return {
        title: "Network Error",
        message: `Unable to reach the payment service: ${error.reason}.`,
      };
    case "server":
      return {
        title: "Server Error",
        message: `Payment gateway returned an unexpected error: ${error.statusCode}.`,
      };
    default:
      return assertNever(error);
  }
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
