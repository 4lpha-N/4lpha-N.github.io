import { Check, Info, TriangleAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Tone = "info" | "success" | "warn";

export const TONES: {
  id: Tone;
  label: string;
  icon: LucideIcon;
  text: string;
}[] = [
    {
      id: "info",
      label: "Info",
      icon: Info,
      text: "Ein neues Update steht zur Verfügung.",
    },
    {
      id: "success",
      label: "Erfolg",
      icon: Check,
      text: "Die Änderungen wurden gespeichert.",
    },
    {
      id: "warn",
      label: "Warnung",
      icon: TriangleAlert,
      text: "Dein Abo läuft in drei Tagen ab.",
    },
  ];
