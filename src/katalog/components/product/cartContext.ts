import { createContext, useContext } from "react";
import type { Product } from "./productData";

export type CartItem = { product: Product; qty: number };

export type Cart = {
  items: CartItem[];
  // Summe aller Mengen
  count: number;
  // Gesamtsumme brutto
  total: number;
  add: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
  // Menge um 1 senken; Zeile entfällt bei 0, fehlende Zeile bleibt unberührt
  undoAdd: (id: number) => void;
};

export const MAX_QTY = 99;

export const CartContext = createContext<Cart | null>(null);

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart braucht einen CartProvider");
  return cart;
}
