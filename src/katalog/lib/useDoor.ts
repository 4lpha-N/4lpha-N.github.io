import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useReducedMotion } from "framer-motion";
import { navDirection } from "./nav";
import type { DoorDir } from "./nav";
import { introSeen, markIntroSeen } from "./storage";

// Schließdauer plus kleiner Puffer; Gegenstück: --door-close in layout/Door/Door.scss
export const DOOR_CLOSE_MS = 500;
// Haltezeit beim ersten Aufruf; Gegenstück: --door-boot in layout/Door/Door.scss
export const DOOR_BOOT_MS = 1200;

// Steuert die Tür: einmal pro Sitzung beim Start, bei jedem Seitenwechsel (anderer Pfad) und liefert die
// Seite, die gerade angezeigt werden soll (bleibt bis zum Schließen die alte)
export function useDoor(enabled: boolean, intro = true) {
  const reduceMotion = useReducedMotion();
  const active = enabled && !reduceMotion;
  const location = useLocation();
  const [shown, setShown] = useState(location);
  const [boot, setBoot] = useState(() => active && intro && !introSeen());
  const [openDir, setOpenDir] = useState<DoorDir>("right");

  const pending = active && location.pathname !== shown.pathname;
  // Richtung bleibt beim Öffnen dieselbe wie beim Schließen
  const dir = pending
    ? navDirection(shown.pathname, location.pathname)
    : openDir;

  // Gleicher Pfad (z. B. Filter in der URL) oder deaktiviert: sofort übernehmen, ohne Zwischenframe
  if (location.key !== shown.key && !pending) setShown(location);

  useEffect(() => {
    if (!boot) return;
    markIntroSeen();
    const id = window.setTimeout(() => setBoot(false), DOOR_BOOT_MS);
    return () => window.clearTimeout(id);
  }, [boot]);

  // Neue Seite erst übernehmen, wenn die Tür zu ist
  useEffect(() => {
    if (boot || !pending) return;
    const id = window.setTimeout(() => {
      setOpenDir(navDirection(shown.pathname, location.pathname));
      setShown(location);
    }, DOOR_CLOSE_MS);
    return () => window.clearTimeout(id);
  }, [boot, pending, location, shown.pathname]);

  return { shown, closed: boot || pending, logo: boot, dir };
}
