// Anzahl muss zu den Varianten in layout/Door/Door.scss passen
export const DOOR_VARIANT_OPTIONS = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  label: String(i + 1),
}));
