import data from "./data.json";

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
  neu: boolean;
  bestseller: boolean;
  bild: string;
};

export const products = data as Product[];

export const VAT = 0.19;

// Angezeigter Bruttopreis, auch wenn der Preis netto hinterlegt ist
export const grossPrice = (p: Product) =>
  Math.round(
    (p.preis.steuer === "brutto" ? p.preis.betrag : p.preis.betrag * (1 + VAT)) *
      100,
  ) / 100;

const prices = products.map(grossPrice);
export const PRICE_MIN = Math.floor(Math.min(...prices) / 10) * 10;
export const PRICE_MAX = Math.ceil(Math.max(...prices) / 10) * 10;
export const ATTR_MIN = 1;
export const ATTR_MAX = 10;

export const PAGE_SIZES = [12, 24, 48];
export const DEFAULT_PAGE_SIZE = PAGE_SIZES[0];

export type Range = [number, number];

export type Filters = {
  neu: boolean;
  bestseller: boolean;
  preis: Range;
  // je Eigenschaft ein Bereich, in der Reihenfolge der Produktdaten
  eigenschaften: Range[];
};

export const DEFAULT_FILTERS: Filters = {
  neu: false,
  bestseller: false,
  preis: [PRICE_MIN, PRICE_MAX],
  eigenschaften: products[0].eigenschaften.map(() => [ATTR_MIN, ATTR_MAX]),
};

export const isDefaultFilters = (f: Filters) =>
  JSON.stringify(f) === JSON.stringify(DEFAULT_FILTERS);

export function filterProducts(list: Product[], f: Filters) {
  return list.filter((p) => {
    if (f.neu && !p.neu) return false;
    if (f.bestseller && !p.bestseller) return false;
    const price = grossPrice(p);
    if (price < f.preis[0] || price > f.preis[1]) return false;
    return p.eigenschaften.every(
      (e, i) =>
        e.wert >= f.eigenschaften[i][0] && e.wert <= f.eigenschaften[i][1],
    );
  });
}

export type Sort = "name" | "price-asc" | "price-desc" | `attr-${number}`;

export const SORT_OPTIONS: { value: Sort; label: string }[] = [
  { value: "name", label: "Alphabetisch" },
  { value: "price-asc", label: "Preis aufsteigend" },
  { value: "price-desc", label: "Preis absteigend" },
  ...products[0].eigenschaften.map((e, i) => ({
    value: `attr-${i}` as const,
    label: `${e.label} absteigend`,
  })),
];

export function sortProducts(list: Product[], sort: Sort) {
  const attr = sort.startsWith("attr-") ? Number(sort.slice(5)) : -1;
  return [...list].sort((a, b) =>
    attr >= 0
      ? b.eigenschaften[attr].wert - a.eigenschaften[attr].wert
      : sort === "name"
        ? a.name.localeCompare(b.name, "de", { numeric: true })
        : sort === "price-asc"
          ? grossPrice(a) - grossPrice(b)
          : grossPrice(b) - grossPrice(a),
  );
}
