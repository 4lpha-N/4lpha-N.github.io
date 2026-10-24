import { products } from "./katalog/components/product/productData";
import type { CrumbRoute } from "./katalog/components/layout/PageCrumbs/PageCrumbs";

// Neue Seiten hier eintragen, dann erscheinen sie automatisch in der Breadcrumb
export const CRUMB_ROUTES: CrumbRoute[] = [
  { path: "/Demo", label: "Demo" },
  { path: "/Produkte", label: "Produkte" },
  {
    path: "/Produkte/:id",
    label: ({ id }) => products.find((p) => String(p.id) === id)?.name,
  },
];
