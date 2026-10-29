import type { ButtonHTMLAttributes } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { cx } from "../../../lib/cx";
import "./IconButton.scss";

type IconKind = "prev" | "next" | "play" | "pause" | "close";

export function IconButton({
  icon,
  label,
  className,
  ...rest
}: {
  icon: IconKind;
  label: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label">) {
  return (
    <button
      type="button"
      className={cx("vl-ibtn", "vl-ibtn--over", className)}
      aria-label={label}
      {...rest}
    >
      {icon === "prev" && <ChevronLeft size={22} aria-hidden="true" />}
      {icon === "next" && <ChevronRight size={22} aria-hidden="true" />}
      {icon === "play" && (
        <Play size={18} fill="currentColor" aria-hidden="true" />
      )}
      {icon === "pause" && (
        <Pause size={18} fill="currentColor" aria-hidden="true" />
      )}
      {icon === "close" && <X size={18} aria-hidden="true" />}
    </button>
  );
}
