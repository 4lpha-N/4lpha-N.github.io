export const NAV_ITEMS = [
  { to: "/", label: "Start", end: true },
  { to: "/Produkte", label: "Produkte", end: false },
  { to: "/Demo", label: "Demo", end: false },
];

// Position in der Navigation (Index) und Tiefe im Pfad
function navPos(pathname: string) {
  const i = NAV_ITEMS.findIndex((n) =>
    n.end
      ? pathname === n.to
      : pathname === n.to || pathname.startsWith(`${n.to}/`),
  );
  return {
    index: i === -1 ? NAV_ITEMS.length : i,
    depth: pathname.split("/").filter(Boolean).length,
  };
}

export type DoorDir = "right" | "left" | "down" | "up";

// Innerhalb eines Navigationspunkts: tiefer = nach unten, höher = nach oben; sonst rechts/links analog zur Navigation
export function navDirection(from: string, to: string): DoorDir {
  const a = navPos(from);
  const b = navPos(to);
  if (a.index === b.index && a.depth !== b.depth) {
    return b.depth > a.depth ? "down" : "up";
  }
  return b.index >= a.index ? "right" : "left";
}
