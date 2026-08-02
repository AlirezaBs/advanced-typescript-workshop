import { assertNever } from "../../lib/exhaustive";

export type CartItem = {
  productId: string;
  name: string;
  qty: number;
  unitPrice: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "ADD"; productId: string; name: string; unitPrice: number; qty: number }
  | { type: "REMOVE"; productId: string }
  | { type: "CLEAR" };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((item) => item.productId === action.productId);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === action.productId ? { ...item, qty: item.qty + action.qty } : item,
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            productId: action.productId,
            name: action.name,
            unitPrice: action.unitPrice,
            qty: action.qty,
          },
        ],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((item) => item.productId !== action.productId) };
    case "CLEAR":
      return { items: [] };
    default:
      return assertNever(action);
  }
}

export const PERMISSIONS = {
  "users:read": "users:read",
  "users:edit": "users:edit",
  "payments:refund": "payments:refund",
  "reports:view": "reports:view",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
