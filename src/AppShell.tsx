import type { ReactNode } from "react";
import { useState } from "react";
import { NavLink } from "react-router";
import { ThemeProvider } from "./katalog/components/layout/ThemeProvider/ThemeProvider";
import { Decor } from "./katalog/components/layout/Decor/Decor";
import { SegToggle } from "./katalog/components/atoms/SegToggle/SegToggle";
import { DECOR_OPTIONS } from "./katalog/lib/decor";
import type { Theme } from "./katalog/lib/types";
import "./App.css";

const THEMES: { id: Theme; label: string }[] = [
  { id: "dark", label: "Dunkel" },
  { id: "accent", label: "Akzent" },
  { id: "light", label: "Hell" },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [decor, setDecor] = useState(1);

  return (
    <ThemeProvider theme={theme} className="app">
      <Decor variant={decor} />
      <main className="content">
        <div className="topbar">
          <nav className="nav">
            <NavLink to="/" end>
              Start
            </NavLink>
            <NavLink to="/Demo">Demo</NavLink>
          </nav>
          <div className="controls">
            <div className="controls__row">
              <span className="controls__label">Theme</span>
              <SegToggle
                options={THEMES}
                value={theme}
                onChange={setTheme}
                label="Theme wählen"
              />
            </div>
            <div className="controls__row">
              <span className="controls__label">Decor</span>
              <SegToggle
                options={DECOR_OPTIONS}
                value={decor}
                onChange={setDecor}
                label="Decor wählen"
                compact
              />
            </div>
          </div>
        </div>
        {children}
      </main>
    </ThemeProvider>
  );
}
