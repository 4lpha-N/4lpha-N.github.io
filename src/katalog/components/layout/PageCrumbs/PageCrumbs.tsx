import { Link, matchPath, useLocation } from "react-router";
import { GridContainer } from "../Grid/Grid";
import { VlCrumbs } from "../../molecules/Breadcrumb/Breadcrumb";
import type { CrumbItem } from "../../molecules/Breadcrumb/Breadcrumb";
import "./PageCrumbs.scss";

export type CrumbRoute = {
  // Pfadmuster wie in der Route, z. B. "/Produkte/:id"
  path: string;
  // undefined blendet die Seite aus (z. B. unbekannte ID)
  label:
    | string
    | ((
        params: Readonly<Record<string, string | undefined>>,
      ) => string | undefined);
};

// Breadcrumb für alle Seiten: leitet die Ebenen aus der URL ab, Beschriftungen kommen aus routes
export function PageCrumbs({
  routes,
  home = "Start",
  pathname: pathnameProp,
}: {
  routes: CrumbRoute[];
  home?: string;
  // Statt der aktuellen URL, z. B. solange eine Seitenwechsel-Animation die alte Seite zeigt
  pathname?: string;
}) {
  const location = useLocation();
  const pathname = pathnameProp ?? location.pathname;
  const parts = pathname.split("/").filter(Boolean);
  const items: CrumbItem[] = [{ label: home, href: "/" }];

  parts.forEach((_, i) => {
    const path = "/" + parts.slice(0, i + 1).join("/");
    for (const r of routes) {
      const m = matchPath({ path: r.path, end: true }, path);
      if (!m) continue;
      const label = typeof r.label === "function" ? r.label(m.params) : r.label;
      if (label) items.push({ label, href: path });
      break;
    }
  });

  // Startseite und unbekannte Adressen (404) bekommen keine Breadcrumb
  if (parts.length === 0 || items.length !== parts.length + 1) return null;

  return (
    <GridContainer>
      <div className="vl-pagecrumbs">
        <VlCrumbs
          variant="secondary"
          items={items}
          renderLink={({ className, href, children }) => (
            <Link className={className} to={href}>
              {children}
            </Link>
          )}
        />
      </div>
    </GridContainer>
  );
}
