/**
 * Configuration options for ASCII art generation
 */
export interface ASCIIRenderConfig {
  /** Width of output in characters (columns). Default: 150 */
  resolutionWidth: number;
  /** Character set for ASCII mapping (dark to light). Default: " .:-=+*#%@" */
  characterSet: string;
  /** Whether to invert the character ramp. Default: false */
  inverted: boolean;
  /** Apply auto contrast stretching. Default: true */
  contrastStretch: boolean;
  /** Font/text color for mono mode. Default: "#FFFFFF" */
  fontColor: string;
  /** Background color. Default: "#242424" */
  backgroundColor: string;
  /** Line height multiplier. Default: 1.0 */
  lineHeight: number;
  /** Vertical scale ratio (to correct aspect ratio). Default: 0.55 */
  scaleRatio: number;
  /** Auto-scale ratio based on font height. Default: false */
  autoScaleHeight: boolean;
  /** Font size in pixels. Default: 12 */
  fontSize: number;
  /** Whether background should be transparent. Default: false */
  transparentBackground: boolean;
  /** Apply Floyd-Steinberg dithering. Default: false */
  dithering: boolean;
  /** Color mode: 'mono', 'original', or 'palette'. Default: 'mono' */
  colorMode: 'mono' | 'original' | 'palette';
  /** Font family for rendering. Default: "'Fira Code', monospace" */
  fontFamily: string;
  /** Scale factor for PNG export. Default: 2 */
  exportScale: number;
  /** Fill transparent areas with background color. Default: true */
  fillTransparency: boolean;
  /** Brightness adjustment (0-3). Default: 1.0 */
  brightness: number;
  /** Contrast adjustment (0-3). Default: 1.0 */
  contrast: number;
  /** Saturation adjustment (0-3). Default: 1.0 */
  saturation: number;
  /** Color palette for palette mode. Default: CGA colors */
  colorPalette: string[];
}

/**
 * Result of ASCII art processing
 */
export interface ProcessingResult {
  /** Full ASCII text with newlines */
  text: string;
  /** Array of lines */
  lines: string[];
  /** Width in characters */
  width: number;
  /** Height in lines */
  height: number;
  /** Color data for colored modes (RGBA array) */
  colorData?: Uint8ClampedArray;
}

/**
 * Props for the ASCIIRender component
 */
export interface ASCIIRenderProps {
  /** Image source - can be URL, File, Blob, or HTMLImageElement */
  src: string | File | Blob | HTMLImageElement;
  /** Partial config overrides (all fields optional) */
  config?: Partial<ASCIIRenderConfig>;
  /** Output format: 'html' (default), 'svg', or 'canvas' */
  output?: 'html' | 'svg' | 'canvas';
  /** Callback when ASCII art is generated */
  onGenerate?: (result: ProcessingResult) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
  /** Additional className for the container */
  className?: string;
  /** Additional style for the container */
  style?: React.CSSProperties;
  /** Whether to auto-fit to container width */
  autoFit?: boolean;
}

/**
 * Ref handle for imperative access to ASCIIRender
 */
export interface ASCIIRenderRef {
  /** Get the current processing result */
  getResult: () => ProcessingResult | null;
  /** Download as PNG */
  downloadPNG: (filename?: string) => void;
  /** Download as SVG */
  downloadSVG: (filename?: string) => void;
  /** Download as TXT */
  downloadTXT: (filename?: string) => void;
  /** Copy text to clipboard */
  copyToClipboard: () => Promise<void>;
  /** Get the generated canvas element */
  getCanvas: (scale?: number) => HTMLCanvasElement | null;
  /** Get the SVG string */
  getSVGString: () => string | null;
  /** Re-process the image with current config */
  refresh: () => void;
}
