import { createContext } from "react";
import type { CartAction, CartState } from "./Warmup";
import "../exercise.css";

type CartContextValue = {
  state: CartState;
  dispatch: (action: CartAction) => void;
};

/** TODO: Wire typed context; throw in useCart when outside provider. */
const CartContext = createContext<CartContextValue | null>(null);
void CartContext;

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Stub — wire useReducer and provide context value
  void children;
  return null;
}

export function useCart(): CartContextValue {
  // Stub — replace with useContext + throw when null
  throw new Error("Not implemented");
}

export function ContextReducerExercise() {
  return (
    <div className="exercise-panel">
      <CartProvider>
        <p className="hint">Implement CartProvider and useCart with typed cart state.</p>
      </CartProvider>
    </div>
  );
}
