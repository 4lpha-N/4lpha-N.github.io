import { createContext, useContext } from "react";
import type { Theme } from "./types";

// Aktives Theme für Komponenten, die ihre Darstellung daran anpassen
export const ThemeContext = createContext<Theme>("dark");

export const useTheme = () => useContext(ThemeContext);
