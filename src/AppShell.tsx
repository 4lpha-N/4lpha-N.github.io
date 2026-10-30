import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useNavigationType } from "react-router";
import type { Location } from "react-router";
import { ThemeProvider } from "./katalog/components/layout/ThemeProvider/ThemeProvider";
import { Decor } from "./katalog/components/layout/Decor/Decor";
import { Door } from "./katalog/components/layout/Door/Door";
import { Header } from "./katalog/components/layout/Header/Header";
import { PageCrumbs } from "./katalog/components/layout/PageCrumbs/PageCrumbs";
import { ToastProvider } from "./katalog/components/organism/Toast/Toast";
import { CartProvider } from "./katalog/components/product/CartProvider";
import { CartButton } from "./katalog/components/product/CartButton";
import { ACCENT_OPTIONS } from "./katalog/lib/accent";
import { DECOR_OPTIONS } from "./katalog/lib/decor";
import { DOOR_VARIANT_OPTIONS } from "./katalog/lib/doorVariant";
import { readStored, writeStored } from "./katalog/lib/storage";
import { useDoor } from "./katalog/lib/useDoor";
import type { Accent, Theme } from "./katalog/lib/types";
import { CRUMB_ROUTES } from "./routes";
import "./App.css";

// Zum Vergleichen: false nutzt die Token-Animation des ThemeProviders
const USE_VIEW_TRANSITION = true;

function storedTheme(): Theme {
  const t = readStored().theme;
  return t === "dark" || t === "accent" || t === "light" ? t : "dark";
}

function storedAccent(): Accent {
  const a = readStored().accent;
  return ACCENT_OPTIONS.find((o) => o.id === a)?.id ?? "red";
}

function storedDecor() {
  const d = readStored().decor;
  return typeof d === "number" && DECOR_OPTIONS.some((o) => o.id === d) ? d : 1;
}

// Standardmäßig aus, bis es in den Einstellungen aktiviert wird
function storedDoor() {
  return readStored().door === true;
}

function storedDoorVariant() {
  const v = readStored().doorVariant;
  return typeof v === "number" && DOOR_VARIANT_OPTIONS.some((o) => o.id === v)
    ? v
    : 1;
}

// children bekommt die Seite, die gerade angezeigt werden soll (bei Seitenwechsel bis zum Schließen der Tür die alte)
// intro={false} schaltet nur die Start-Animation ab, die Seitenwechsel bleiben
export default function AppShell({
  children,
  intro = false,
}: {
  children: (location: Location) => ReactNode;
  intro?: boolean;
}) {
  const [theme, setTheme] = useState<Theme>(storedTheme);
  const [accent, setAccent] = useState<Accent>(storedAccent);
  const [decor, setDecor] = useState(storedDecor);
  const [door, setDoor] = useState(storedDoor);
  const [doorVariant, setDoorVariant] = useState(storedDoorVariant);
  const { shown, closed, logo, dir } = useDoor(door, intro);
  const navType = useNavigationType();

  useEffect(() => {
    writeStored({ theme, accent, decor, door, doorVariant });
  }, [theme, accent, decor, door, doorVariant]);

  // Überblendung per View Transition (läuft auf dem Compositor); sonst Token-Animation des ThemeProviders
  const withTransition = (change: () => void) => {
    const root = document.documentElement;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!USE_VIEW_TRANSITION || !document.startViewTransition || reduce) {
      change();
      return;
    }
    // Ohne Klasse würden die Tokens im neuen Schnappschuss noch auf dem alten Wert stehen
    root.classList.add("is-theme-vt");
    document
      .startViewTransition(() => flushSync(change))
      .finished.finally(() => root.classList.remove("is-theme-vt"));
  };

  // Vorab-Theme aus index.html entfernen, ab jetzt gilt der ThemeProvider
  useEffect(() => {
    delete document.documentElement.dataset.theme;
    delete document.documentElement.dataset.accent;
  }, []);

  // Neue Seite startet oben; beim Zurücknavigieren stellt der Browser die Position wieder her
  useEffect(() => {
    if (navType !== "POP") window.scrollTo(0, 0);
  }, [shown.pathname, navType]);

  return (
    <ThemeProvider theme={theme} accent={accent} className="app">
      <ToastProvider>
        <CartProvider>
          <Decor variant={decor} />
          <div className="content">
            <Door variant={doorVariant} closed={closed} logo={logo} dir={dir} />
            <Header
              theme={theme}
              onTheme={(next) => withTransition(() => setTheme(next))}
              accent={accent}
              onAccent={(next) => withTransition(() => setAccent(next))}
              decor={decor}
              onDecor={setDecor}
              door={door}
              onDoor={setDoor}
              doorVariant={doorVariant}
              onDoorVariant={setDoorVariant}
              actions={<CartButton />}
            />
            <main>
              <PageCrumbs routes={CRUMB_ROUTES} pathname={shown.pathname} />
              {children(shown)}
            </main>
          </div>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
