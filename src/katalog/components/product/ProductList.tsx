import { Link } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { reveal } from "../../lib/reveal";
import { cx } from "../../lib/cx";
import { VlCard } from "../molecules/Card/Card";
import { VlImage } from "../atoms/Image/Image";
import { VlProgress } from "../atoms/Progress/Progress";
import { Price } from "../atoms/Price/Price";
import { ProductBadges } from "./ProductBadges";
import { StockStatus } from "./StockStatus";
import { VAT } from "./productData";
import type { Product } from "./productData";
import { productImage } from "./productImage";
import "./ProductList.scss";

export function ProductList({ products }: { products: Product[] }) {
  const reduceMotion = useReducedMotion();
  if (!products.length) {
    return <p className="vl-text-sm">Keine Produkte gefunden.</p>;
  }
  return (
    <div className="vl-products">
      {products.map((p, i) => (
        <motion.div
          key={p.id}
          className={cx(
            "vl-products__item",
            p.lager === "ausverkauft" && "is-soldout",
          )}
          {...reveal(reduceMotion, (i % 4) * 0.06)}
        >
          <VlCard
            variant="outline"
            interactive
            href={`/Produkte/${p.id}`}
            renderLink={({ className, href, children }) => (
              <Link className={className} to={href}>
                {children}
              </Link>
            )}
            title={p.name}
            eyebrow={<ProductBadges product={p} />}
            media={
              <VlImage src={productImage(p.bild)} alt={p.name} ratio="4 / 3" />
            }
            footer={
              <div className="vl-product__foot">
                <StockStatus stock={p.lager} />
                <Price
                  value={p.preis.betrag}
                  tax={p.preis.steuer === "brutto" ? "gross" : "net"}
                  vat={VAT}
                  strike={p.preis.strichpreis ?? undefined}
                  from={p.preis.ab}
                />
                {p.eigenschaften.map((e) => (
                  <VlProgress
                    key={e.label}
                    variant="primary"
                    label={e.label}
                    value={e.wert}
                    max={10}
                    segmented
                  />
                ))}
              </div>
            }
          >
            {p.beschreibung}
          </VlCard>
        </motion.div>
      ))}
    </div>
  );
}
