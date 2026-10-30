import "./SegToggle.scss";

export function SegToggle<T extends string | number>({
  options,
  value,
  onChange,
  label,
  compact,
}: {
  // swatch: Farbpunkt statt Text (Modifier von .vl-toggle__dot), label dient dann als Name
  options: { id: T; label: string; swatch?: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`vl-toggle${compact ? " vl-toggle--compact" : ""}`}
      role="group"
      aria-label={label}
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={`vl-toggle__btn${o.swatch ? " vl-toggle__btn--swatch" : ""}${value === o.id ? " is-active" : ""}`}
          aria-pressed={value === o.id}
          aria-label={o.swatch ? o.label : undefined}
          title={o.swatch ? o.label : undefined}
          onClick={() => onChange(o.id)}
        >
          {o.swatch ? (
            <span
              className={`vl-toggle__dot vl-toggle__dot--${o.swatch}`}
              aria-hidden="true"
            />
          ) : (
            o.label
          )}
        </button>
      ))}
    </div>
  );
}
