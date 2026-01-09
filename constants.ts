export const CHAR_SETS = {
  custom_vinay: " .vinay", 
  standard_short: "@%#*+=-:. ",
  standard_long: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
  blocks: "█▓▒░ ",
  binary: "01 ",
  minimal: "#. ",
  matrix: "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ123457890:・.=*+-<>¦｜"
};

export const FONTS = {
  fira: "'Fira Code', monospace",
  vt323: "'VT323', monospace",
  roboto: "'Roboto Mono', monospace",
  source: "'Source Code Pro', monospace",
  courier: "'Courier New', monospace",
};

// Approximate width/height ratio for each font
export const FONT_RATIOS: Record<string, number> = {
  [FONTS.fira]: 0.6,
  [FONTS.vt323]: 0.5, 
  [FONTS.roboto]: 0.6,
  [FONTS.source]: 0.6,
  [FONTS.courier]: 0.6,
};

export const PALETTE_PRESETS = {
  retro_term: ["#000000", "#00ff00", "#008800"],
  gameboy: ["#0f380f", "#306230", "#8bac0f", "#9bbc0f"],
  cga: ["#000000", "#555555", "#ffffff", "#ff5555", "#ff55ff", "#55ffff"],
  vaporwave: ["#ff71ce", "#01cdfe", "#05ffa1", "#b967ff", "#fffb96", "#000000"],
  grayscale: ["#000000", "#333333", "#666666", "#999999", "#cccccc", "#ffffff"],
  amoled: ["#000000", "#ffffff"],
};

export const DEFAULT_CONFIG = {
  resolutionWidth: 150,
  characterSet: CHAR_SETS.custom_vinay,
  inverted: false,
  contrastStretch: true,
  fontColor: "#FFFFFF",
  backgroundColor: "#242424", 
  lineHeight: 1.0, 
  scaleRatio: 0.55, 
  fontSize: 12,
  // New Defaults
  transparentBackground: false,
  dithering: false,
  colorMode: 'mono' as const,
  fontFamily: FONTS.fira,
  exportScale: 2, 
  fillTransparency: true,
  // Filters
  brightness: 1.0,
  contrast: 1.0,
  saturation: 1.0,
  // Palette
  colorPalette: PALETTE_PRESETS.cga,
};
