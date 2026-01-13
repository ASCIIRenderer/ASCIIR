/**
 * ASCIIR - Convert images to beautiful ASCII art
 * 
 * @packageDocumentation
 * @example
 * ```tsx
 * import { ASCIIR, useASCIIRender } from 'asciir';
 * 
 * function App() {
 *   const ref = useASCIIRender();
 *   
 *   return (
 *     <div>
 *       <ASCIIR 
 *         ref={ref}
 *         src="/image.jpg"
 *         config={{ resolutionWidth: 100 }}
 *       />
 *       <button onClick={() => ref.current?.downloadPNG()}>
 *         Download PNG
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */

// Main component
export { ASCIIRender, default } from './components/ASCIIRender';

// Brand alias
export { ASCIIRender as ASCIIR } from './components/ASCIIRender';

// Types
export type {
  ASCIIRenderConfig,
  ASCIIRenderProps,
  ASCIIRenderRef,
  ProcessingResult,
} from './types';

// Constants and presets
export {
  DEFAULT_CONFIG,
  CHAR_SETS,
  FONTS,
  FONT_RATIOS,
  PALETTE_PRESETS,
} from './constants';

// Utility functions for advanced usage
export {
  generateAscii,
  generateCanvasFromAscii,
  generateSVG,
  generateHTML,
  loadImage,
  loadImageFromBlob,
  readFileAsDataURL,
} from './utils/ascii';

// React hook for easier ref management
import { useRef } from 'react';
import type { ASCIIRenderRef } from './types';

/**
 * Hook to get a typed ref for ASCIIR component
 * 
 * @example
 * ```tsx
 * const asciiRef = useASCIIRender();
 * 
 * return (
 *   <ASCIIR ref={asciiRef} src={imageSrc} />
 * );
 * ```
 */
export const useASCIIRender = () => {
  return useRef<ASCIIRenderRef>(null);
};
