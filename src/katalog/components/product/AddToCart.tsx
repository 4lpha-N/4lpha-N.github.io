import { ShoppingCart } from "lucide-react";
import { VlButton } from "../atoms/Button/Button";
import { useToast } from "../../lib/ToastContext";
import { useCart } from "./cartContext";
import type { Product } from "./productData";

export function AddToCart({ product }: { product: Product }) {
  const { add, undoAdd } = useCart();
  const toast = useToast();
  const soldOut = product.lager === "ausverkauft";

  return (
    <VlButton
      variant="primary"
      disabled={soldOut}
      onClick={() => {
        add(product.id);
        toast({
          tone: "success",
          title: "Zum Warenkorb hinzugefügt",
          text: `${product.name} liegt jetzt im Warenkorb.`,
          action: { label: "Rückgängig", onClick: () => undoAdd(product.id) },
        });
      }}
    >
      <ShoppingCart size={18} aria-hidden="true" />
      {soldOut ? "Ausverkauft" : "In den Warenkorb"}
    </VlButton>
  );
}
