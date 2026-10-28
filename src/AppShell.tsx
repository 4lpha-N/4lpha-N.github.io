import type { ReactNode } from "react";
import { useEffect, useState } from "react";
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
import { DECOR_OPTIONS } from "./katalog/lib/decor";
import { DOOR_VARIANT_OPTIONS } from "./katalog/lib/doorVariant";
import { readStored, writeStored } from "./katalog/lib/storage";
import { useDoor } from "./katalog/lib/useDoor";
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

// Standardmäßig an
function storedDoor() {
  return readStored().door !== false;
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
  const [decor, setDecor] = useState(storedDecor);
  const [door, setDoor] = useState(storedDoor);
  const [doorVariant, setDoorVariant] = useState(storedDoorVariant);
  const { shown, closed, logo, dir } = useDoor(door, intro);
  const navType = useNavigationType();

  useEffect(() => {
    writeStored({ theme, decor, door, doorVariant });
  }, [theme, decor, door, doorVariant]);

  // Vorab-Theme aus index.html entfernen, ab jetzt gilt der ThemeProvider
  useEffect(() => {
    delete document.documentElement.dataset.theme;
  }, []);

  // Neue Seite startet oben; beim Zurücknavigieren stellt der Browser die Position wieder her
  useEffect(() => {
    if (navType !== "POP") window.scrollTo(0, 0);
  }, [shown.pathname, navType]);

  return (
    <ThemeProvider theme={theme} className="app">
      <ToastProvider>
        <CartProvider>
          <Decor variant={decor} />
          <div className="content">
            <Door variant={doorVariant} closed={closed} logo={logo} dir={dir} />
            <Header
              theme={theme}
              onTheme={setTheme}
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
