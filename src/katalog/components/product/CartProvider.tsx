import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { readStored, writeStored } from "../../lib/storage";
import type { CartLine } from "../../lib/storage";
import { CartContext, MAX_QTY } from "./cartContext";
import type { Cart, CartItem } from "./cartContext";
import { grossPrice, products } from "./productData";

const byId = (id: number) => products.find((p) => p.id === id);

// Nur bekannte, lieferbare Produkte mit gültiger Menge übernehmen
function load(): CartLine[] {
  const raw = readStored().cart;
  if (!Array.isArray(raw)) return [];
  const lines: CartLine[] = [];
  for (const l of raw as Partial<CartLine>[]) {
    const id = Number(l?.id);
    const qty = Math.floor(Number(l?.qty));
    const p = byId(id);
    if (!p || p.lager === "ausverkauft" || !(qty >= 1)) continue;
    if (lines.some((x) => x.id === id)) continue;
    lines.push({ id, qty: Math.min(qty, MAX_QTY) });
  }
  return lines;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(load);

  useEffect(() => {
    writeStored({ cart: lines });
  }, [lines]);

  const cart = useMemo<Cart>(() => {
    const items = lines.flatMap<CartItem>((l) => {
      const product = byId(l.id);
      return product ? [{ product, qty: l.qty }] : [];
    });
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      total:
        Math.round(
          items.reduce(
            (sum, i) => sum + grossPrice(i.product) * i.qty * 100,
            0,
          ),
        ) / 100,
      add: (id) => {
        if (byId(id)?.lager === "ausverkauft") return;
        setLines((ls) =>
          ls.some((l) => l.id === id)
            ? ls.map((l) =>
                l.id === id ? { ...l, qty: Math.min(l.qty + 1, MAX_QTY) } : l,
              )
            : [...ls, { id, qty: 1 }],
        );
      },
      setQty: (id, qty) =>
        setLines((ls) =>
          qty < 1
            ? ls.filter((l) => l.id !== id)
            : ls.map((l) =>
                l.id === id ? { ...l, qty: Math.min(qty, MAX_QTY) } : l,
              ),
        ),
      remove: (id) => setLines((ls) => ls.filter((l) => l.id !== id)),
      undoAdd: (id) =>
        setLines((ls) =>
          ls.flatMap((l) =>
            l.id !== id ? [l] : l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : [],
          ),
        ),
    };
  }, [lines]);

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}
