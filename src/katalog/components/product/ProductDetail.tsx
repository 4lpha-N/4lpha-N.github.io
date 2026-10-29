import { motion, useReducedMotion } from "framer-motion";
import { VlCarousel } from "../organism/Carousel/Carousel";
import { VlProgress } from "../atoms/Progress/Progress";
import { VlImage } from "../atoms/Image/Image";
import { VlMedia } from "../molecules/Media/Media";
import { Price } from "../atoms/Price/Price";
import { GridCol, GridRow } from "../layout/Grid/Grid";
import { AddToCart } from "./AddToCart";
import { ProductBadges } from "./ProductBadges";
import { StockStatus } from "./StockStatus";
import { VAT } from "./productData";
import type { Product } from "./productData";
import { productImage, productImages } from "./productImage";
import { cx } from "../../lib/cx";
import { reveal } from "../../lib/reveal";
import "./ProductDetail.scss";

export function ProductDetail({ product: p }: { product: Product }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="vl-product-detail__wrap">
      <GridRow>
        <GridCol span={{ base: 12, md: 6 }}>
          <motion.div
            className={cx(
              "vl-product-detail__media",
              p.lager === "ausverkauft" && "is-soldout",
            )}
            {...reveal(reduceMotion)}
          >
            <VlCarousel
              key={p.id}
              variant="primary"
              label={`Bilder von ${p.name}`}
              ratio="4 / 3"
              thumbs
              slides={productImages(p.bild).map((b, i) => ({
                src: productImage(b),
                alt: `${p.name}, Bild ${i + 1}`,
              }))}
            />
          </motion.div>
        </GridCol>
        <GridCol span={{ base: 12, md: 6 }}>
          <motion.div
            className="vl-product-detail"
            {...reveal(reduceMotion, 0.1)}
          >
            <ProductBadges product={p} />
            <h1 className="vl-h2 vl-product-detail__title">{p.name}</h1>
            <p className="vl-text-lg vl-product-detail__text">
              {p.beschreibung}
            </p>
            <StockStatus stock={p.lager} />
            <Price
              value={p.preis.betrag}
              tax={p.preis.steuer === "brutto" ? "gross" : "net"}
              vat={VAT}
              strike={p.preis.strichpreis ?? undefined}
              from={p.preis.ab}
            />
            <AddToCart product={p} />
          </motion.div>
        </GridCol>
      </GridRow>
      <div className="vl-product-detail__attrs">
        {p.eigenschaften.map((e, i) => (
          <motion.div key={e.label} {...reveal(reduceMotion, i * 0.08)}>
            <VlProgress
              variant="primary"
              label={e.label}
              value={e.wert}
              max={10}
              segmented
            />
          </motion.div>
        ))}
      </div>
      <motion.div {...reveal(reduceMotion)}>
        <VlMedia
          variant="plain"
          items={p.texte.map(({ titel, text }, i) => ({
            title: titel,
            text,
            media: (
              <VlImage
                src={productImage(productImages(p.bild)[i % 3])}
                alt={`${p.name}, Bild ${(i % 3) + 1}`}
                ratio="4 / 3"
              />
            ),
          }))}
        />
      </motion.div>
    </div>
  );
}
