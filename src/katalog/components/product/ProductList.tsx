import { GridCol, GridRow } from "../layout/Grid/Grid";
import { VlCard } from "../molecules/Card/Card";
import { VlImage } from "../atoms/Image/Image";
import { VlProgress } from "../atoms/Progress/Progress";
import { Price } from "../atoms/Price/Price";
import data from "./data.json";
import { productImage } from "./productImage";
import "./ProductList.scss";

export type Product = {
  id: number;
  name: string;
  beschreibung: string;
  preis: {
    betrag: number;
    steuer: "brutto" | "netto";
    strichpreis: number | null;
    ab: boolean;
  };
  eigenschaften: { label: string; wert: number }[];
  bild: string;
};

const products = data as Product[];

export function ProductList() {
  return (
    <GridRow gap="lg" classes="vl-products">
      {products.map((p) => (
        <GridCol key={p.id} span={{ base: 12, md: 6, lg: 4 }}>
          <VlCard
            variant="outline"
            title={p.name}
            media={
              <VlImage src={productImage(p.bild)} alt={p.name} ratio="4 / 3" />
            }
            footer={
              <div className="vl-product__foot">
                <Price
                  value={p.preis.betrag}
                  tax={p.preis.steuer === "brutto" ? "gross" : "net"}
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
        </GridCol>
      ))}
    </GridRow>
  );
}
