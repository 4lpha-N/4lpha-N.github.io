import { useId } from "react";
import type { SimpleVariant } from "../../../lib/types";
import { VlCheck } from "../Check/Check";
import "./Radio.scss";

export function VlRadioGroup({
  variant,
  label,
  options,
  defaultValue,
  value,
  onChange,
  disabled,
}: {
  variant: SimpleVariant;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[];
  defaultValue?: string;
  // Gesteuerter Modus: Auswahl liegt beim Aufrufer
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}) {
  const name = useId();
  return (
    <div className="vl-radios" role="radiogroup" aria-labelledby={`${name}-l`}>
      <span id={`${name}-l`} className="vl-radios__label">
        {label}
      </span>
      {options.map((o) => (
        <VlCheck
          key={o.value}
          radio
          variant={variant}
          name={name}
          value={o.value}
          label={o.label}
          {...(value === undefined
            ? { defaultChecked: o.value === defaultValue }
            : {
                checked: o.value === value,
                onChange: (c: boolean) => c && onChange?.(o.value),
              })}
          disabled={disabled || o.disabled}
        />
      ))}
    </div>
  );
}
