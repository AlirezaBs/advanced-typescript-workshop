import { createContext, useContext, useReducer } from "react";
import { cartReducer, type CartAction, type CartState } from "./Warmup";
import "../exercise.css";

type CartContextValue = {
  state: CartState;
  dispatch: (action: CartAction) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

function CartSummary() {
  const { state, dispatch } = useCart();

  return (
    <div>
      <p>Cart items: {state.items.length}</p>
      <div className="demo-row">
        <button
          type="button"
          onClick={() =>
            dispatch({
              type: "ADD",
              productId: "sku_1",
              name: "Support plan",
              unitPrice: 49,
              qty: 1,
            })
          }
        >
          Add item
        </button>
        <button type="button" onClick={() => dispatch({ type: "CLEAR" })}>
          Clear cart
        </button>
      </div>
    </div>
  );
}

export function ContextReducerExercise() {
  return (
    <div className="exercise-panel">
      <CartProvider>
        <CartSummary />
      </CartProvider>
    </div>
  );
}
