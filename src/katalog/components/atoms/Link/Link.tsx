import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import type { SimpleVariant } from "../../../lib/types";
import "./Link.scss";

export function VlLink({
  variant,
  children,
  disabled,
}: {
  variant: SimpleVariant;
  children: ReactNode;
  disabled?: boolean;
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
  return (
    <a className={className} href="#" onClick={(e) => e.preventDefault()}>
      {content}
    </a>
  );
}
