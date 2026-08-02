import { assertNever } from "../../lib/exhaustive";
import "../exercise.css";

export const PAYMENT_STATUS = {
  pending: "pending",
  paid: "paid",
  failed: "failed",
  expired: "expired",
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

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

export function getPaymentStatusDisplay(status: PaymentStatus): {
  label: string;
  badgeClass: string;
} {
  switch (status) {
    case "pending":
      return { label: "Pending", badgeClass: "status-badge--pending" };
    case "paid":
      return { label: "Paid", badgeClass: "status-badge--paid" };
    case "failed":
      return { label: "Failed", badgeClass: "status-badge--failed" };
    case "expired":
      return { label: "Expired", badgeClass: "status-badge--expired" };
    default:
      return assertNever(status);
  }
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
