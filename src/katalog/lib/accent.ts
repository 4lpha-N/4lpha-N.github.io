import type { Accent } from "./types";

// swatch = Farbe des Punktes im Umschalter (Klasse aus SegToggle.scss, Farbwerte in styles/_mixins.scss)
export const ACCENT_OPTIONS: { id: Accent; label: string; swatch: Accent }[] = [
  { id: "red", label: "Rot", swatch: "red" },
  { id: "orange", label: "Orange", swatch: "orange" },
  { id: "pink", label: "Rosa", swatch: "pink" },
  { id: "purple", label: "Lila", swatch: "purple" },
  { id: "sky", label: "Hellblau", swatch: "sky" },
];
