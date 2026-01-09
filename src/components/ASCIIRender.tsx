import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  ASCIIRenderProps,
  ASCIIRenderRef,
  ASCIIRenderConfig,
  ProcessingResult,
} from '../types';
import { DEFAULT_CONFIG } from '../constants';
import {
  generateAscii,
  generateCanvasFromAscii,
  generateSVG,
  generateHTML,
  loadImage,
  loadImageFromBlob,
  readFileAsDataURL,
} from '../utils/ascii';

/**
 * ASCIIRender - A React component for converting images to ASCII art
 * 
 * @example
 * ```tsx
 * import { ASCIIRender } from 'asciirender';
 * 
 * function App() {
 *   return (
 *     <ASCIIRender 
 *       src="/path/to/image.jpg"
 *       config={{ resolutionWidth: 100, colorMode: 'original' }}
 *     />
 *   );
 * }
 * ```
 */
export const ASCIIRender = forwardRef<ASCIIRenderRef, ASCIIRenderProps>(
  (
    {
      src,
      config: configOverrides,
      output = 'html',
      onGenerate,
      onError,
      className,
      style,
      autoFit = false,
    },
    ref
  ) => {
    const [result, setResult] = useState<ProcessingResult | null>(null);
    const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Merge config with defaults
    const config: ASCIIRenderConfig = useMemo(
      () => ({ ...DEFAULT_CONFIG, ...configOverrides }),
      [configOverrides]
    );

    // Load image from src
    useEffect(() => {
      let cancelled = false;

      const loadSource = async () => {
        setIsLoading(true);
        try {
          let img: HTMLImageElement;

          if (src instanceof HTMLImageElement) {
            img = src;
          } else if (src instanceof Blob) {
            img = await loadImageFromBlob(src);
          } else if (src instanceof File) {
            const dataUrl = await readFileAsDataURL(src);
            img = await loadImage(dataUrl);
          } else if (typeof src === 'string') {
            img = await loadImage(src);
          } else {
            throw new Error('Invalid src type');
          }

          if (!cancelled) {
            setLoadedImage(img);
          }
        } catch (err) {
          if (!cancelled) {
            const error = err instanceof Error ? err : new Error(String(err));
            onError?.(error);
            setLoadedImage(null);
          }
        } finally {
          if (!cancelled) {
            setIsLoading(false);
          }
        }
      };

      loadSource();

      return () => {
        cancelled = true;
      };
    }, [src, onError]);

    // Process image when loaded or config changes
    useEffect(() => {
      if (!loadedImage) {
        setResult(null);
        return;
      }

      const timer = setTimeout(() => {
        try {
          const res = generateAscii(loadedImage, config);
          setResult(res);
          onGenerate?.(res);
        } catch (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          onError?.(error);
        }
      }, 50); // Small debounce

      return () => clearTimeout(timer);
    }, [loadedImage, config, onGenerate, onError]);

    // Refresh function
    const refresh = useCallback(() => {
      if (loadedImage) {
        try {
          const res = generateAscii(loadedImage, config);
          setResult(res);
          onGenerate?.(res);
        } catch (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          onError?.(error);
        }
      }
    }, [loadedImage, config, onGenerate, onError]);

    // Imperative handle for ref
    useImperativeHandle(
      ref,
      () => ({
        getResult: () => result,

        downloadPNG: (filename = `ascii-art-${Date.now()}.png`) => {
          if (!result) return;
          const canvas = generateCanvasFromAscii(result, config, config.exportScale);
          const link = document.createElement('a');
          link.download = filename;
          link.href = canvas.toDataURL('image/png');
          link.click();
        },

        downloadSVG: (filename = `ascii-art-${Date.now()}.svg`) => {
          if (!result) return;
          const svgString = generateSVG(result, config);
          const blob = new Blob([svgString], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = filename;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        },

        downloadTXT: (filename = `ascii-art-${Date.now()}.txt`) => {
          if (!result) return;
          const blob = new Blob([result.text], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = filename;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        },

        copyToClipboard: async () => {
          if (!result) return;
          await navigator.clipboard.writeText(result.text);
        },

        getCanvas: (scale?: number) => {
          if (!result) return null;
          return generateCanvasFromAscii(result, config, scale ?? config.exportScale);
        },

        getSVGString: () => {
          if (!result) return null;
          return generateSVG(result, config);
        },

        refresh,
      }),
      [result, config, refresh]
    );

    // Render output
    const renderOutput = useMemo(() => {
      if (!result) return null;

      switch (output) {
        case 'svg':
          return (
            <div
              dangerouslySetInnerHTML={{ __html: generateSVG(result, config) }}
              style={{ display: 'inline-block' }}
            />
          );

        case 'canvas':
          const canvas = generateCanvasFromAscii(result, config);
          canvasRef.current = canvas;
          return (
            <img
              src={canvas.toDataURL()}
              alt="ASCII Art"
              style={{ display: 'block', maxWidth: autoFit ? '100%' : undefined }}
            />
          );

        case 'html':
        default:
          return (
            <div
              dangerouslySetInnerHTML={{ __html: generateHTML(result, config) }}
              style={{ display: 'inline-block' }}
            />
          );
      }
    }, [result, config, output, autoFit]);

    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          display: 'inline-block',
          overflow: autoFit ? 'auto' : undefined,
          ...style,
        }}
      >
        {isLoading ? (
          <div style={{ padding: '1rem', opacity: 0.5 }}>Loading...</div>
        ) : result ? (
          renderOutput
        ) : (
          <div style={{ padding: '1rem', opacity: 0.5 }}>No image loaded</div>
        )}
      </div>
    );
  }
);

ASCIIRender.displayName = 'ASCIIRender';

export default ASCIIRender;
