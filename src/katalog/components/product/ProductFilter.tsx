import { VlCheck } from "../atoms/Check/Check";
import { VlSlider } from "../atoms/Slider/Slider";
import {
  ATTR_MAX,
  ATTR_MIN,
  PRICE_MAX,
  PRICE_MIN,
  products,
} from "./productData";
import type { Filters, Range } from "./productData";

export function ProductFilter({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  const setAttr = (i: number, range: Range) =>
    onChange({
      ...filters,
      eigenschaften: filters.eigenschaften.map((r, j) => (j === i ? range : r)),
    });

  return (
    <div className="vl-product-filter">
      <div className="vl-product-filter__col">
        <div
          role="group"
          aria-label="Kennzeichen"
          className="vl-product-filter__group"
        >
          <VlCheck
            variant="primary"
            label="Auf Lager"
            checked={filters.aufLager}
            onChange={(aufLager) => onChange({ ...filters, aufLager })}
          />
          <VlCheck
            variant="primary"
            label="Neu"
            checked={filters.neu}
            onChange={(neu) => onChange({ ...filters, neu })}
          />
          <VlCheck
            variant="primary"
            label="Bestseller"
            checked={filters.bestseller}
            onChange={(bestseller) => onChange({ ...filters, bestseller })}
          />
        </div>
        <VlSlider
          variant="primary"
          label="Preis in €"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={5}
          value={filters.preis}
          onChange={(v) => onChange({ ...filters, preis: v as Range })}
        />
      </div>
      <div className="vl-product-filter__col vl-product-filter__attrs">
        {products[0].eigenschaften.map((e, i) => (
          <VlSlider
            key={e.label}
            variant="primary"
            label={e.label}
            min={ATTR_MIN}
            max={ATTR_MAX}
            value={filters.eigenschaften[i]}
            onChange={(v) => setAttr(i, v as Range)}
          />
        ))}
      </div>
    </div>
  );
}
