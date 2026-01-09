import React, { useRef, useEffect, useMemo, useState } from 'react';
import { AsciiConfig, ProcessingResult } from '../types';
import { Copy, Download, FileText, Image as ImageIcon, Code, Eye, EyeOff } from 'lucide-react';
import { Button } from './Button';
import { generateCanvasFromAscii, generateSVG } from '../utils/ascii';

interface ViewerProps {
  result: ProcessingResult | null;
  config: AsciiConfig;
  isLoading: boolean;
  sourceImage: HTMLImageElement | null;
}

export const Viewer: React.FC<ViewerProps> = ({ result, config, isLoading, sourceImage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showOriginal, setShowOriginal] = useState(false);

  // Generate SVG string for preview
  const svgPreview = useMemo(() => {
    if (!result) return '';
    return generateSVG(result, config);
  }, [result, config]);

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.text);
      alert('Raw text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownloadPng = () => {
    if (!result) return;
    // Use the exportScale from config
    const canvas = generateCanvasFromAscii(result, config, config.exportScale);
    const link = document.createElement('a');
    link.download = `ascii-art-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleDownloadSvg = () => {
    if (!result) return;
    const svgString = generateSVG(result, config);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `ascii-art-${Date.now()}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([result.text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `ascii-art-${Date.now()}.txt`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Zoom management (simple transform)
  const [zoom, setZoom] = React.useState(1);

  useEffect(() => {
    // Reset zoom on new result
    setZoom(1);
    setShowOriginal(false);
  }, [result]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-900 text-slate-500 animate-pulse">
        <div className="text-center">
            <Code className="w-12 h-12 mx-auto mb-4 opacity-50"/>
            <p>Processing image...</p>
        </div>
      </div>
    );
  }

  if (!result || !sourceImage) {
     return (
      <div className="flex-1 flex items-center justify-center bg-slate-900 text-slate-600">
        <div className="text-center max-w-sm px-6">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20"/>
            <h3 className="text-lg font-medium text-slate-400 mb-2">No Image Selected</h3>
            <p className="text-sm">Upload an image from the sidebar to generate ASCII art.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 relative overflow-hidden">
        
        {/* Toolbar */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur z-10">
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setShowOriginal(!showOriginal)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${showOriginal ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                   {showOriginal ? <Eye className="w-3 h-3"/> : <EyeOff className="w-3 h-3"/>}
                   {showOriginal ? 'Showing Original' : 'Show Original'}
                </button>
                <div className="h-4 w-px bg-slate-700 mx-2"/>
                <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">
                    {result.width} x {result.height} chars
                </span>
                <div className="h-4 w-px bg-slate-700 mx-2"/>
                <button onClick={() => setZoom(z => Math.max(0.2, z - 0.1))} className="text-slate-400 hover:text-white px-2 font-mono">-</button>
                <span className="text-xs text-slate-400 w-12 text-center">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} className="text-slate-400 hover:text-white px-2 font-mono">+</button>
            </div>

            <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={handleCopy} icon={<Copy className="w-3 h-3"/>}>
                    Copy Text
                </Button>
                <Button size="sm" variant="secondary" onClick={handleDownloadTxt} icon={<FileText className="w-3 h-3"/>}>
                    TXT
                </Button>
                <Button size="sm" variant="secondary" onClick={handleDownloadSvg} icon={<Code className="w-3 h-3"/>}>
                    SVG
                </Button>
                <Button size="sm" variant="primary" onClick={handleDownloadPng} icon={<Download className="w-3 h-3"/>}>
                    PNG ({config.exportScale}x)
                </Button>
            </div>
        </div>

        {/* Viewport */}
        <div ref={containerRef} className="flex-1 overflow-auto p-8 flex items-center justify-center bg-slate-950/50" style={{backgroundColor: '#000000'}}>
             <div 
                style={{ 
                    transform: `scale(${zoom})`, 
                    transformOrigin: 'center center',
                    transition: 'transform 0.1s ease-out',
                }}
                className={!showOriginal && config.transparentBackground ? "bg-checkerboard shadow-2xl" : "shadow-2xl"}
             >
                {showOriginal ? (
                    <img 
                        src={sourceImage.src} 
                        alt="Original" 
                        style={{ maxWidth: 'none' }} // Ensure it scales with zoom container
                    />
                ) : (
                    <div 
                        dangerouslySetInnerHTML={{ __html: svgPreview }}
                        className="block"
                    />
                )}
             </div>
        </div>
    </div>
  );
};
