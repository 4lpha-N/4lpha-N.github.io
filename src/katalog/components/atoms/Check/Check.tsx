import { Check, Dot } from "lucide-react";
import type { SimpleVariant } from "../../../lib/types";
import { cx } from "../../../lib/cx";
import "./Check.scss";

export function VlCheck({
  variant,
  label,
  defaultChecked,
  checked,
  onChange,
  disabled,
  radio,
  name,
  value,
  hideLabel,
}: {
  variant: SimpleVariant;
  label: string;
  defaultChecked?: boolean;
  // Gesteuerter Modus: Zustand liegt beim Aufrufer
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  // Radio statt Checkbox: gleiche Komponente, Achteck mit Punkt
  radio?: boolean;
  name?: string;
  value?: string;
  // Beschriftung nur für Screenreader und als Tooltip
  hideLabel?: boolean;
}) {
  return (
    <label
      title={hideLabel ? label : undefined}
      className={cx(
        "vl-check",
        `vl-check--${variant}`,
        radio && "vl-check--radio",
        disabled && "is-disabled",
      )}
    >
      <input
        type={radio ? "radio" : "checkbox"}
        className="vl-check__input"
        name={name}
        value={value}
        {...(checked === undefined
          ? { defaultChecked }
          : { checked, onChange: (e) => onChange?.(e.target.checked) })}
        disabled={disabled}
      />
      <span className="vl-check__box" aria-hidden="true">
        {radio ? (
          <Dot className="vl-check__tick" size={24} strokeWidth={6} />
        ) : (
          <Check className="vl-check__tick" size={16} strokeWidth={3} />
        )}
      </span>
      <span
        className={cx("vl-check__label", hideLabel && "vl-check__label--sr")}
      >
        {label}
      </span>
    </label>
  );
}
