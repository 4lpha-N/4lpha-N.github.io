// Einblenden beim Scrollen in den Viewport; einmalig, ohne Animation bei reduzierter Bewegung
export function reveal(reduceMotion: boolean | null, delay = 0) {
  if (reduceMotion) return {};
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -8% 0px" },
    transition: { duration: 0.45, ease: "easeOut" as const, delay },
  };
}
