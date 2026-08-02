import "../exercise.css";

/** TODO: Model payment lifecycle — each state exposes only valid fields. */
export type PaymentProcess =
  | { status: "created"; paymentId: string }
  | { status: "awaitingPayment"; paymentId: string; checkoutUrl: string }
  | { status: "confirming"; paymentId: string }
  | { status: "paid"; paymentId: string; transactionId: string; paidAt: string }
  | { status: "failed"; paymentId: string; reason: string }
  | { status: "expired"; paymentId: string; expiredAt: string };

/** TODO: Render admin status label exhaustively; prevent impossible field access. */
export function getPaymentProcessLabel(_process: PaymentProcess): string {
  return "TODO";
}

const samples: PaymentProcess[] = [
  { status: "created", paymentId: "pay_1" },
  {
    status: "paid",
    paymentId: "pay_2",
    transactionId: "txn_9",
    paidAt: "2026-01-01T12:00:00Z",
  },
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
