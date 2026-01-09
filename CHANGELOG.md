# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-09

### Added

- Initial release of ASCIIRender
- `<ASCIIRender />` React component for converting images to ASCII art
- Support for multiple output formats: HTML, SVG, Canvas
- Color modes: Mono, Original, and Palette
- Customizable character sets with presets
- Image filters: Brightness, Contrast, Saturation
- Floyd-Steinberg dithering support
- Auto contrast stretching
- Transparent background support
- Multiple font presets (Fira Code, VT323, Roboto Mono, etc.)
- Color palette presets (CGA, GameBoy, Vaporwave, etc.)
- Export functionality: PNG, SVG, TXT
- Copy to clipboard support
- `useASCIIRender` hook for imperative access
- TypeScript support with full type definitions
- Utility functions for advanced usage:
  - `generateAscii()`
  - `generateCanvasFromAscii()`
  - `generateSVG()`
  - `generateHTML()`
- Demo application with interactive controls

### Technical

- Built with React 17+ support
- ES modules and CommonJS builds
- Tree-shakeable exports
- Source maps included
- Comprehensive JSDoc documentation
