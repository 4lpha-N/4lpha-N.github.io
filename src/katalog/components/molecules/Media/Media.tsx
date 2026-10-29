import type { ReactNode } from "react";
import type { PlainVariant } from "../../../lib/types";
import { cx } from "../../../lib/cx";
import "./Media.scss";

export interface MediaItem {
  eyebrow?: ReactNode;
  title: string;
  text: ReactNode;
  media: ReactNode;
  actions?: ReactNode;
}

type Single = Omit<MediaItem, "text"> & {
  children: ReactNode;
  items?: undefined;
};

type Stack = { items: MediaItem[] };

// Ein Eintrag über Props, mehrere über items: gemeinsamer Rahmen, das Bild wechselt je Zeile die Seite
export function VlMedia({
  variant,
  side = "left",
  ...props
}: {
  variant: PlainVariant;
  // Seite des Bildes in der ersten Zeile
  side?: "left" | "right";
} & (Single | Stack)) {
  const rows: MediaItem[] = props.items
    ? props.items
    : [
        {
          eyebrow: props.eyebrow,
          title: props.title,
          text: props.children,
          media: props.media,
          actions: props.actions,
        },
      ];
  const other = side === "left" ? "right" : "left";

  return (
    <article className={cx("vl-media", `vl-media--${variant}`)}>
      {rows.map((r, i) => (
        <div
          key={i}
          className={cx(
            "vl-media__row",
            `vl-media__row--${i % 2 === 0 ? side : other}`,
            i === 0 && "is-first",
            i === rows.length - 1 && "is-last",
          )}
        >
          <div className="vl-media__body">
            {r.eyebrow}
            <h3 className="vl-media__title">{r.title}</h3>
            <p className="vl-media__text">{r.text}</p>
            {r.actions && <div className="vl-media__actions">{r.actions}</div>}
          </div>
          <div className="vl-media__media">{r.media}</div>
        </div>
      ))}
    </article>
  );
}
