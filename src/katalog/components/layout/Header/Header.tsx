import { NavLink } from "react-router";
import type { ReactNode } from "react";
import { Settings } from "lucide-react";
import { GridCol, GridContainer, GridRow } from "../Grid/Grid";
import { VlPopover } from "../../molecules/Popover/Popover";
import { SegToggle } from "../../atoms/SegToggle/SegToggle";
import { DECOR_OPTIONS } from "../../../lib/decor";
import { DOOR_VARIANT_OPTIONS } from "../../../lib/doorVariant";
import { cx } from "../../../lib/cx";
import { NAV_ITEMS } from "../../../lib/nav";
import type { Theme } from "../../../lib/types";
import "./Header.scss";

const THEMES: { id: Theme; label: string }[] = [
  { id: "dark", label: "Dunkel" },
  { id: "accent", label: "Akzent" },
  { id: "light", label: "Hell" },
];

const ANIM_OPTIONS = [
  { id: "on", label: "An" },
  { id: "off", label: "Aus" },
];

export function Header({
  theme,
  onTheme,
  decor,
  onDecor,
  door,
  onDoor,
  doorVariant,
  onDoorVariant,
  actions,
}: {
  theme: Theme;
  onTheme: (theme: Theme) => void;
  decor: number;
  onDecor: (decor: number) => void;
  door: boolean;
  onDoor: (door: boolean) => void;
  doorVariant: number;
  onDoorVariant: (variant: number) => void;
  // Buttons links neben den Einstellungen (z. B. Warenkorb)
  actions?: ReactNode;
}) {
  return (
    <header>
      <GridContainer>
        <GridRow align="center" classes="vl-navbar">
          <GridCol span={{ base: 6, md: 3 }} order={1}>
            <div className="vl-navbar__brand">4lpha</div>
          </GridCol>
          {/* Mobil Zeile 2 (order 3), ab md in der Mitte */}
          <GridCol span={{ base: 12, md: 7 }} order={{ base: 3, md: 2 }}>
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
          <GridCol span={{ base: 6, md: 2 }} order={{ base: 2, md: 3 }}>
            <div className="vl-navbar__settings">
              {actions}
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
                    <div className="vl-settings__row">
                      <span className="vl-settings__label">Animation</span>
                      <SegToggle
                        options={ANIM_OPTIONS}
                        value={door ? "on" : "off"}
                        onChange={(v) => onDoor(v === "on")}
                        label="Animation wählen"
                      />
                    </div>
                    {door && (
                      <div className="vl-settings__row">
                        <span className="vl-settings__label">
                          Animationsstil
                        </span>
                        <SegToggle
                          options={DOOR_VARIANT_OPTIONS}
                          value={doorVariant}
                          onChange={onDoorVariant}
                          label="Animationsstil wählen"
                          compact
                        />
                      </div>
                    )}
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
