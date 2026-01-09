import React, { useState, useEffect, useCallback } from 'react';
import { AsciiConfig, ProcessingResult } from './types';
import { DEFAULT_CONFIG } from './constants';
import { Controls } from './components/Controls';
import { Viewer } from './components/Viewer';
import { generateAscii, loadImage, readFileAsDataURL } from './utils/ascii';

const App: React.FC = () => {
  const [config, setConfig] = useState<AsciiConfig>(DEFAULT_CONFIG);
  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Debounced processing to avoid lagging the UI when dragging sliders
  useEffect(() => {
    if (!sourceImage) return;

    const timer = setTimeout(() => {
        setIsLoading(true);
        // Small delay to let UI render loading state
        setTimeout(() => {
            try {
                const res = generateAscii(sourceImage, config);
                setResult(res);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }, 10);
    }, 150); // 150ms debounce

    return () => clearTimeout(timer);
  }, [config, sourceImage]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsLoading(true);
      try {
        const url = await readFileAsDataURL(e.target.files[0]);
        const img = await loadImage(url);
        setSourceImage(img);
      } catch (err) {
        console.error("Error loading image", err);
        alert("Failed to load image.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-200">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Sidebar Controls */}
      <Controls 
        config={config} 
        setConfig={setConfig} 
        onReset={handleReset}
        onUploadClick={() => fileInputRef.current?.click()}
      />

      {/* Main Preview Area */}
      <Viewer 
        result={result} 
        config={config}
        isLoading={isLoading}
        sourceImage={sourceImage}
      />
      
    </div>
  );
};

export default App;
