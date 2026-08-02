import { assertNever } from "../../lib/exhaustive";
import "../exercise.css";

export type PaymentProcess =
  | { status: "created"; paymentId: string }
  | { status: "awaitingPayment"; paymentId: string; checkoutUrl: string }
  | { status: "confirming"; paymentId: string }
  | { status: "paid"; paymentId: string; transactionId: string; paidAt: string }
  | { status: "failed"; paymentId: string; reason: string }
  | { status: "expired"; paymentId: string; expiredAt: string };

export function getPaymentProcessLabel(process: PaymentProcess): string {
  switch (process.status) {
    case "created":
      return `Payment ${process.paymentId} created`;
    case "awaitingPayment":
      return `Awaiting payment at ${process.checkoutUrl}`;
    case "confirming":
      return `Confirming ${process.paymentId}`;
    case "paid":
      return `Paid ${process.transactionId} at ${process.paidAt}`;
    case "failed":
      return `Failed: ${process.reason}`;
    case "expired":
      return `Expired at ${process.expiredAt}`;
    default:
      return assertNever(process);
  }
}

const samples: PaymentProcess[] = [
  { status: "created", paymentId: "pay_1" },
  {
    status: "paid",
    paymentId: "pay_2",
    transactionId: "txn_9",
    paidAt: "2026-01-01T12:00:00Z",
  },
  { status: "failed", paymentId: "pay_3", reason: "Card declined" },
];

export function DiscriminatedUnionsChallenge() {
  return (
    <div className="exercise-panel">
      {samples.map((process) => (
        <p key={process.paymentId}>{getPaymentProcessLabel(process)}</p>
      ))}
    </div>
  );
}
