export type CartItem = {
  productId: string;
  name: string;
  qty: number;
  unitPrice: number;
};

export type CartState = {
  items: CartItem[];
};

/** TODO: Discriminated union of cart actions. */
export type CartAction =
  | { type: "ADD"; productId: string; name: string; unitPrice: number; qty: number }
  | { type: "REMOVE"; productId: string }
  | { type: "CLEAR" };

/** TODO: Implement exhaustive cartReducer. */
export function cartReducer(state: CartState, action: CartAction): CartState {
  void action;
  return state;
}

export const PERMISSIONS = {
  "users:read": "users:read",
  "users:edit": "users:edit",
  "payments:refund": "payments:refund",
  "reports:view": "reports:view",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
