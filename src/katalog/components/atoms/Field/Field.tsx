import { useId, useRef } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";
import type { Variant } from "../../../lib/types";
import "./Field.scss";

interface FieldProps {
  variant: Variant;
  label: string;
  hint?: string;
  error?: boolean;
  disabled?: boolean;
}

function fieldClass(variant: Variant, error?: boolean, disabled?: boolean) {
  return [
    "vl-field",
    `vl-field--${variant}`,
    error ? "is-error" : "",
    disabled ? "is-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function VlInput({
  variant,
  label,
  hint,
  error,
  disabled,
  placeholder,
  defaultValue,
  value,
  onChange,
  type = "text",
  min,
  max,
  step,
}: FieldProps & {
  placeholder?: string;
  defaultValue?: string;
  // Gesteuerter Modus: Wert liegt beim Aufrufer
  value?: string;
  onChange?: (value: string) => void;
  // Native Tastatur und Validierung; bei number mit eigenen +/- Schaltern
  type?: "text" | "email" | "tel" | "number" | "search";
  min?: number;
  max?: number;
  step?: number;
}) {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);
  const isNumber = type === "number";

  // stepUp/stepDown beachten min, max und step; input-Event hält Aufrufer-Listener aktuell
  const stepBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    if (dir > 0) el.stepUp();
    else el.stepDown();
    el.dispatchEvent(new Event("input", { bubbles: true }));
  };

  return (
    <div className={fieldClass(variant, error, disabled)}>
      <label className="vl-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="vl-field__box">
        <input
          ref={ref}
          id={id}
          type={type}
          className={`vl-field__control${isNumber ? " vl-field__control--number" : ""}`}
          placeholder={placeholder}
          {...(value === undefined
            ? { defaultValue }
            : { value, onChange: (e) => onChange?.(e.target.value) })}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-invalid={error || undefined}
        />
        {isNumber && (
          <div className="vl-field__steps">
            <button
              type="button"
              className="vl-field__step"
              aria-label="Verringern"
              tabIndex={-1}
              disabled={disabled}
              onClick={() => stepBy(-1)}
            >
              <Minus size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="vl-field__step"
              aria-label="Erhöhen"
              tabIndex={-1}
              disabled={disabled}
              onClick={() => stepBy(1)}
            >
              <Plus size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      {hint && <span className="vl-field__hint">{hint}</span>}
    </div>
  );
}

export function VlSelect({
  variant,
  label,
  hint,
  error,
  disabled,
  options,
  value,
  onChange,
}: FieldProps & {
  // Ohne options: Beispiel-Auswahl der Demo
  options?: { value: string; label: string }[];
  // Gesteuerter Modus: Auswahl liegt beim Aufrufer
  value?: string;
  onChange?: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className={fieldClass(variant, error, disabled)}>
      <label className="vl-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="vl-field__box vl-field__box--select">
        <select
          id={id}
          className="vl-field__control vl-field__control--select"
          {...(value === undefined
            ? { defaultValue: "" }
            : { value, onChange: (e) => onChange?.(e.target.value) })}
          disabled={disabled}
          aria-invalid={error || undefined}
        >
          {options ? (
            options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))
          ) : (
            <>
              <option value="" disabled>
                Bitte wählen
              </option>
              <option value="1">Auswahl 1</option>
              <option value="2">Auswahl 2</option>
              <option value="3">Auswahl 3</option>
            </>
          )}
        </select>
        <ChevronDown className="vl-field__caret" size={18} aria-hidden="true" />
      </div>
      {hint && <span className="vl-field__hint">{hint}</span>}
    </div>
  );
}
