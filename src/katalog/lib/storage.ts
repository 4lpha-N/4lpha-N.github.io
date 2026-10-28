import type { Theme } from "./types";

// Ein gemeinsamer Eintrag im localStorage für Theme, Decor, Türanimation und Warenkorb
const KEY = "4lpha";

export type CartLine = { id: number; qty: number };
export type Stored = {
  theme: Theme;
  decor: number;
  door: boolean;
  doorVariant: number;
  cart: CartLine[];
};

// Gelesene Werte sind ungeprüft: jeder Verbraucher validiert seinen Teil selbst
export function readStored(): Partial<Record<keyof Stored, unknown>> {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

// Ergänzt nur die übergebenen Teile, der Rest des Eintrags bleibt erhalten
export function writeStored(patch: Partial<Stored>) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...readStored(), ...patch }));
  } catch {
    // Speicher gesperrt oder voll: die App läuft ohne Persistenz weiter
  }
}

// Start-Intro läuft nur einmal pro Sitzung (Tab), daher sessionStorage
const INTRO_KEY = "4lpha-intro";

export function introSeen(): boolean {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    // Ohne Sitzungsspeicher läuft das Intro bei jedem Aufruf
  }
}
