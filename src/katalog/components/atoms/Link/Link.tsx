import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import type { SimpleVariant } from "../../../lib/types";
import "./Link.scss";

export function VlLink({
  variant,
  children,
  disabled,
  href,
  renderLink,
  onClick,
}: {
  variant: SimpleVariant;
  children: ReactNode;
  disabled?: boolean;
  // Ziel des Links; ohne: Platzhalter-Link
  href?: string;
  // eigener Link (z. B. Router-Link); ohne: normales a-Tag
  renderLink?: (props: {
    className: string;
    href: string;
    children: ReactNode;
    onClick?: () => void;
  }) => ReactNode;
  onClick?: () => void;
}) {
  const className = `vl-link vl-link--${variant}${disabled ? " is-disabled" : ""}`;
  const content = (
    <>
      {children}
      <ChevronRight className="vl-link__icon" size={16} aria-hidden="true" />
    </>
  );
  if (disabled) {
    return (
      <a className={className} role="link" aria-disabled="true">
        {content}
      </a>
    );
  }
  if (href && renderLink) {
    return <>{renderLink({ className, href, children: content, onClick })}</>;
  }
  return (
    <a
      className={className}
      href={href ?? "#"}
      onClick={(e) => {
        if (!href) e.preventDefault();
        onClick?.();
      }}
    >
      {content}
    </a>
  );
}
