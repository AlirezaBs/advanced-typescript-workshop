import type { PaymentProcess } from "./Challenge";

// @ts-expect-error — paid status requires transactionId
const impossiblePaid: PaymentProcess = {
  status: "paid",
  paymentId: "pay_x",
  paidAt: "2026-01-01T00:00:00Z",
};
void impossiblePaid;
