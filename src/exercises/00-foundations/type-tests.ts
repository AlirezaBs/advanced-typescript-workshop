/**
 * Module 00 — Type-level tests
 *
 * Positive tests must compile. Negative tests must fail — guarded by @ts-expect-error.
 * Run: npm run typecheck
 *
 * Note: PaymentChannel and PaymentStatus negative tests use inline expected types.
 * Once you derive those aliases in Warmup.ts and Exercise.tsx, switch the tests
 * to import your exported types and delete the inline helpers.
 */

import type { PaymentChannel, User } from "./Warmup";
import { PAYMENT_CHANNELS } from "./Warmup";
import type { PaymentStatus } from "./Exercise";
import { PAYMENT_STATUS } from "./Exercise";

/** Expected shape after you derive PaymentChannel in Warmup.ts */
type ExpectedPaymentChannel = (typeof PAYMENT_CHANNELS)[keyof typeof PAYMENT_CHANNELS];

/** Expected shape after you derive PaymentStatus in Exercise.tsx */
type ExpectedPaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

// --- Positive tests (must compile) ---

const cardChannel: PaymentChannel = PAYMENT_CHANNELS.card;
void cardChannel;

const validUser: User = {
  id: "u_1",
  name: "Grace Hopper",
  email: "grace@example.com",
};
void validUser;

const pendingStatus: PaymentStatus = PAYMENT_STATUS.pending;
void pendingStatus;

// --- Negative tests (must fail typecheck) ---

// @ts-expect-error — invalid channel literal once PaymentChannel is a derived union
const invalidChannel: ExpectedPaymentChannel = "crypto";
void invalidChannel;

// @ts-expect-error — missing required User fields
const incompleteUser: User = { id: "u_2", name: "Missing email" };
void incompleteUser;

// @ts-expect-error — invalid payment status literal once PaymentStatus is derived
const invalidStatus: ExpectedPaymentStatus = "cancelled";
void invalidStatus;

// @ts-expect-error — User id must be string, not number
const badUserId: User = { id: 123, name: "X", email: "x@example.com" };
void badUserId;
