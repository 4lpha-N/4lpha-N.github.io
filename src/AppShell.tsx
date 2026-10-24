import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigationType } from "react-router";
import { ThemeProvider } from "./katalog/components/layout/ThemeProvider/ThemeProvider";
import { Decor } from "./katalog/components/layout/Decor/Decor";
import { Header } from "./katalog/components/layout/Header/Header";
import { PageCrumbs } from "./katalog/components/layout/PageCrumbs/PageCrumbs";
import type { Theme } from "./katalog/lib/types";
import { CRUMB_ROUTES } from "./routes";
import "./App.css";

export default function AppShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [decor, setDecor] = useState(1);
  const { pathname } = useLocation();
  const navType = useNavigationType();

  // Neue Seite startet oben; beim Zurücknavigieren stellt der Browser die Position wieder her
  useEffect(() => {
    if (navType !== "POP") window.scrollTo(0, 0);
  }, [pathname, navType]);

  return (
    <ThemeProvider theme={theme} className="app">
      <Decor variant={decor} />
      <div className="content">
        <Header
          theme={theme}
          onTheme={setTheme}
          decor={decor}
          onDecor={setDecor}
        />
        <main>
          <PageCrumbs routes={CRUMB_ROUTES} />
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
