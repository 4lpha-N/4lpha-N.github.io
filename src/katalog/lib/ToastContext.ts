import { createContext, useContext } from "react";
import type { Tone } from "./tones";

export type ToastInput = {
  tone: Tone;
  title: string;
  text: string;
  action?: { label: string; onClick: () => void };
};

export const ToastContext = createContext<(toast: ToastInput) => void>(
  () => {},
);

export const useToast = () => useContext(ToastContext);
