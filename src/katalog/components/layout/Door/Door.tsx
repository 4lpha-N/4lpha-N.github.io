import { cx } from "../../../lib/cx";
import type { DoorDir } from "../../../lib/nav";
import "./Door.scss";

// Vollflächige Wechsel-Animation über der Seite; Zeitsteuerung liegt in lib/useDoor
export function Door({
  variant,
  closed,
  logo,
  dir = "right",
}: {
  variant: number;
  closed: boolean;
  logo: boolean;
  dir?: DoorDir;
}) {
  return (
    <div
      className={cx(
        "vl-door",
        `vl-door--${variant}`,
        closed && "is-closed",
        logo && "has-logo",
        `is-${dir}`,
      )}
      aria-hidden="true"
    >
      <div className="vl-door__panels">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className={`vl-door__panel vl-door__panel--${n}`} />
        ))}
      </div>
      <div className="vl-door__logo">
        4lpha
        <span className="vl-door__bar" />
      </div>
    </div>
  );
}
