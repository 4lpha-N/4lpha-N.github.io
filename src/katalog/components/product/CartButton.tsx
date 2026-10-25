import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { VlButton } from "../atoms/Button/Button";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "./cartContext";
import "./Cart.scss";

// Header-Button: leer ausgegraut, sonst mit Anzahl; öffnet den Drawer
export function CartButton() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <span className="vl-cart">
        <VlButton
          variant="outline"
          disabled={count === 0}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
        >
          <ShoppingCart size={18} aria-hidden="true" />
          <span className="vl-cart__sr">
            {count === 0 ? "Warenkorb (leer)" : `Warenkorb (${count} Artikel)`}
          </span>
        </VlButton>
        {count > 0 && (
          <span className="vl-cart__badge" aria-hidden="true">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </span>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
