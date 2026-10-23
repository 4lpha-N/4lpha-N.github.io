import { NavLink } from "react-router";
import { Settings } from "lucide-react";
import { GridCol, GridContainer, GridRow } from "../Grid/Grid";
import { VlPopover } from "../../molecules/Popover/Popover";
import { SegToggle } from "../../atoms/SegToggle/SegToggle";
import { DECOR_OPTIONS } from "../../../lib/decor";
import { cx } from "../../../lib/cx";
import type { Theme } from "../../../lib/types";
import "./Header.scss";

const THEMES: { id: Theme; label: string }[] = [
  { id: "dark", label: "Dunkel" },
  { id: "accent", label: "Akzent" },
  { id: "light", label: "Hell" },
];

const NAV_ITEMS = [
  { to: "/", label: "Start", end: true },
  { to: "/Demo", label: "Demo", end: false },
];

export function Header({
  theme,
  onTheme,
  decor,
  onDecor,
}: {
  theme: Theme;
  onTheme: (theme: Theme) => void;
  decor: number;
  onDecor: (decor: number) => void;
}) {
  return (
    <header>
      <GridContainer>
        <GridRow align="center" classes="vl-navbar">
          <GridCol span={{ base: 6, md: 3 }} order={1}>
            <div className="vl-navbar__brand">4lpha</div>
          </GridCol>
          {/* Mobil Zeile 2 (order 3), ab md in der Mitte */}
          <GridCol span={{ base: 12, md: 8 }} order={{ base: 3, md: 2 }}>
            <nav className="vl-navbar__nav" aria-label="Hauptnavigation">
              <ul className="vl-navbar__list">
                {NAV_ITEMS.map(({ to, label, end }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={end}
                      className={({ isActive }) =>
                        cx("vl-navbar__link", isActive && "is-active")
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </GridCol>
          <GridCol span={{ base: 6, md: 1 }} order={{ base: 2, md: 3 }}>
            <div className="vl-navbar__settings">
              <VlPopover
                variant="secondary"
                label={
                  <>
                    <Settings size={18} aria-hidden="true" />
                    <span className="vl-navbar__sr">Einstellungen</span>
                  </>
                }
                title="Einstellungen"
                side="bottom"
              >
                {() => (
                  <div className="vl-settings">
                    <div className="vl-settings__row">
                      <span className="vl-settings__label">Theme</span>
                      <SegToggle
                        options={THEMES}
                        value={theme}
                        onChange={onTheme}
                        label="Theme wählen"
                      />
                    </div>
                    <div className="vl-settings__row">
                      <span className="vl-settings__label">Decor</span>
                      <SegToggle
                        options={DECOR_OPTIONS}
                        value={decor}
                        onChange={onDecor}
                        label="Decor wählen"
                        compact
                      />
                    </div>
                  </div>
                )}
              </VlPopover>
            </div>
          </GridCol>
        </GridRow>
      </GridContainer>
    </header>
  );
}
