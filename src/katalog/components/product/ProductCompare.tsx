import { useContext, useState } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GitCompareArrows, X } from "lucide-react";
import { VlButton } from "../atoms/Button/Button";
import { VlImage } from "../atoms/Image/Image";
import { Price } from "../atoms/Price/Price";
import { VlOverlay } from "../organism/Overlay/Overlay";
import { ProductBadges } from "./ProductBadges";
import { StockStatus } from "./StockStatus";
import { MAX_COMPARE, VAT, grossPrice, products } from "./productData";
import type { Product } from "./productData";
import { productImage } from "./productImage";
import { cx } from "../../lib/cx";
import { ThemeClassContext } from "../../lib/ThemeClassContext";
import "./ProductCompare.scss";

// Bester Wert einer Zeile; nur markiert, wenn sich die Werte unterscheiden
const best = (values: number[], pick: "min" | "max") => {
  const target = Math[pick](...values);
  return values.every((v) => v === target) ? [] : [target];
};

export function ProductCompare({
  ids,
  onRemove,
  onClear,
}: {
  ids: number[];
  onRemove: (id: number) => void;
  onClear: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const themeClass = useContext(ThemeClassContext);
  const [open, setOpen] = useState(false);
  const list = ids.flatMap<Product>((id) => {
    const p = products.find((x) => x.id === id);
    return p ? [p] : [];
  });
  const lowest = best(list.map(grossPrice), "min");

  const remove = (id: number) => {
    if (list.length <= 1) setOpen(false);
    onRemove(id);
  };

  return (
    <>
      {createPortal(
        <div className={cx("design-wrapper", themeClass, "vl-compare__dock")}>
          <AnimatePresence>
            {list.length > 0 && (
              <motion.div
                className="vl-compare__bar"
                role="region"
                aria-label="Produktvergleich"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <span className="vl-compare__count" aria-live="polite">
                  {list.length} von {MAX_COMPARE} zum Vergleich
                </span>
                <div className="vl-compare__bar-actions">
                  <VlButton variant="outline" onClick={onClear}>
                    Leeren
                  </VlButton>
                  <VlButton
                    variant="primary"
                    disabled={list.length < 2}
                    onClick={() => setOpen(true)}
                  >
                    <GitCompareArrows size={18} aria-hidden="true" />
                    Vergleichen
                  </VlButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>,
        document.body,
      )}
      <VlOverlay
        open={open && list.length > 0}
        onClose={() => setOpen(false)}
        placement="center"
        fullscreen={true}
        title="Produktvergleich"
      >
        <div className="vl-compare__scroll">
          <table
            className="vl-compare"
            style={
              { "--n": list.length, "--max": MAX_COMPARE } as CSSProperties
            }
          >
            <thead>
              <tr>
                <td />
                {list.map((p) => (
                  <th key={p.id} scope="col" className="vl-compare__head">
                    <div className="vl-compare__thumb">
                      <VlImage
                        src={productImage(p.bild)}
                        alt=""
                        ratio="4 / 3"
                      />
                    </div>
                    <Link
                      className="vl-compare__name"
                      to={`/Produkte/${p.id}`}
                      onClick={() => setOpen(false)}
                    >
                      {p.name}
                    </Link>
                    <button
                      type="button"
                      className="vl-compare__remove"
                      aria-label={`${p.name} aus dem Vergleich entfernen`}
                      onClick={() => remove(p.id)}
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Preis</th>
                {list.map((p) => (
                  <td
                    key={p.id}
                    className={cx(lowest.includes(grossPrice(p)) && "is-best")}
                  >
                    <Price
                      value={p.preis.betrag}
                      tax={p.preis.steuer === "brutto" ? "gross" : "net"}
                      vat={VAT}
                      strike={p.preis.strichpreis ?? undefined}
                      from={p.preis.ab}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Verfügbarkeit</th>
                {list.map((p) => (
                  <td key={p.id}>
                    <StockStatus stock={p.lager} />
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Kennzeichen</th>
                {list.map((p) => (
                  <td key={p.id}>
                    <ProductBadges product={p} />
                  </td>
                ))}
              </tr>
              {products[0].eigenschaften.map((e, i) => {
                const top = best(
                  list.map((p) => p.eigenschaften[i].wert),
                  "max",
                );
                return (
                  <tr key={e.label}>
                    <th scope="row">{e.label}</th>
                    {list.map((p) => {
                      const wert = p.eigenschaften[i].wert;
                      return (
                        <td
                          key={p.id}
                          className={cx(top.includes(wert) && "is-best")}
                        >
                          <span className="vl-compare__value">{wert} / 10</span>
                          <span
                            className="vl-compare__bar-fill"
                            style={{ "--v": wert / 10 } as CSSProperties}
                            aria-hidden="true"
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </VlOverlay>
    </>
  );
}
