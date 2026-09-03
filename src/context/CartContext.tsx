import { createContext, useContext, useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import type { Product } from "../data/products";

export interface CartItem {
  key: string;
  product: Product;
  grind: string;
  qty: number;
}

type Action =
  | { type: "add"; product: Product; grind: string; qty: number }
  | { type: "setQty"; key: string; qty: number }
  | { type: "remove"; key: string }
  | { type: "clear" };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "add": {
      const key = `${action.product.id}__${action.grind}`;
      const existing = state.find((i) => i.key === key);
      if (existing) {
        return state.map((i) =>
          i.key === key ? { ...i, qty: Math.min(12, i.qty + action.qty) } : i,
        );
      }
      return [
        ...state,
        { key, product: action.product, grind: action.grind, qty: action.qty },
      ];
    }
    case "setQty":
      return state.map((i) =>
        i.key === action.key
          ? { ...i, qty: Math.max(1, Math.min(12, action.qty)) }
          : i,
      );
    case "remove":
      return state.filter((i) => i.key !== action.key);
    case "clear":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (product: Product, grind: string, qty: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.qty * i.product.price, 0);
    return {
      items,
      count,
      subtotal,
      add: (product, grind, qty) => dispatch({ type: "add", product, grind, qty }),
      setQty: (key, qty) => dispatch({ type: "setQty", key, qty }),
      remove: (key) => dispatch({ type: "remove", key }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
