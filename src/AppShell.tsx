import type { ReactNode } from "react";
import { useState } from "react";
import { ThemeProvider } from "./katalog/components/layout/ThemeProvider/ThemeProvider";
import { Decor } from "./katalog/components/layout/Decor/Decor";
import { Header } from "./katalog/components/layout/Header/Header";
import type { Theme } from "./katalog/lib/types";
import "./App.css";

export default function AppShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [decor, setDecor] = useState(1);

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
        <main>{children}</main>
      </div>
    </ThemeProvider>
  );
}
