import { ASCIIRenderConfig, ProcessingResult } from '../types';

/**
 * Read a File as a data URL
 */
export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Load an image from a URL
 */
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Load an image from a Blob
 */
export const loadImageFromBlob = (blob: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const clamp = (val: number) => Math.max(0, Math.min(255, val));

const applyFilters = (data: Uint8ClampedArray, config: ASCIIRenderConfig) => {
  const { brightness, contrast, saturation } = config;

  if (brightness === 1 && contrast === 1 && saturation === 1) return;

  const intercept = 128 * (1 - contrast);

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    // Brightness
    r *= brightness;
    g *= brightness;
    b *= brightness;

    // Contrast
    r = r * contrast + intercept;
    g = g * contrast + intercept;
    b = b * contrast + intercept;

    // Saturation
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    r = gray + saturation * (r - gray);
    g = gray + saturation * (g - gray);
    b = gray + saturation * (b - gray);

    data[i] = clamp(r);
    data[i + 1] = clamp(g);
    data[i + 2] = clamp(b);
  }
};

const findNearestColor = (r: number, g: number, b: number, palette: { r: number, g: number, b: number }[]) => {
  let minDist = Infinity;
  let nearest = palette[0];

  for (const color of palette) {
    const dist = (r - color.r) ** 2 + (g - color.g) ** 2 + (b - color.b) ** 2;
    if (dist < minDist) {
      minDist = dist;
      nearest = color;
    }
  }
  return nearest;
};

/**
 * Generate ASCII art from an HTMLImageElement
 */
export const generateAscii = (
  image: HTMLImageElement,
  config: ASCIIRenderConfig
): ProcessingResult => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) {
    throw new Error('Canvas context not supported');
  }

  const aspect = image.height / image.width;
  const finalWidth = config.resolutionWidth;
  const finalHeight = Math.floor(aspect * finalWidth * config.scaleRatio);

  canvas.width = finalWidth;
  canvas.height = finalHeight;

  ctx.drawImage(image, 0, 0, finalWidth, finalHeight);

  const imageData = ctx.getImageData(0, 0, finalWidth, finalHeight);
  const data = imageData.data;

  const bgRgb = hexToRgb(config.backgroundColor);

  const paletteRgb = config.colorMode === 'palette'
    ? config.colorPalette.map(hexToRgb)
    : [];

  // Transparency Blending
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (config.fillTransparency && a < 255) {
      const alpha = a / 255;
      data[i] = Math.round(data[i] * alpha + bgRgb.r * (1 - alpha));
      data[i + 1] = Math.round(data[i + 1] * alpha + bgRgb.g * (1 - alpha));
      data[i + 2] = Math.round(data[i + 2] * alpha + bgRgb.b * (1 - alpha));
      data[i + 3] = 255;
    }
  }

  // Apply Filters
  applyFilters(data, config);

  // Luminance & Color Mapping
  const luminanceValues = new Float32Array(finalWidth * finalHeight);
  const finalColorData = new Uint8ClampedArray(data.length);

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    if (config.colorMode === 'palette' && paletteRgb.length > 0) {
      const nearest = findNearestColor(r, g, b, paletteRgb);
      r = nearest.r;
      g = nearest.g;
      b = nearest.b;
    }

    finalColorData[i] = r;
    finalColorData[i + 1] = g;
    finalColorData[i + 2] = b;
    finalColorData[i + 3] = 255;

    luminanceValues[i / 4] = r * 0.299 + g * 0.587 + b * 0.114;
  }

  // Normalization
  if (config.contrastStretch) {
    let minVal = 255;
    let maxVal = 0;
    for (let i = 0; i < luminanceValues.length; i++) {
      if (luminanceValues[i] < minVal) minVal = luminanceValues[i];
      if (luminanceValues[i] > maxVal) maxVal = luminanceValues[i];
    }
    const range = maxVal - minVal;
    if (range > 0) {
      for (let i = 0; i < luminanceValues.length; i++) {
        luminanceValues[i] = ((luminanceValues[i] - minVal) / range) * 255;
      }
    } else {
      luminanceValues.fill(0);
    }
  }

  // Prepare Character Set
  let charList = config.characterSet.split('');
  if (config.inverted) {
    charList = charList.reverse();
  }
  const maxIndex = charList.length - 1;

  // Dithering (Floyd-Steinberg)
  if (config.dithering) {
    for (let y = 0; y < finalHeight; y++) {
      for (let x = 0; x < finalWidth; x++) {
        const idx = y * finalWidth + x;
        const oldPixel = luminanceValues[idx];
        const step = 255 / Math.max(1, maxIndex);
        const quantIndex = Math.round(oldPixel / step);
        const newPixel = quantIndex * step;

        const quantError = oldPixel - newPixel;

        if (x + 1 < finalWidth)
          luminanceValues[y * finalWidth + (x + 1)] += quantError * 7 / 16;
        if (x - 1 >= 0 && y + 1 < finalHeight)
          luminanceValues[(y + 1) * finalWidth + (x - 1)] += quantError * 3 / 16;
        if (y + 1 < finalHeight)
          luminanceValues[(y + 1) * finalWidth + x] += quantError * 5 / 16;
        if (x + 1 < finalWidth && y + 1 < finalHeight)
          luminanceValues[(y + 1) * finalWidth + (x + 1)] += quantError * 1 / 16;
      }
    }
  }

  // Map to characters
  const mappedChars: string[] = [];
  const scale = maxIndex / 255;

  for (let i = 0; i < luminanceValues.length; i++) {
    let val = luminanceValues[i];
    val = Math.max(0, Math.min(255, val));
    const charIndex = Math.floor(val * scale + 0.5);
    mappedChars.push(charList[Math.max(0, Math.min(charIndex, maxIndex))]);
  }

  // Group into lines
  const lines: string[] = [];
  for (let i = 0; i < mappedChars.length; i += finalWidth) {
    lines.push(mappedChars.slice(i, i + finalWidth).join(''));
  }

  return {
    text: lines.join('\n'),
    lines,
    width: finalWidth,
    height: finalHeight,
    colorData: (config.colorMode === 'original' || config.colorMode === 'palette') ? finalColorData : undefined
  };
};

/**
 * Generate a canvas from ASCII result
 */
export const generateCanvasFromAscii = (
  result: ProcessingResult,
  config: ASCIIRenderConfig,
  customScale?: number
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error("Canvas context not supported");

  const scaleFactor = customScale || 1;
  const fontSize = config.fontSize * scaleFactor;
  const fontFamily = config.fontFamily;

  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textBaseline = "top";

  const metrics = ctx.measureText("M");
  const charWidth = metrics.width;
  const charHeight = fontSize;
  const lineHeightPx = charHeight * config.lineHeight;

  const canvasWidth = Math.ceil(charWidth * result.width);
  const canvasHeight = Math.ceil(lineHeightPx * result.height);

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textBaseline = "top";

  if (!config.transparentBackground) {
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  } else {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  const { lines, colorData } = result;

  if ((config.colorMode === 'original' || config.colorMode === 'palette') && colorData) {
    for (let y = 0; y < result.height; y++) {
      const line = lines[y];
      const yPos = y * lineHeightPx;
      for (let x = 0; x < result.width; x++) {
        const char = line[x];
        const idx = (y * result.width + x) * 4;
        const r = colorData[idx];
        const g = colorData[idx + 1];
        const b = colorData[idx + 2];
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillText(char, x * charWidth, yPos);
      }
    }
  } else {
    ctx.fillStyle = config.fontColor;
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], 0, i * lineHeightPx);
    }
  }

  return canvas;
};

/**
 * Generate SVG string from ASCII result
 */
export const generateSVG = (result: ProcessingResult, config: ASCIIRenderConfig): string => {
  const { lines, colorData } = result;
  const fontSize = config.fontSize;
  const charWidth = fontSize * 0.6;
  const lineHeightPx = fontSize * config.lineHeight;

  const width = charWidth * result.width;
  const height = lineHeightPx * result.height;

  const escape = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges">`;

  if (!config.transparentBackground) {
    svgContent += `<rect width="100%" height="100%" fill="${config.backgroundColor}"/>`;
  }

  svgContent += `<style>text { font-family: ${config.fontFamily}, monospace; font-size: ${fontSize}px; white-space: pre; text-rendering: geometricPrecision; }</style>`;

  if ((config.colorMode === 'original' || config.colorMode === 'palette') && colorData) {
    for (let y = 0; y < result.height; y++) {
      const yPos = (y * lineHeightPx) + fontSize;
      let lineSVG = `<text x="0" y="${yPos}">`;
      for (let x = 0; x < result.width; x++) {
        const char = lines[y][x];
        const idx = (y * result.width + x) * 4;
        const r = colorData[idx];
        const g = colorData[idx + 1];
        const b = colorData[idx + 2];
        const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        lineSVG += `<tspan fill="${hex}">${escape(char)}</tspan>`;
      }
      lineSVG += `</text>`;
      svgContent += lineSVG;
    }
  } else {
    const fill = config.fontColor;
    lines.forEach((line, i) => {
      const y = (i * lineHeightPx) + fontSize;
      svgContent += `<text x="0" y="${y}" fill="${fill}">${escape(line)}</text>`;
    });
  }

  svgContent += `</svg>`;
  return svgContent;
};

/**
 * Generate HTML string from ASCII result
 */
export const generateHTML = (result: ProcessingResult, config: ASCIIRenderConfig): string => {
  const { lines, colorData } = result;
  const fontSize = config.fontSize;
  const lineHeight = config.lineHeight;

  if ((config.colorMode === 'original' || config.colorMode === 'palette') && colorData) {
    let html = `<pre style="font-family: ${config.fontFamily}; font-size: ${fontSize}px; line-height: ${lineHeight}; margin: 0; ${!config.transparentBackground ? `background-color: ${config.backgroundColor};` : ''} display: inline-block;">`;

    for (let y = 0; y < result.height; y++) {
      for (let x = 0; x < result.width; x++) {
        const char = lines[y][x];
        const idx = (y * result.width + x) * 4;
        const r = colorData[idx];
        const g = colorData[idx + 1];
        const b = colorData[idx + 2];
        const escaped = char === '<' ? '&lt;' : char === '>' ? '&gt;' : char === '&' ? '&amp;' : char;
        html += `<span style="color: rgb(${r},${g},${b})">${escaped}</span>`;
      }
      if (y < result.height - 1) html += '\n';
    }

    html += '</pre>';
    return html;
  } else {
    const escaped = lines.join('\n')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return `<pre style="font-family: ${config.fontFamily}; font-size: ${fontSize}px; line-height: ${lineHeight}; margin: 0; color: ${config.fontColor}; ${!config.transparentBackground ? `background-color: ${config.backgroundColor};` : ''} display: inline-block;">${escaped}</pre>`;
  }
};
