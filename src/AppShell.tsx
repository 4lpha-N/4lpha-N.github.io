import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigationType } from "react-router";
import { ThemeProvider } from "./katalog/components/layout/ThemeProvider/ThemeProvider";
import { Decor } from "./katalog/components/layout/Decor/Decor";
import { Header } from "./katalog/components/layout/Header/Header";
import { PageCrumbs } from "./katalog/components/layout/PageCrumbs/PageCrumbs";
import { ToastProvider } from "./katalog/components/organism/Toast/Toast";
import { CartProvider } from "./katalog/components/product/CartProvider";
import { CartButton } from "./katalog/components/product/CartButton";
import { DECOR_OPTIONS } from "./katalog/lib/decor";
import { readStored, writeStored } from "./katalog/lib/storage";
import type { Theme } from "./katalog/lib/types";
import { CRUMB_ROUTES } from "./routes";
import "./App.css";

function storedTheme(): Theme {
  const t = readStored().theme;
  return t === "dark" || t === "accent" || t === "light" ? t : "dark";
}

function storedDecor() {
  const d = readStored().decor;
  return typeof d === "number" && DECOR_OPTIONS.some((o) => o.id === d) ? d : 1;
}

export default function AppShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(storedTheme);
  const [decor, setDecor] = useState(storedDecor);
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    writeStored({ theme, decor });
  }, [theme, decor]);

  // Vorab-Theme aus index.html entfernen, ab jetzt gilt der ThemeProvider
  useEffect(() => {
    delete document.documentElement.dataset.theme;
  }, []);

  // Neue Seite startet oben; beim Zurücknavigieren stellt der Browser die Position wieder her
  useEffect(() => {
    if (navType !== "POP") window.scrollTo(0, 0);
  }, [pathname, navType]);

  return (
    <ThemeProvider theme={theme} className="app">
      <ToastProvider>
        <CartProvider>
          <Decor variant={decor} />
          <div className="content">
            <Header
              theme={theme}
              onTheme={setTheme}
              decor={decor}
              onDecor={setDecor}
              actions={<CartButton />}
            />
            <main>
              <PageCrumbs routes={CRUMB_ROUTES} />
              {children}
            </main>
          </div>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
