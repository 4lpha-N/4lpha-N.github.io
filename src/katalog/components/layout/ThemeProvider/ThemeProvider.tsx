import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ThemeClassContext } from "../../../lib/ThemeClassContext";
import { ThemeContext } from "../../../lib/ThemeContext";
import type { Accent, Theme } from "../../../lib/types";
import "../../../styles/base.scss";
import "./ThemeProvider.scss";

// Muss zur Dauer der Farb-Transition in styles/base.scss passen ($theme-ease)
const THEME_TRANSITION_MS = 450;

// Wrapper mit Theme-Tokens; Portal-Komponenten lesen die Klassen über ThemeClassContext
export function ThemeProvider({
  theme,
  accent = "red",
  className,
  children,
}: {
  theme: Theme;
  accent?: Accent;
  className?: string;
  children: ReactNode;
}) {
  const mode = `${theme}/${accent}`;
  const [prevMode, setPrevMode] = useState(mode);
  const [switching, setSwitching] = useState(false);

  // Im selben Render wie der Wechsel setzen, damit kein Frame ohne is-switching entsteht
  if (mode !== prevMode) {
    setPrevMode(mode);
    setSwitching(true);
  }

  useEffect(() => {
    if (!switching) return;
    const id = window.setTimeout(
      () => setSwitching(false),
      THEME_TRANSITION_MS + 50,
    );
    return () => window.clearTimeout(id);
  }, [switching, mode]);

  const themeClass = `design-wrapper--${theme} design-wrapper--hue-${accent}${switching ? " is-switching" : ""}`;

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeClassContext.Provider value={themeClass}>
        <div
          className={`design-wrapper ${themeClass}${className ? ` ${className}` : ""}`}
        >
          {children}
        </div>
      </ThemeClassContext.Provider>
    </ThemeContext.Provider>
  );
}
