import { Link } from "react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { VlImage } from "../atoms/Image/Image";
import { VlOverlay } from "../organism/Overlay/Overlay";
import { MAX_QTY, useCart } from "./cartContext";
import { grossPrice } from "./productData";
import { productImage } from "./productImage";
import "./Cart.scss";

const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export function CartDrawer({
  open,
  onClose,
  fullscreen,
}: {
  open: boolean;
  onClose: () => void;
  fullscreen?: boolean;
}) {
  const { items, total, setQty, remove } = useCart();

  return (
    <VlOverlay
      open={open}
      onClose={onClose}
      placement="right"
      fullscreen={fullscreen}
      title="Warenkorb"
      footer={
        items.length > 0 && (
          <div className="vl-cart__sum">
            <span>Gesamt inkl. MwSt.</span>
            <strong>{euro.format(total)}</strong>
          </div>
        )
      }
    >
      {items.length === 0 ? (
        <p className="vl-text-sm">Dein Warenkorb ist leer.</p>
      ) : (
        <ul className="vl-cart__list">
          {items.map(({ product: p, qty }) => (
            <li key={p.id} className="vl-cart__item">
              <div className="vl-cart__thumb">
                <VlImage src={productImage(p.bild)} alt="" ratio="1 / 1" />
              </div>
              <div className="vl-cart__info">
                <Link
                  className="vl-cart__name"
                  to={`/Produkte/${p.id}`}
                  onClick={onClose}
                >
                  {p.name}
                </Link>
                <span className="vl-cart__unit">
                  {euro.format(grossPrice(p))}
                </span>
                <div className="vl-cart__row">
                  <div className="vl-cart__qty" role="group" aria-label="Menge">
                    <button
                      type="button"
                      aria-label={`Menge von ${p.name} verringern`}
                      disabled={qty <= 1}
                      onClick={() => setQty(p.id, qty - 1)}
                    >
                      <Minus size={14} aria-hidden="true" />
                    </button>
                    <span aria-live="polite">{qty}</span>
                    <button
                      type="button"
                      aria-label={`Menge von ${p.name} erhöhen`}
                      disabled={qty >= MAX_QTY}
                      onClick={() => setQty(p.id, qty + 1)}
                    >
                      <Plus size={14} aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="vl-cart__remove"
                    aria-label={`${p.name} entfernen`}
                    onClick={() => remove(p.id)}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                  <strong className="vl-cart__line">
                    {euro.format(grossPrice(p) * qty)}
                  </strong>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </VlOverlay>
  );
}
