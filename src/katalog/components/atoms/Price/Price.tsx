import { cx } from "../../../lib/cx";
import "./Price.scss";

const TEXT: Record<
  string,
  { from: string; gross: string; net: string; was: string }
> = {
  de: { from: "ab", gross: "inkl. MwSt.", net: "zzgl. MwSt.", was: "statt" },
  en: { from: "from", gross: "incl. VAT", net: "excl. VAT", was: "was" },
  fr: { from: "à partir de", gross: "TTC", net: "HT", was: "au lieu de" },
};

export function Price({
  value,
  tax = "gross",
  vat = 0.19,
  strike,
  from,
  locale = "de-DE",
  currency = "EUR",
}: {
  value: number;
  // Basis von value und strike: brutto (inkl. MwSt.) oder netto (zzgl. MwSt.)
  tax?: "gross" | "net";
  // MwSt.-Satz zur Umrechnung, z. B. 0.19
  vat?: number;
  // durchgestrichener Altpreis
  strike?: number;
  // "ab"-Preis
  from?: boolean;
  // Sprache und Land: steuert Zahlenformat und Beschriftung
  locale?: string;
  currency?: string;
}) {
  const t = TEXT[locale.split("-")[0]] ?? TEXT.de;
  const fmt = new Intl.NumberFormat(locale, { style: "currency", currency });
  const toGross = (v: number) =>
    Math.round((tax === "gross" ? v : v * (1 + vat)) * 100) / 100;
  const toNet = (v: number) =>
    Math.round((tax === "net" ? v : v / (1 + vat)) * 100) / 100;
  return (
    <div className={cx("vl-price", strike !== undefined && "is-sale")}>
      <div className="vl-price__row">
        {strike !== undefined && (
          <span className="vl-price__strike">
            <span className="vl-price__sr">{t.was} </span>
            <s>{fmt.format(toGross(strike))}</s>
          </span>
        )}
        <span className="vl-price__main">
          {from && <span className="vl-price__from">{t.from}</span>}
          <strong className="vl-price__value">
            {fmt.format(toGross(value))}
          </strong>
        </span>
        <span className="vl-price__tax">{t.gross}</span>
      </div>
      <div className="vl-price__net">
        {fmt.format(toNet(value))} {t.net}
      </div>
    </div>
  );
}
