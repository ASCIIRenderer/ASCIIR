import React, { useState, useEffect, useMemo } from 'react';
import { 
  ASCIIRender, 
  useASCIIRender, 
  ASCIIRenderConfig, 
  DEFAULT_CONFIG,
  CHAR_SETS,
  FONTS,
  FONT_RATIOS,
  PALETTE_PRESETS
} from '../src';
import { 
  RotateCcw, 
  Settings2, 
  Upload, 
  MoveHorizontal, 
  Type, 
  Palette, 
  Zap, 
  Wand2, 
  Sliders, 
  Plus, 
  X,
  Copy,
  Download,
  FileText,
  Code,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Link,
  Check
} from 'lucide-react';

const App: React.FC = () => {
  const [config, setConfig] = useState<Partial<ASCIIRenderConfig>>(DEFAULT_CONFIG);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isUrlMode, setIsUrlMode] = useState<boolean>(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [codeCopied, setCodeCopied] = useState(false);
  const asciiRef = useASCIIRender();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = <K extends keyof ASCIIRenderConfig>(key: K, value: ASCIIRenderConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleAutoScale = () => {
    const fontFamily = config.fontFamily || DEFAULT_CONFIG.fontFamily;
    const ratio = FONT_RATIOS[fontFamily] || 0.55;
    handleChange('scaleRatio', ratio);
  };

  const handleAddColor = () => {
    const currentPalette = config.colorPalette || DEFAULT_CONFIG.colorPalette;
    handleChange('colorPalette', [...currentPalette, '#ffffff']);
  };

  const handleRemoveColor = (index: number) => {
    const currentPalette = config.colorPalette || DEFAULT_CONFIG.colorPalette;
    const newPalette = [...currentPalette];
    newPalette.splice(index, 1);
    if (newPalette.length === 0) newPalette.push('#000000');
    handleChange('colorPalette', newPalette);
  };

  const handleUpdateColor = (index: number, newColor: string) => {
    const currentPalette = config.colorPalette || DEFAULT_CONFIG.colorPalette;
    const newPalette = [...currentPalette];
    newPalette[index] = newColor;
    handleChange('colorPalette', newPalette);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImageSrc(url);
      setImageUrl('');
      setIsUrlMode(false);
      setShowOriginal(false);
      setZoom(1);
    }
  };

  const handleLoadUrl = () => {
    if (imageUrl.trim()) {
      setImageSrc(imageUrl.trim());
      setIsUrlMode(true);
      setShowOriginal(false);
      setZoom(1);
    }
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  const handleCopy = async () => {
    await asciiRef.current?.copyToClipboard();
    alert('Text copied to clipboard!');
  };

  // Generate the component code string for copying
  const generateComponentCode = useMemo(() => {
    const configEntries: string[] = [];
    
    // Only include non-default values
    if (config.resolutionWidth !== DEFAULT_CONFIG.resolutionWidth) {
      configEntries.push(`resolutionWidth: ${config.resolutionWidth}`);
    }
    if (config.characterSet !== DEFAULT_CONFIG.characterSet) {
      configEntries.push(`characterSet: "${config.characterSet}"`);
    }
    if (config.inverted !== DEFAULT_CONFIG.inverted) {
      configEntries.push(`inverted: ${config.inverted}`);
    }
    if (config.contrastStretch !== DEFAULT_CONFIG.contrastStretch) {
      configEntries.push(`contrastStretch: ${config.contrastStretch}`);
    }
    if (config.fontColor !== DEFAULT_CONFIG.fontColor) {
      configEntries.push(`fontColor: "${config.fontColor}"`);
    }
    if (config.backgroundColor !== DEFAULT_CONFIG.backgroundColor) {
      configEntries.push(`backgroundColor: "${config.backgroundColor}"`);
    }
    if (config.lineHeight !== DEFAULT_CONFIG.lineHeight) {
      configEntries.push(`lineHeight: ${config.lineHeight}`);
    }
    if (config.scaleRatio !== DEFAULT_CONFIG.scaleRatio) {
      configEntries.push(`scaleRatio: ${config.scaleRatio}`);
    }
    if (config.fontSize !== DEFAULT_CONFIG.fontSize) {
      configEntries.push(`fontSize: ${config.fontSize}`);
    }
    if (config.transparentBackground !== DEFAULT_CONFIG.transparentBackground) {
      configEntries.push(`transparentBackground: ${config.transparentBackground}`);
    }
    if (config.dithering !== DEFAULT_CONFIG.dithering) {
      configEntries.push(`dithering: ${config.dithering}`);
    }
    if (config.colorMode !== DEFAULT_CONFIG.colorMode) {
      configEntries.push(`colorMode: '${config.colorMode}'`);
    }
    if (config.fontFamily !== DEFAULT_CONFIG.fontFamily) {
      configEntries.push(`fontFamily: "${config.fontFamily}"`);
    }
    if (config.exportScale !== DEFAULT_CONFIG.exportScale) {
      configEntries.push(`exportScale: ${config.exportScale}`);
    }
    if (config.fillTransparency !== DEFAULT_CONFIG.fillTransparency) {
      configEntries.push(`fillTransparency: ${config.fillTransparency}`);
    }
    if (config.brightness !== DEFAULT_CONFIG.brightness) {
      configEntries.push(`brightness: ${config.brightness}`);
    }
    if (config.contrast !== DEFAULT_CONFIG.contrast) {
      configEntries.push(`contrast: ${config.contrast}`);
    }
    if (config.saturation !== DEFAULT_CONFIG.saturation) {
      configEntries.push(`saturation: ${config.saturation}`);
    }
    if (config.colorMode === 'palette' && JSON.stringify(config.colorPalette) !== JSON.stringify(DEFAULT_CONFIG.colorPalette)) {
      configEntries.push(`colorPalette: ${JSON.stringify(config.colorPalette)}`);
    }

    const srcValue = isUrlMode && imageUrl ? `"${imageUrl}"` : '"/path/to/your-image.jpg"';
    const configStr = configEntries.length > 0 
      ? `\n  config={{\n    ${configEntries.join(',\n    ')}\n  }}`
      : '';

    return `import { ASCIIRender } from 'asciirender';

function MyComponent() {
  return (
    <ASCIIRender
      src=${srcValue}${configStr}
    />
  );
}`;
  }, [config, isUrlMode, imageUrl]);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(generateComponentCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const result = asciiRef.current?.getResult();

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
      <div className="bg-slate-800/50 backdrop-blur-sm border-r border-slate-700 h-full overflow-y-auto p-6 w-full md:w-80 flex-shrink-0 flex flex-col gap-8 custom-scrollbar">
        
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
            <Settings2 className="w-5 h-5 text-blue-400" />
            ASCIIRender Demo
          </h2>
          <p className="text-slate-400 text-sm">Customize your ASCII art output.</p>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Source</h3>
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4"/>
            Upload Image
          </button>
          
          <div className="relative">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <div className="flex-1 h-px bg-slate-700"></div>
              <span>or enter URL</span>
              <div className="flex-1 h-px bg-slate-700"></div>
            </div>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLoadUrl()}
                placeholder="https://example.com/image.jpg"
                className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleLoadUrl}
                disabled={!imageUrl.trim()}
                className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg px-3 py-2"
              >
                <Link className="w-4 h-4"/>
              </button>
            </div>
          </div>

          {imageSrc && (
            <div className="text-xs text-slate-500 bg-slate-900/50 rounded p-2 break-all">
              {isUrlMode ? (
                <span className="flex items-center gap-1"><Link className="w-3 h-3"/> {imageUrl}</span>
              ) : (
                <span className="flex items-center gap-1"><ImageIcon className="w-3 h-3"/> Uploaded file</span>
              )}
            </div>
          )}
        </div>

        <hr className="border-slate-700" />

        {/* Dimensions & Scale */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <MoveHorizontal className="w-4 h-4" /> Dimensions
          </h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-slate-300">Width (Columns)</label>
              <span className="text-blue-400 font-mono">{config.resolutionWidth || DEFAULT_CONFIG.resolutionWidth}px</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="400" 
              step="2"
              value={config.resolutionWidth || DEFAULT_CONFIG.resolutionWidth}
              onChange={(e) => handleChange('resolutionWidth', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm items-center">
              <label className="text-slate-300">Vertical Scale</label>
              <div className="flex items-center gap-2">
                <span className="text-blue-400 font-mono">{(config.scaleRatio || DEFAULT_CONFIG.scaleRatio).toFixed(2)}</span>
                <button 
                  onClick={handleAutoScale}
                  className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors"
                  title="Auto-calculate based on font"
                >
                  <Wand2 className="w-3 h-3" /> Auto
                </button>
              </div>
            </div>
            <input 
              type="range" 
              min="0.3" 
              max="1.0" 
              step="0.01"
              value={config.scaleRatio || DEFAULT_CONFIG.scaleRatio}
              onChange={(e) => handleChange('scaleRatio', parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        <hr className="border-slate-700" />

        {/* Filters Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Filters
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-slate-300">Brightness</label>
              <span className="text-blue-400 font-mono">{Math.round((config.brightness || DEFAULT_CONFIG.brightness) * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="3" 
              step="0.1"
              value={config.brightness || DEFAULT_CONFIG.brightness}
              onChange={(e) => handleChange('brightness', parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-slate-300">Contrast</label>
              <span className="text-blue-400 font-mono">{Math.round((config.contrast || DEFAULT_CONFIG.contrast) * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="3" 
              step="0.1"
              value={config.contrast || DEFAULT_CONFIG.contrast}
              onChange={(e) => handleChange('contrast', parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-slate-300">Saturation</label>
              <span className="text-blue-400 font-mono">{Math.round((config.saturation || DEFAULT_CONFIG.saturation) * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="3" 
              step="0.1"
              value={config.saturation || DEFAULT_CONFIG.saturation}
              onChange={(e) => handleChange('saturation', parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        <hr className="border-slate-700" />

        {/* Characters */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Type className="w-4 h-4" /> Characters
          </h3>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">Font Family</label>
            <select 
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 font-mono"
              value={config.fontFamily || DEFAULT_CONFIG.fontFamily}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
            >
              <option value={FONTS.fira}>Fira Code</option>
              <option value={FONTS.vt323}>VT323 (Retro)</option>
              <option value={FONTS.roboto}>Roboto Mono</option>
              <option value={FONTS.source}>Source Code Pro</option>
              <option value={FONTS.courier}>Courier New</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">Character Set</label>
            <select 
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              value={config.characterSet || DEFAULT_CONFIG.characterSet}
              onChange={(e) => handleChange('characterSet', e.target.value)}
            >
              <option value={CHAR_SETS.default}>Default</option>
              <option value={CHAR_SETS.standard_short}>Standard Short</option>
              <option value={CHAR_SETS.standard_long}>Standard Long</option>
              <option value={CHAR_SETS.blocks}>Block Shades</option>
              <option value={CHAR_SETS.binary}>Binary (01)</option>
              <option value={CHAR_SETS.minimal}>Minimal (#.)</option>
              <option value={CHAR_SETS.matrix}>Matrix</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">Custom Ramp</label>
            <input 
              type="text" 
              value={config.characterSet || DEFAULT_CONFIG.characterSet}
              onChange={(e) => handleChange('characterSet', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg p-2.5 font-mono tracking-widest"
            />
          </div>
        </div>

        <hr className="border-slate-700" />

        {/* Colors & Appearance */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Palette className="w-4 h-4" /> Appearance
          </h3>
          
          <div className="space-y-3">
            <label className="text-sm text-slate-300">Color Mode</label>
            <div className="flex bg-slate-900 p-1 rounded-lg gap-1">
              <button 
                onClick={() => handleChange('colorMode', 'mono')}
                className={`flex-1 py-1.5 text-[10px] md:text-xs font-medium rounded-md transition-all ${config.colorMode === 'mono' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Mono
              </button>
              <button 
                onClick={() => handleChange('colorMode', 'original')}
                className={`flex-1 py-1.5 text-[10px] md:text-xs font-medium rounded-md transition-all ${config.colorMode === 'original' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Original
              </button>
              <button 
                onClick={() => handleChange('colorMode', 'palette')}
                className={`flex-1 py-1.5 text-[10px] md:text-xs font-medium rounded-md transition-all ${config.colorMode === 'palette' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Palette
              </button>
            </div>
          </div>

          {/* Palette Editor */}
          {config.colorMode === 'palette' && (
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs text-slate-400 font-semibold">Active Palette</label>
                <select 
                  className="bg-slate-800 text-[10px] p-1 rounded border border-slate-700"
                  onChange={(e) => {
                    const presetName = e.target.value as keyof typeof PALETTE_PRESETS;
                    if (PALETTE_PRESETS[presetName]) {
                      handleChange('colorPalette', [...PALETTE_PRESETS[presetName]]);
                    }
                  }}
                >
                  <option value="">Presets...</option>
                  {Object.keys(PALETTE_PRESETS).map(key => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(config.colorPalette || DEFAULT_CONFIG.colorPalette).map((color, idx) => (
                  <div key={idx} className="relative group w-8 h-8">
                    <input 
                      type="color" 
                      value={color}
                      onChange={(e) => handleUpdateColor(idx, e.target.value)}
                      className="w-8 h-8 rounded border-0 p-0 overflow-hidden cursor-pointer"
                    />
                    <button 
                      onClick={() => handleRemoveColor(idx)}
                      className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-2 h-2 text-white" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={handleAddColor}
                  className="w-8 h-8 rounded border border-slate-600 border-dashed flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-400 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Background</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={config.backgroundColor || DEFAULT_CONFIG.backgroundColor}
                  disabled={config.transparentBackground}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                  className="h-8 w-8 rounded cursor-pointer border-0 p-0 bg-transparent disabled:opacity-50"
                />
                <span className="text-xs font-mono text-slate-500">{config.backgroundColor || DEFAULT_CONFIG.backgroundColor}</span>
              </div>
            </div>
            {config.colorMode === 'mono' && (
              <div className="space-y-2">
                <label className="text-xs text-slate-400">Text Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={config.fontColor || DEFAULT_CONFIG.fontColor}
                    onChange={(e) => handleChange('fontColor', e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <span className="text-xs font-mono text-slate-500">{config.fontColor || DEFAULT_CONFIG.fontColor}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-300">Transparent Output</label>
            <button 
              onClick={() => handleChange('transparentBackground', !config.transparentBackground)}
              className={`w-11 h-6 bg-slate-700 rounded-full relative transition-colors ${config.transparentBackground ? 'bg-blue-600' : ''}`}
            >
              <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${config.transparentBackground ? 'translate-x-5' : ''}`}></div>
            </button>
          </div>
        </div>

        <hr className="border-slate-700" />

        {/* Processing */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4" /> Processing
          </h3>

          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-300">Invert Ramp</label>
            <button 
              onClick={() => handleChange('inverted', !config.inverted)}
              className={`w-11 h-6 bg-slate-700 rounded-full relative transition-colors ${config.inverted ? 'bg-blue-600' : ''}`}
            >
              <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${config.inverted ? 'translate-x-5' : ''}`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-300">Auto Contrast</label>
            <button 
              onClick={() => handleChange('contrastStretch', !config.contrastStretch)}
              className={`w-11 h-6 bg-slate-700 rounded-full relative transition-colors ${config.contrastStretch !== false ? 'bg-blue-600' : ''}`}
            >
              <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${config.contrastStretch !== false ? 'translate-x-5' : ''}`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-300">Dithering</label>
            <button 
              onClick={() => handleChange('dithering', !config.dithering)}
              className={`w-11 h-6 bg-slate-700 rounded-full relative transition-colors ${config.dithering ? 'bg-blue-600' : ''}`}
            >
              <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${config.dithering ? 'translate-x-5' : ''}`}></div>
            </button>
          </div>
        </div>

        <hr className="border-slate-700" />

        {/* Component Code */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4" /> Component Code
          </h3>
          <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-800/50 border-b border-slate-700">
              <span className="text-xs text-slate-400 font-mono">React Component</span>
              <button
                onClick={handleCopyCode}
                className={`text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors ${codeCopied ? 'bg-green-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
              >
                {codeCopied ? <Check className="w-3 h-3"/> : <Copy className="w-3 h-3"/>}
                {codeCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-3 text-xs font-mono text-slate-300 overflow-x-auto max-h-48 custom-scrollbar">
              <code>{generateComponentCode}</code>
            </pre>
          </div>
          <p className="text-xs text-slate-500">
            Install the package with: <code className="bg-slate-800 px-1.5 py-0.5 rounded">npm install asciirender</code>
          </p>
        </div>

        <div className="mt-auto pt-6">
          <button 
            onClick={handleReset}
            className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg px-4 py-2 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4"/>
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col h-full bg-slate-950 relative overflow-hidden">
        
        {/* Toolbar */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur z-10">
          <div className="flex items-center gap-2">
            {imageSrc && (
              <>
                <button 
                  onClick={() => setShowOriginal(!showOriginal)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${showOriginal ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  {showOriginal ? <Eye className="w-3 h-3"/> : <EyeOff className="w-3 h-3"/>}
                  {showOriginal ? 'Showing Original' : 'Show Original'}
                </button>
                <div className="h-4 w-px bg-slate-700 mx-2"/>
              </>
            )}
            {result && (
              <>
                <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">
                  {result.width} x {result.height} chars
                </span>
                <div className="h-4 w-px bg-slate-700 mx-2"/>
              </>
            )}
            <button onClick={() => setZoom(z => Math.max(0.2, z - 0.1))} className="text-slate-400 hover:text-white px-2 font-mono">-</button>
            <span className="text-xs text-slate-400 w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} className="text-slate-400 hover:text-white px-2 font-mono">+</button>
          </div>

          {result && (
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopyCode}
                className={`${codeCopied ? 'bg-green-600' : 'bg-purple-600 hover:bg-purple-700'} text-white rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm transition-colors`}
              >
                {codeCopied ? <Check className="w-3 h-3"/> : <Code className="w-3 h-3"/>}
                {codeCopied ? 'Copied!' : 'Copy Code'}
              </button>
              <div className="h-4 w-px bg-slate-700"/>
              <button 
                onClick={handleCopy}
                className="bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm"
              >
                <Copy className="w-3 h-3"/>
                Copy
              </button>
              <button 
                onClick={() => asciiRef.current?.downloadTXT()}
                className="bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm"
              >
                <FileText className="w-3 h-3"/>
                TXT
              </button>
              <button 
                onClick={() => asciiRef.current?.downloadSVG()}
                className="bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm"
              >
                <Code className="w-3 h-3"/>
                SVG
              </button>
              <button 
                onClick={() => asciiRef.current?.downloadPNG()}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm"
              >
                <Download className="w-3 h-3"/>
                PNG ({config.exportScale || DEFAULT_CONFIG.exportScale}x)
              </button>
            </div>
          )}
        </div>

        {/* Viewport */}
        <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-slate-950/50" style={{backgroundColor: '#000000'}}>
          {!imageSrc ? (
            <div className="text-center max-w-sm px-6">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20"/>
              <h3 className="text-lg font-medium text-slate-400 mb-2">No Image Selected</h3>
              <p className="text-sm text-slate-600">Upload an image from the sidebar to generate ASCII art.</p>
            </div>
          ) : (
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
                  src={imageSrc} 
                  alt="Original" 
                  style={{ maxWidth: 'none' }}
                />
              ) : (
                <ASCIIRender
                  ref={asciiRef}
                  src={imageSrc}
                  config={config}
                  output="svg"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
