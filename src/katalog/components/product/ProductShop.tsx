import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { VlButton } from "../atoms/Button/Button";
import { VlSelect } from "../atoms/Field/Field";
import { VlPagination } from "../molecules/Pagination/Pagination";
import { ProductFilter } from "./ProductFilter";
import { ProductList } from "./ProductList";
import {
  DEFAULT_FILTERS,
  PAGE_SIZES,
  SORT_OPTIONS,
  filterProducts,
  isDefaultFilters,
  products,
  sortProducts,
} from "./productData";
import type { Filters, Sort } from "./productData";
import {
  filtersFromParams,
  openFromParams,
  pageFromParams,
  paramsFromState,
  sizeFromParams,
  sortFromParams,
} from "./productParams";
import { cx } from "../../lib/cx";
import "./ProductShop.scss";

const SIZE_OPTIONS = PAGE_SIZES.map((n) => ({
  value: String(n),
  label: String(n),
}));

export function ProductShop() {
  const panelId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(() => openFromParams(searchParams));
  const [filters, setFiltersState] = useState<Filters>(() =>
    filtersFromParams(searchParams),
  );
  const [sort, setSortState] = useState<Sort>(() =>
    sortFromParams(searchParams),
  );
  const [size, setSizeState] = useState(() => sizeFromParams(searchParams));
  const [page, setPage] = useState(() => pageFromParams(searchParams));

  // Änderungen an Filter, Sortierung oder Seitengröße beginnen wieder auf Seite 1
  const setFilters = (f: Filters) => {
    setFiltersState(f);
    setPage(1);
  };
  const setSort = (s: Sort) => {
    setSortState(s);
    setPage(1);
  };
  const setSize = (n: number) => {
    setSizeState(n);
    setPage(1);
  };

  const items = useMemo(
    () => sortProducts(filterProducts(products, filters), sort),
    [filters, sort],
  );
  const pages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(page, pages);
  const visible = items.slice((current - 1) * size, current * size);

  // Zustand verzögert in die URL schreiben (ersetzt den Eintrag, erzeugt keinen Verlauf)
  useEffect(() => {
    const t = setTimeout(() => {
      const next = paramsFromState(
        filters,
        sort,
        open,
        current,
        size,
      ).toString();
      if (next !== window.location.search.slice(1)) {
        setSearchParams(new URLSearchParams(next), { replace: true });
      }
    }, 300);
    return () => clearTimeout(t);
  }, [filters, sort, open, current, size, setSearchParams]);

  return (
    <>
      <div className="vl-shop__toolbar">
        <div className="vl-shop__actions">
          <VlButton
            variant="outline"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
          >
            <SlidersHorizontal size={18} aria-hidden="true" />
            {open ? "Filter ausblenden" : "Filter anzeigen"}
          </VlButton>
          <VlButton
            variant="outline"
            disabled={isDefaultFilters(filters)}
            onClick={() => setFilters(DEFAULT_FILTERS)}
          >
            <RotateCcw size={18} aria-hidden="true" />
            Filter zurücksetzen
          </VlButton>
        </div>
        <div className="vl-shop__sort">
          <VlSelect
            variant="outline"
            label="Sortierung"
            options={SORT_OPTIONS}
            value={sort}
            onChange={(v) => setSort(v as Sort)}
          />
        </div>
      </div>
      <div
        id={panelId}
        className={cx("vl-shop__panel", open && "is-open")}
        inert={!open}
      >
        <div className="vl-shop__clip">
          <div className="vl-shop__filters">
            <ProductFilter filters={filters} onChange={setFilters} />
          </div>
        </div>
      </div>
      <div ref={listRef} className="vl-shop__list">
        <ProductList products={visible} />
      </div>
      {items.length > 0 && (
        <div className="vl-shop__foot">
          {pages > 1 && (
            <VlPagination
              variant="primary"
              total={pages}
              page={current}
              edges
              onChange={(p) => {
                setPage(p);
                listRef.current?.scrollIntoView({ block: "start" });
              }}
            />
          )}
          <div className="vl-shop__size">
            <VlSelect
              variant="outline"
              label="Produkte pro Seite"
              options={SIZE_OPTIONS}
              value={String(size)}
              onChange={(v) => setSize(Number(v))}
            />
          </div>
        </div>
      )}
    </>
  );
}
