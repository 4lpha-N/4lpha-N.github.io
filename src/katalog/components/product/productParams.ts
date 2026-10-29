import {
  ATTR_MAX,
  ATTR_MIN,
  DEFAULT_FILTERS,
  DEFAULT_PAGE_SIZE,
  MAX_COMPARE,
  PAGE_SIZES,
  PRICE_MAX,
  PRICE_MIN,
  SORT_OPTIONS,
  products,
} from "./productData";
import type { Filters, Range, Sort } from "./productData";

// Filter und Sortierung als URL-Parameter, damit sie beim Zurücknavigieren erhalten bleiben.
// Standardwerte werden weggelassen.

const range = (
  value: string | null,
  min: number,
  max: number,
  fallback: Range,
): Range => {
  const m = value?.match(/^(\d+)-(\d+)$/);
  if (!m) return fallback;
  const lo = Math.max(min, Math.min(Number(m[1]), max));
  const hi = Math.max(lo, Math.min(Number(m[2]), max));
  return [lo, hi];
};

const differs = (a: Range, b: Range) => a[0] !== b[0] || a[1] !== b[1];

export const filtersFromParams = (sp: URLSearchParams): Filters => ({
  aufLager: sp.get("lager") === "1",
  neu: sp.get("neu") === "1",
  bestseller: sp.get("bestseller") === "1",
  preis: range(sp.get("preis"), PRICE_MIN, PRICE_MAX, DEFAULT_FILTERS.preis),
  eigenschaften: DEFAULT_FILTERS.eigenschaften.map((d, i) =>
    range(sp.get(`e${i + 1}`), ATTR_MIN, ATTR_MAX, d),
  ),
});

export const sortFromParams = (sp: URLSearchParams): Sort =>
  SORT_OPTIONS.find((o) => o.value === sp.get("sort"))?.value ?? "name";

export const queryFromParams = (sp: URLSearchParams) => sp.get("q") ?? "";

export const compareFromParams = (sp: URLSearchParams) => {
  const ids = (sp.get("vergleich") ?? "").split(",").map(Number);
  return ids
    .filter(
      (id, i) => ids.indexOf(id) === i && products.some((p) => p.id === id),
    )
    .slice(0, MAX_COMPARE);
};

export const openFromParams = (sp: URLSearchParams) => sp.get("filter") === "1";

export const pageFromParams = (sp: URLSearchParams) =>
  Math.max(1, Math.floor(Number(sp.get("seite"))) || 1);

export const sizeFromParams = (sp: URLSearchParams) =>
  PAGE_SIZES.find((n) => String(n) === sp.get("pro")) ?? DEFAULT_PAGE_SIZE;

export function paramsFromState(
  filters: Filters,
  sort: Sort,
  open: boolean,
  page: number,
  size: number,
  query: string,
  compare: number[],
) {
  const sp = new URLSearchParams();
  if (query.trim()) sp.set("q", query);
  if (compare.length) sp.set("vergleich", compare.join(","));
  if (open) sp.set("filter", "1");
  if (sort !== "name") sp.set("sort", sort);
  if (size !== DEFAULT_PAGE_SIZE) sp.set("pro", String(size));
  if (page > 1) sp.set("seite", String(page));
  if (filters.aufLager) sp.set("lager", "1");
  if (filters.neu) sp.set("neu", "1");
  if (filters.bestseller) sp.set("bestseller", "1");
  if (differs(filters.preis, DEFAULT_FILTERS.preis)) {
    sp.set("preis", `${filters.preis[0]}-${filters.preis[1]}`);
  }
  filters.eigenschaften.forEach((r, i) => {
    if (differs(r, DEFAULT_FILTERS.eigenschaften[i])) {
      sp.set(`e${i + 1}`, `${r[0]}-${r[1]}`);
    }
  });
  return sp;
}
