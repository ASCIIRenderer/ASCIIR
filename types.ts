export interface AsciiConfig {
  resolutionWidth: number;
  characterSet: string;
  inverted: boolean;
  contrastStretch: boolean; 
  fontColor: string;
  backgroundColor: string;
  lineHeight: number;
  scaleRatio: number; 
  fontSize: number; 
  // New Features
  transparentBackground: boolean;
  dithering: boolean;
  colorMode: 'mono' | 'original' | 'palette';
  fontFamily: string;
  exportScale: number;
  fillTransparency: boolean; 
  // Filters
  brightness: number;
  contrast: number;
  saturation: number;
  // Palette
  colorPalette: string[];
}

export interface ProcessingResult {
  text: string;
  lines: string[];
  width: number;
  height: number;
  // Store full color data for "Original" mode
  // We store it as a flat array of RGBA strings or objects corresponding to chars
  colorData?: Uint8ClampedArray; 
}