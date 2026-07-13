const COLOR_HEX: Record<string, string> = {
  black: "#1a1a1a",
  "vintage black": "#3a3632",
  white: "#f5f5f5",
  olive: "#5f6b4f",
  coffee: "#3b2a20",
  bone: "#e4dcc8",
  orange: "#d8481e",
  sand: "#d8cbae",
};

export function colorToHex(color: string, fallback?: string) {
  return COLOR_HEX[color.toLowerCase()] ?? fallback ?? "#999999";
}
