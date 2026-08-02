import "../exercise.css";

export const PAYMENT_STATUS = {
  pending: "pending",
  paid: "paid",
  failed: "failed",
  expired: "expired",
} as const;

/** TODO: Derive this type from PAYMENT_STATUS — do not hardcode the union manually. */
export type PaymentStatus = string;

export type PaymentRecord = {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
};

const samplePayments: PaymentRecord[] = [
  { id: "pay_001", amount: 49.99, currency: "USD", status: PAYMENT_STATUS.pending },
  { id: "pay_002", amount: 120.0, currency: "USD", status: PAYMENT_STATUS.paid },
  { id: "pay_003", amount: 15.5, currency: "EUR", status: PAYMENT_STATUS.failed },
  { id: "pay_004", amount: 8.0, currency: "USD", status: PAYMENT_STATUS.expired },
];

/**
 * TODO: Render a user-facing label and badge class for each payment status.
 *
 * Requirements:
 * - Switch on status exhaustively
 * - Use assertNever in the default branch once PaymentStatus is a proper union
 * - Return { label: string; badgeClass: string }
 * - Do not use `any` or unsafe assertions
 */
export function getPaymentStatusDisplay(status: PaymentStatus): {
  label: string;
  badgeClass: string;
} {
  // Stub — replace with exhaustive narrowing
  void status;
  return { label: "Unknown", badgeClass: "status-badge" };
}

function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const { label, badgeClass } = getPaymentStatusDisplay(status);

  return <span className={`status-badge ${badgeClass}`}>{label}</span>;
}

export function FoundationsExercise() {
  return (
    <div className="exercise-panel">
      <section>
        <h2>Exercise — Payment status renderer</h2>
        <p className="hint">
          Implement <code>PaymentStatus</code> and <code>getPaymentStatusDisplay</code> in{" "}
          <code>Exercise.tsx</code>, then verify badges update below.
        </p>
        <div className="demo-row">
          {samplePayments.map((payment) => (
            <div key={payment.id}>
              <PaymentStatusBadge status={payment.status} />
              <span style={{ marginLeft: "0.5rem", fontSize: "0.85rem" }}>
                {payment.currency} {payment.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Warmup reminder</h3>
        <p className="hint">
          Complete <code>Warmup.ts</code> first: parse unknown users, narrow payment channels, and
          derive types from <code>as const</code> objects.
        </p>
      </section>
    </div>
  );
}
