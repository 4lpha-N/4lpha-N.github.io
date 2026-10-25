// Nummerierte, farbige Platzhalterbilder (01-50, Unterbilder 01-1, 01-2); feste Farben, da es Bilder und keine Theme-Elemente sind
export const productImage = (bild: string) => {
  const [base, sub] = bild.split("-");
  const n = Number(base);
  const v = Number(sub ?? 0);
  const hue = (n * 47 + v * 40) % 360;
  const m = n + v;
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><defs><linearGradient id="g" x1="${m % 2}" y1="0" x2="${(m + 1) % 2}" y2="1"><stop offset="0" stop-color="#0f1923"/><stop offset="1" stop-color="hsl(${hue} 70% 48%)"/></linearGradient></defs><rect width="640" height="480" fill="url(#g)"/><text x="36" y="440" font-family="sans-serif" font-size="190" font-weight="700" fill="#ece8e1" fill-opacity=".14">${bild}</text><g transform="translate(${(m % 3) * 70 - 70} 40)" fill="none" stroke="#ece8e1" stroke-opacity=".3" stroke-width="2"><polygon points="320,60 440,130 440,230 320,300 200,230 200,130"/><polygon points="320,100 405,150 405,210 320,260 235,210 235,150"/></g></svg>`,
    )
  );
};

// Hauptbild plus zwei Unterbilder
export const productImages = (bild: string) => [bild, `${bild}-1`, `${bild}-2`];
