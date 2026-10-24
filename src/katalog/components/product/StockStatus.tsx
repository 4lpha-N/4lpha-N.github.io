import { CircleCheck, CircleX, TriangleAlert } from "lucide-react";
import type { Stock } from "./productData";
import "./StockStatus.scss";

const STATES = {
  "auf-lager": { label: "Auf Lager", Icon: CircleCheck },
  wenige: { label: "Nur noch wenige verfügbar", Icon: TriangleAlert },
  ausverkauft: { label: "Ausverkauft", Icon: CircleX },
} as const;

export function StockStatus({ stock }: { stock: Stock }) {
  const { label, Icon } = STATES[stock];
  return (
    <span className={`vl-stock vl-stock--${stock}`}>
      <Icon size={16} aria-hidden="true" />
      {label}
    </span>
  );
}
