import { VlImage } from "../atoms/Image/Image";
import { VlProgress } from "../atoms/Progress/Progress";
import { Price } from "../atoms/Price/Price";
import { GridCol, GridRow } from "../layout/Grid/Grid";
import { ProductBadges } from "./ProductBadges";
import { VAT } from "./productData";
import type { Product } from "./productData";
import { productImage } from "./productImage";
import "./ProductDetail.scss";

export function ProductDetail({ product: p }: { product: Product }) {
  return (
    <GridRow>
      <GridCol span={{ base: 12, md: 6 }}>
        <VlImage src={productImage(p.bild)} alt={p.name} ratio="4 / 3" />
      </GridCol>
      <GridCol span={{ base: 12, md: 6 }}>
        <div className="vl-product-detail">
          <ProductBadges product={p} />
          <h1 className="vl-h2 vl-product-detail__title">{p.name}</h1>
          <p className="vl-text-lg vl-product-detail__text">{p.beschreibung}</p>
          <Price
            value={p.preis.betrag}
            tax={p.preis.steuer === "brutto" ? "gross" : "net"}
            vat={VAT}
            strike={p.preis.strichpreis ?? undefined}
            from={p.preis.ab}
          />
          <div className="vl-product-detail__attrs">
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
        </div>
      </GridCol>
    </GridRow>
  );
}
