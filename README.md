# ASCIIR

<p align="center">
  <img src="https://img.shields.io/npm/v/asciir?color=blue&label=npm" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/asciir?color=green" alt="npm downloads" />
  <img src="https://img.shields.io/bundlephobia/minzip/asciir?color=orange" alt="bundle size" />
  <img src="https://img.shields.io/github/license/YOUR_USERNAME/asciir?color=purple" alt="license" />
  <img src="https://img.shields.io/npm/types/asciir?color=blue" alt="TypeScript" />
</p>

<p align="center">
  <strong>A powerful React component for converting images to beautiful ASCII art</strong>
</p>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#api-reference">API</a> •
  <a href="#examples">Examples</a>
</p>

---

## ✨ Features

- 🎨 **Multiple Color Modes** - Monochrome, Original colors, or custom palettes
- 📝 **Custom Character Sets** - Use preset or custom character ramps
- 🎛️ **Image Filters** - Brightness, contrast, and saturation controls
- 🔲 **Dithering** - Floyd-Steinberg dithering for better gradients
- 📦 **Multiple Output Formats** - HTML, SVG, or Canvas
- 💾 **Export Options** - Download as PNG, SVG, or TXT
- 🎯 **TypeScript** - Full type definitions included
- ⚡ **Lightweight** - ~5KB gzipped, zero runtime dependencies

## 📦 Installation

```bash
npm install asciir
```

```bash
yarn add asciir
```

```bash
pnpm add asciir
```

## 🚀 Quick Start

```tsx
import { ASCIIR } from 'asciir';

function App() {
  return (
    <ASCIIR 
      src="/path/to/image.jpg"
      config={{ 
        resolutionWidth: 100,
        colorMode: 'original' 
      }}
    />
  );
}
```

## 📖 API Reference

### `<ASCIIR />` Component

The main component for rendering ASCII art.

```tsx
import { ASCIIR, useASCIIRender } from 'asciir';

function App() {
  const asciiRef = useASCIIRender();
  
  return (
    <div>
      <ASCIIR 
        ref={asciiRef}
        src={imageSource}
        config={config}
        output="html"
        onGenerate={(result) => console.log(result)}
        onError={(error) => console.error(error)}
      />
      
      <button onClick={() => asciiRef.current?.downloadPNG()}>
        Download PNG
      </button>
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string \| File \| Blob \| HTMLImageElement` | Required | Image source |
| `config` | `Partial<ASCIIRenderConfig>` | `{}` | Configuration overrides |
| `output` | `'html' \| 'svg' \| 'canvas'` | `'html'` | Output format |
| `onGenerate` | `(result: ProcessingResult) => void` | - | Callback when ASCII is generated |
| `onError` | `(error: Error) => void` | - | Error callback |
| `className` | `string` | - | Container CSS class |
| `style` | `CSSProperties` | - | Container inline styles |
| `autoFit` | `boolean` | `false` | Auto-fit to container width |

### Configuration Options

```typescript
interface ASCIIRenderConfig {
  resolutionWidth: number;      // Width in characters (default: 150)
  characterSet: string;         // Character ramp (default: " .:-=+*#%@")
  inverted: boolean;            // Invert character ramp (default: false)
  contrastStretch: boolean;     // Auto contrast (default: true)
  fontColor: string;            // Text color for mono mode (default: "#FFFFFF")
  backgroundColor: string;      // Background color (default: "#242424")
  lineHeight: number;           // Line height multiplier (default: 1.0)
  scaleRatio: number;           // Vertical scale ratio (default: 0.55)
  fontSize: number;             // Font size in px (default: 12)
  transparentBackground: boolean; // Transparent bg (default: false)
  dithering: boolean;           // Enable dithering (default: false)
  colorMode: 'mono' | 'original' | 'palette'; // Color mode (default: 'mono')
  fontFamily: string;           // Font family (default: "'Fira Code', monospace")
  exportScale: number;          // PNG export scale (default: 2)
  fillTransparency: boolean;    // Fill transparent areas (default: true)
  brightness: number;           // Brightness 0-3 (default: 1.0)
  contrast: number;             // Contrast 0-3 (default: 1.0)
  saturation: number;           // Saturation 0-3 (default: 1.0)
  colorPalette: string[];       // Color palette for palette mode
}
```

### Ref Methods

```typescript
interface ASCIIRenderRef {
  getResult(): ProcessingResult | null;
  downloadPNG(filename?: string): void;
  downloadSVG(filename?: string): void;
  downloadTXT(filename?: string): void;
  copyToClipboard(): Promise<void>;
  getCanvas(scale?: number): HTMLCanvasElement | null;
  getSVGString(): string | null;
  refresh(): void;
}
```

### Presets

```tsx
import { 
  CHAR_SETS,      // Character set presets
  FONTS,          // Font presets
  PALETTE_PRESETS // Color palette presets
} from 'asciir';

// Character sets
CHAR_SETS.default        // " .:-=+*#%@"
CHAR_SETS.standard_short // "@%#*+=-:. "
CHAR_SETS.blocks         // "█▓▒░ "
CHAR_SETS.binary         // "01 "
CHAR_SETS.matrix         // Matrix/Katakana style

// Fonts
FONTS.fira      // 'Fira Code', monospace
FONTS.vt323     // 'VT323', monospace (retro)
FONTS.roboto    // 'Roboto Mono', monospace

// Color palettes
PALETTE_PRESETS.cga       // CGA colors
PALETTE_PRESETS.gameboy   // GameBoy green
PALETTE_PRESETS.vaporwave // Vaporwave aesthetic
```

### Utility Functions

For advanced usage, you can use the core functions directly:

```tsx
import { 
  generateAscii,
  generateCanvasFromAscii,
  generateSVG,
  generateHTML,
  loadImage 
} from 'asciir';

// Load and process an image
const img = await loadImage('/path/to/image.jpg');
const result = generateAscii(img, config);

// Generate outputs
const svg = generateSVG(result, config);
const html = generateHTML(result, config);
const canvas = generateCanvasFromAscii(result, config, 2);
```

## 📋 Examples

### Basic Usage

```tsx
<ASCIIR src="/image.jpg" />
```

### Colored ASCII Art

```tsx
<ASCIIR 
  src="/image.jpg"
  config={{
    colorMode: 'original',
    resolutionWidth: 120
  }}
/>
```

### Custom Palette

```tsx
import { ASCIIR, PALETTE_PRESETS } from 'asciir';

<ASCIIR 
  src="/image.jpg"
  config={{
    colorMode: 'palette',
    colorPalette: PALETTE_PRESETS.vaporwave
  }}
/>
```

### With Downloads

```tsx
import { ASCIIR, useASCIIRender } from 'asciir';

function App() {
  const ref = useASCIIRender();
  
  return (
    <>
      <ASCIIR ref={ref} src="/image.jpg" />
      <button onClick={() => ref.current?.downloadPNG('my-art.png')}>
        Save as PNG
      </button>
    </>
  );
}
```

### File Upload

```tsx
import { useState } from 'react';
import { ASCIIR } from 'asciir';

function App() {
  const [file, setFile] = useState<File | null>(null);
  
  return (
    <>
      <input 
        type="file" 
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      {file && <ASCIIR src={file} />}
    </>
  );
}
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/asciir.git
cd asciir

# Install dependencies
npm install

# Run the demo app
npm run dev

# Build the library
npm run build:lib

# Type checking
npm run typecheck
```

## 📦 Building for Production

```bash
# Build library only (for npm publish)
npm run build:lib

# Build demo application
npm run build:demo
```

## 📝 License

MIT © Vinay

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!
