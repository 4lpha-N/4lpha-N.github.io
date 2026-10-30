export type Theme = "dark" | "accent" | "light";
// Muss zu den Schlüsseln von $accents in styles/_mixins.scss passen
export type Accent = "red" | "orange" | "pink" | "purple" | "sky";
export type Variant = "primary" | "outline" | "alt";

export const VARIANTS: Variant[] = ["primary", "outline", "alt"];

// Für Checkbox und Link: nur Primary (Akzent) und Secondary (Schwarz/Weiß je Theme)
export type SimpleVariant = "primary" | "secondary";
export const SIMPLE_VARIANTS: SimpleVariant[] = ["primary", "secondary"];

// Zusätzliche Variante ohne Rahmen und Fläche, nur für Button, Input, Select, Accordion, Text & Bild
export type PlainVariant = Variant | "plain";
export const PLAIN_VARIANTS: PlainVariant[] = [...VARIANTS, "plain"];
export type PlainSimpleVariant = SimpleVariant | "plain";
export const PLAIN_SIMPLE_VARIANTS: PlainSimpleVariant[] = [
  ...SIMPLE_VARIANTS,
  "plain",
];
