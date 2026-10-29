import type { SimpleVariant } from "../../../lib/types";
import "./Switch.scss";

export function VlSwitch({
  variant,
  label,
  defaultChecked,
  checked,
  onChange,
  disabled,
}: {
  variant: SimpleVariant;
  label: string;
  defaultChecked?: boolean;
  // Gesteuerter Modus: Zustand liegt beim Aufrufer
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={`vl-switch vl-switch--${variant}${disabled ? " is-disabled" : ""}`}
    >
      <input
        type="checkbox"
        role="switch"
        className="vl-switch__input"
        {...(checked === undefined
          ? { defaultChecked }
          : { checked, onChange: (e) => onChange?.(e.target.checked) })}
        disabled={disabled}
      />
      <span className="vl-switch__track" aria-hidden="true" />
      <span className="vl-switch__label">{label}</span>
    </label>
  );
}
