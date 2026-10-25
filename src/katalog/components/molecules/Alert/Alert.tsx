import type { ReactNode } from "react";
import { X } from "lucide-react";
import type { Tone } from "../../../lib/tones";
import { TONES } from "../../../lib/tones";
import "./Alert.scss";

export function VlAlert({
  tone,
  title,
  children,
  onClose,
  live = true,
  action,
  extra,
}: {
  tone: Tone;
  title: string;
  children: ReactNode;
  onClose?: () => void;
  // false, wenn ein umgebender Live-Bereich (Toast-Host) die Ansage übernimmt
  live?: boolean;
  action?: { label: string; onClick: () => void };
  extra?: ReactNode;
}) {
  const Icon = TONES.find((t) => t.id === tone)?.icon;
  return (
    <div
      className={`vl-alert vl-alert--${tone}`}
      role={live ? (tone === "warn" ? "alert" : "status") : undefined}
    >
      <span className="vl-alert__icon" aria-hidden="true">
        {Icon && <Icon size={24} />}
      </span>
      <div className="vl-alert__body">
        <strong className="vl-alert__title">{title}</strong>
        <p className="vl-alert__text">{children}</p>
        {action && (
          <button
            type="button"
            className="vl-alert__action"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          className="vl-x"
          aria-label="Schließen"
          onClick={onClose}
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
      {extra}
    </div>
  );
}
