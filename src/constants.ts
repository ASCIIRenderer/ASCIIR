import { ASCIIRenderConfig } from './types';

/**
 * Predefined character sets for ASCII art generation
 */
export const CHAR_SETS = {
  /** Default character set */
  default: " .vinay",
  /** Standard short character set */
  standard_short: "@%#*+=-:. ",
  /** Standard long character set with more detail */
  standard_long: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
  /** Unicode block shades */
  blocks: "█▓▒░ ",
  /** Binary style */
  binary: "01 ",
  /** Minimal contrast */
  minimal: "#. ",
  /** Matrix/Katakana style */
  matrix: "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ123457890:・.=*+-<>¦｜"
} as const;

/**
 * Predefined monospace font families
 */
export const FONTS = {
  fira: "'Fira Code', monospace",
  vt323: "'VT323', monospace",
  roboto: "'Roboto Mono', monospace",
  source: "'Source Code Pro', monospace",
  courier: "'Courier New', monospace",
} as const;

/**
 * Approximate width/height ratio for each font
 */
export const FONT_RATIOS: Record<string, number> = {
  [FONTS.fira]: 0.6,
  [FONTS.vt323]: 0.5,
  [FONTS.roboto]: 0.6,
  [FONTS.source]: 0.6,
  [FONTS.courier]: 0.6,
};

/**
 * Predefined color palettes for palette mode
 */
export const PALETTE_PRESETS = {
  /** Classic terminal green */
  retro_term: ["#000000", "#00ff00", "#008800"],
  /** Game Boy 4-color palette */
  gameboy: ["#0f380f", "#306230", "#8bac0f", "#9bbc0f"],
  /** CGA 16-color palette (subset) */
  cga: ["#000000", "#555555", "#ffffff", "#ff5555", "#ff55ff", "#55ffff"],
  /** Vaporwave aesthetic */
  vaporwave: ["#ff71ce", "#01cdfe", "#05ffa1", "#b967ff", "#fffb96", "#000000"],
  /** Grayscale gradient */
  grayscale: ["#000000", "#333333", "#666666", "#999999", "#cccccc", "#ffffff"],
  /** AMOLED high contrast */
  amoled: ["#000000", "#ffffff"],
} as const;

/**
 * Default configuration for ASCII art generation
 */
export const DEFAULT_CONFIG: ASCIIRenderConfig = {
  resolutionWidth: 150,
  characterSet: CHAR_SETS.default,
  inverted: false,
  contrastStretch: true,
  fontColor: "#FFFFFF",
  backgroundColor: "#242424",
  lineHeight: 1.0,
  scaleRatio: 0.55,
  fontSize: 12,
  transparentBackground: false,
  dithering: false,
  colorMode: 'mono',
  fontFamily: FONTS.fira,
  exportScale: 2,
  fillTransparency: true,
  brightness: 1.0,
  contrast: 1.0,
  saturation: 1.0,
  colorPalette: [...PALETTE_PRESETS.cga],
};
