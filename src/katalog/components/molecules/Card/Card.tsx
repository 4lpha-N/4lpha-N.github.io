import type { ReactNode } from "react";
import type { Variant } from "../../../lib/types";
import { cx } from "../../../lib/cx";
import "./Card.scss";

export function VlCard({
  variant,
  eyebrow,
  title,
  children,
  media,
  footer,
  interactive,
  href,
  renderLink,
}: {
  variant: Variant;
  eyebrow?: ReactNode;
  title: string;
  children: ReactNode;
  media?: ReactNode;
  footer?: ReactNode;
  // ganze Karte als Link klickbar
  interactive?: boolean;
  // Ziel der klickbaren Karte; ohne: Platzhalter-Link
  href?: string;
  // eigener Link (z. B. Router-Link); ohne: normales a-Tag
  renderLink?: (props: {
    className: string;
    href: string;
    children: ReactNode;
  }) => ReactNode;
}) {
  return (
    <article
      className={cx(
        "vl-card",
        `vl-card--${variant}`,
        interactive && "is-interactive",
      )}
    >
      {media && <div className="vl-card__media">{media}</div>}
      <div className="vl-card__body">
        {eyebrow}
        <h3 className="vl-card__title">
          {interactive ? (
            href && renderLink ? (
              renderLink({ className: "vl-card__link", href, children: title })
            ) : (
              <a
                className="vl-card__link"
                href={href ?? "#"}
                onClick={href ? undefined : (e) => e.preventDefault()}
              >
                {title}
              </a>
            )
          ) : (
            title
          )}
        </h3>
        <p className="vl-card__text">{children}</p>
      </div>
      {footer && <div className="vl-card__foot">{footer}</div>}
    </article>
  );
}
