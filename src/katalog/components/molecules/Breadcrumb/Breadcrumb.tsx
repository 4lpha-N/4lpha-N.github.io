import { useState } from "react";
import type { ReactNode } from "react";
import type { SimpleVariant } from "../../../lib/types";
import "./Breadcrumb.scss";

export type CrumbItem = { label: string; href?: string };

export function VlCrumbs({
  variant,
  items,
  collapsible,
  renderLink,
}: {
  variant: SimpleVariant;
  items: (string | CrumbItem)[];
  // lange Pfade: mittlere Ebenen hinter "…" einklappen
  collapsible?: boolean;
  // eigener Link (z. B. Router-Link); ohne: normales a-Tag
  renderLink?: (props: {
    className: string;
    href: string;
    children: ReactNode;
  }) => ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const all = items.map((it) => (typeof it === "string" ? { label: it } : it));
  const collapsed = !!collapsible && !expanded && all.length > 3;
  const shown: (CrumbItem | null)[] = collapsed
    ? [all[0], null, ...all.slice(-2)]
    : all;

  return (
    <nav aria-label="Breadcrumb" className={`vl-crumbs vl-crumbs--${variant}`}>
      <ol className="vl-crumbs__list">
        {shown.map((it, i) => (
          <li key={it?.label ?? "more"} className="vl-crumbs__item">
            {it === null ? (
              <button
                type="button"
                className="vl-crumbs__more"
                aria-label="Verborgene Ebenen anzeigen"
                onClick={() => setExpanded(true)}
              >
                …
              </button>
            ) : i === shown.length - 1 ? (
              <span className="vl-crumbs__current" aria-current="page">
                {it.label}
              </span>
            ) : it.href && renderLink ? (
              renderLink({
                className: "vl-crumbs__link",
                href: it.href,
                children: it.label,
              })
            ) : (
              <a
                className="vl-crumbs__link"
                href={it.href ?? "#"}
                onClick={it.href ? undefined : (e) => e.preventDefault()}
              >
                {it.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
