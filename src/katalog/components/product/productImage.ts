// Nummerierte, farbige Platzhalterbilder (01-50); feste Farben, da es Bilder und keine Theme-Elemente sind
export const productImage = (bild: string) => {
  const n = Number(bild);
  const hue = (n * 47) % 360;
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><defs><linearGradient id="g" x1="${n % 2}" y1="0" x2="${(n + 1) % 2}" y2="1"><stop offset="0" stop-color="#0f1923"/><stop offset="1" stop-color="hsl(${hue} 70% 48%)"/></linearGradient></defs><rect width="640" height="480" fill="url(#g)"/><text x="36" y="440" font-family="sans-serif" font-size="190" font-weight="700" fill="#ece8e1" fill-opacity=".14">${bild}</text><g transform="translate(${(n % 3) * 70 - 70} 40)" fill="none" stroke="#ece8e1" stroke-opacity=".3" stroke-width="2"><polygon points="320,60 440,130 440,230 320,300 200,230 200,130"/><polygon points="320,100 405,150 405,210 320,260 235,210 235,150"/></g></svg>`,
    )
  );
};
