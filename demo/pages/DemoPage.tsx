import React, { useState } from 'react';
import {
  Upload,
  Copy,
  RotateCcw,
  Eye,
  Image as ImageIcon,
  Link as LinkIcon,
  X,
  Check,
  Code2,
  Plus,
  FileImage,
  FileCode,
  FileText,
} from 'lucide-react';
import { DemoSEO } from '../components/SEO';
import { ASCIIRender, useASCIIRender, ASCIIRenderConfig, DEFAULT_CONFIG, FONTS, FONT_RATIOS } from 'asciir';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const DemoPage: React.FC = () => {
  const [config, setConfig] = useState<Partial<ASCIIRenderConfig>>(DEFAULT_CONFIG);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [codeCopied, setCodeCopied] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'styling' | 'filters'>('basic');
  const [showOriginal, setShowOriginal] = useState(false);
  const [displayScale, setDisplayScale] = useState(1);
  const [autoSize, setAutoSize] = useState(false);
  const asciiRef = useASCIIRender();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = <K extends keyof ASCIIRenderConfig>(key: K, value: ASCIIRenderConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImageSrc(URL.createObjectURL(file));
      const name = file.name.replace(/\.[^/.]+$/, '');
      setFileName(name);
      handleChange('characterSet', ' ' + name);
      setDisplayScale(1);
    }
  };

  const handleLoadUrl = () => {
    if (imageUrl.trim()) {
      setImageSrc(imageUrl.trim());
      try {
        const url = new URL(imageUrl.trim());
        const pathParts = url.pathname.split('/');
        const filename = pathParts[pathParts.length - 1];
        const name = filename.replace(/\.[^/.]+$/, '');
        setFileName(name);
        handleChange('characterSet', ' ' + name);
      } catch {}
      setDisplayScale(1);
    }
  };

  const handleAutoScale = () => {
    const fontFamily = config.fontFamily || DEFAULT_CONFIG.fontFamily;
    const ratio = FONT_RATIOS[fontFamily] || 0.55;
    handleChange('scaleRatio', ratio);
    handleChange('autoScaleHeight', true);
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setAutoSize(false);
    setFileName('');
  };

  const handleCopy = async () => {
    try {
      const result = asciiRef.current?.getResult();
      if (result) {
        await navigator.clipboard.writeText(result.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
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

  const generateCode = () => {
    const configCopy = { ...config };
    if (configCopy.autoScaleHeight) delete (configCopy as any).scaleRatio;
    
    return `import { ASCIIR } from '@asciirender/asciir';

export default function Demo() {
  return (
    <ASCIIR 
      src="${imageSrc || 'your-image.jpg'}"
      config={${JSON.stringify(configCopy, null, 2)}}
    />
  );
}`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCode());
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <DemoSEO />
      <Navigation />

      <div className="flex-1 overflow-hidden flex flex-col bg-slate-950">
        {/* Banner/Header */}
        <header className="shrink-0 px-6 py-6 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-1">
              Studio
            </h1>
            <p className="text-slate-400 text-sm font-medium">Create stunning ASCII art in seconds</p>
          </div>
          
          {imageSrc && (
            <button
              onClick={copyCode}
              className="relative z-10 flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-full transition-all text-sm font-medium"
            >
              {codeCopied ? <Check className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
              {codeCopied ? 'Copied!' : 'Export React Code'}
            </button>
          )}
        </header>

        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-3 gap-4 p-4 overflow-hidden">
          {/* LEFT SIDEBAR */}
          <aside className="lg:col-span-1 flex flex-col gap-3 overflow-y-auto">
            {/* Upload Section */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 space-y-3">
              <h2 className="text-white font-semibold text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-400" />
                Image Upload
              </h2>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-blue-500/50 rounded-xl p-4 text-center hover:bg-blue-500/10 hover:border-blue-400 transition-all"
              >
                <Upload className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-white font-semibold text-sm">Click to Upload</p>
                <p className="text-xs text-slate-400">PNG, JPG, GIF, SVG</p>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </button>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Or paste image URL..."
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLoadUrl()}
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleLoadUrl}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Load
                </button>
              </div>
              {fileName && (
                <div className="text-xs text-slate-400 bg-slate-700/50 p-2 rounded-lg">
                  Character set: <span className="text-blue-400 font-mono">" {fileName}"</span>
                </div>
              )}
            </div>

            {/* Settings Tabs */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex-1 flex flex-col">
              <nav className="grid grid-cols-3 border-b border-slate-700" role="tablist">
                {[
                  { key: 'basic', label: 'Basic' },
                  { key: 'styling', label: 'Styling' },
                  { key: 'filters', label: 'Filters' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    role="tab"
                    aria-selected={activeTab === tab.key}
                    className={`px-3 py-3 text-sm font-semibold transition-colors ${
                      activeTab === tab.key
                        ? 'text-blue-400 bg-slate-700/50 border-b-2 border-blue-400'
                        : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>

              <div className="p-4 space-y-4 overflow-y-auto flex-1">
                {activeTab === 'basic' && (
                  <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer bg-slate-700/50 p-3 rounded-lg">
                      <span className="text-sm font-medium text-white">Auto Size (Fill Parent)</span>
                      <input type="checkbox" checked={autoSize} onChange={e => setAutoSize(e.target.checked)} className="w-5 h-5 accent-blue-500 rounded" />
                    </label>

                    {!autoSize && (
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium text-white">Width</label>
                          <span className="text-sm text-blue-400 font-mono">{config.resolutionWidth || DEFAULT_CONFIG.resolutionWidth}</span>
                        </div>
                        <input type="range" min="30" max="300" value={config.resolutionWidth || DEFAULT_CONFIG.resolutionWidth} onChange={e => handleChange('resolutionWidth', parseInt(e.target.value))} className="w-full accent-blue-500" />
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-white">Font Size</label>
                        <span className="text-sm text-blue-400 font-mono">{config.fontSize || DEFAULT_CONFIG.fontSize}px</span>
                      </div>
                      <input type="range" min="6" max="24" value={config.fontSize || DEFAULT_CONFIG.fontSize} onChange={e => handleChange('fontSize', parseInt(e.target.value))} className="w-full accent-blue-500" />
                    </div>

                    <label className="flex items-center justify-between cursor-pointer bg-slate-700/50 p-3 rounded-lg">
                      <span className="text-sm font-medium text-white">Auto Scale Height</span>
                      <input
                        type="checkbox"
                        checked={config.autoScaleHeight || false}
                        onChange={e => {
                          handleChange('autoScaleHeight', e.target.checked);
                          if (e.target.checked) handleAutoScale();
                        }}
                        className="w-5 h-5 accent-blue-500 rounded"
                      />
                    </label>

                    {!config.autoScaleHeight && (
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium text-white">Scale Ratio</label>
                          <span className="text-sm text-blue-400 font-mono">{(config.scaleRatio || DEFAULT_CONFIG.scaleRatio).toFixed(2)}</span>
                        </div>
                        <input type="range" min="0.1" max="1" step="0.05" value={config.scaleRatio || DEFAULT_CONFIG.scaleRatio} onChange={e => handleChange('scaleRatio', parseFloat(e.target.value))} className="w-full accent-blue-500" />
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-white block mb-2">Font Family</label>
                      <select
                        value={config.fontFamily || DEFAULT_CONFIG.fontFamily}
                        onChange={e => handleChange('fontFamily', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        {Object.entries(FONTS).map(([key, value]) => (
                          <option key={key} value={value}>{key}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-white block mb-2">Character Set</label>
                      <input
                        type="text"
                        value={config.characterSet || DEFAULT_CONFIG.characterSet}
                        onChange={e => handleChange('characterSet', e.target.value)}
                        placeholder=" .:-=+*#%@"
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-slate-500 mt-1">Light to dark characters</p>
                    </div>

                    <button onClick={handleReset} className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                      <RotateCcw className="w-4 h-4" />
                      Reset All Settings
                    </button>
                  </div>
                )}

                {activeTab === 'styling' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white block mb-2">Color Mode</label>
                      <select
                        value={config.colorMode || DEFAULT_CONFIG.colorMode}
                        onChange={e => handleChange('colorMode', e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="mono">Monochrome</option>
                        <option value="original">Original Colors</option>
                        <option value="palette">Custom Palette</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-slate-700/30 p-4 rounded-xl space-y-2">
                        <label className="text-sm font-medium text-white block">Text Color</label>
                        <div className="flex gap-3 items-center">
                          <div className="relative w-16 h-10 rounded-lg overflow-hidden border-2 border-slate-600">
                            <input
                              type="color"
                              value={config.fontColor || DEFAULT_CONFIG.fontColor}
                              onChange={e => handleChange('fontColor', e.target.value)}
                              className="absolute inset-0 w-full h-full cursor-pointer"
                              style={{ transform: 'scale(2)', transformOrigin: 'center' }}
                            />
                          </div>
                          <input
                            type="text"
                            value={config.fontColor || DEFAULT_CONFIG.fontColor}
                            onChange={e => handleChange('fontColor', e.target.value)}
                            className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg font-mono text-sm text-center"
                          />
                        </div>
                      </div>

                      <div className="bg-slate-700/30 p-4 rounded-xl space-y-2">
                        <label className="text-sm font-medium text-white block">Background</label>
                        <div className="flex gap-3 items-center">
                          <div className="relative w-16 h-10 rounded-lg overflow-hidden border-2 border-slate-600">
                            <input
                              type="color"
                              value={config.backgroundColor || DEFAULT_CONFIG.backgroundColor}
                              onChange={e => handleChange('backgroundColor', e.target.value)}
                              className="absolute inset-0 w-full h-full cursor-pointer"
                              style={{ transform: 'scale(2)', transformOrigin: 'center' }}
                            />
                          </div>
                          <input
                            type="text"
                            value={config.backgroundColor || DEFAULT_CONFIG.backgroundColor}
                            onChange={e => handleChange('backgroundColor', e.target.value)}
                            className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg font-mono text-sm text-center"
                          />
                        </div>
                      </div>
                    </div>

                    {(config.colorMode || DEFAULT_CONFIG.colorMode) === 'palette' && (
                      <div className="space-y-3 pt-3 border-t border-slate-600">
                        <h3 className="text-sm font-medium text-white">Custom Palette</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {(config.colorPalette || DEFAULT_CONFIG.colorPalette).map((color, idx) => (
                            <div key={idx} className="relative group">
                              <input
                                type="color"
                                value={color}
                                onChange={e => handleUpdateColor(idx, e.target.value)}
                                className="w-full h-14 rounded-lg cursor-pointer border-2 border-slate-600"
                              />
                              {(config.colorPalette || DEFAULT_CONFIG.colorPalette).length > 1 && (
                                <button
                                  onClick={() => handleRemoveColor(idx)}
                                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <button onClick={handleAddColor} className="w-full px-4 py-3 text-blue-400 hover:bg-blue-600/20 rounded-lg text-sm flex items-center justify-center gap-2 border border-blue-400/30 border-dashed transition-colors">
                          <Plus className="w-4 h-4" />
                          Add Color
                        </button>
                      </div>
                    )}

                    <div className="space-y-2 pt-3 border-t border-slate-600">
                      {['dithering', 'inverted', 'contrastStretch', 'fillTransparency'].map(key => (
                        <label key={key} className="flex items-center gap-3 cursor-pointer bg-slate-700/30 p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                          <input
                            type="checkbox"
                            checked={(config[key as keyof ASCIIRenderConfig] as boolean) || false}
                            onChange={e => handleChange(key as any, e.target.checked)}
                            className="w-5 h-5 accent-blue-500 rounded"
                          />
                          <span className="text-sm text-white">
                            {key === 'dithering' ? 'Dithering Effect' :
                             key === 'inverted' ? 'Invert Colors' :
                             key === 'contrastStretch' ? 'Auto Contrast' :
                             'Fill Transparency (PNG)'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'filters' && (
                  <div className="space-y-4">
                    {[
                      { key: 'brightness', label: 'Brightness' },
                      { key: 'contrast', label: 'Contrast' },
                      { key: 'saturation', label: 'Saturation' }
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium text-white">{label}</label>
                          <span className="text-sm text-blue-400 font-mono">{(config[key as keyof ASCIIRenderConfig] as number || 1).toFixed(1)}x</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="3"
                          step="0.1"
                          value={(config[key as keyof ASCIIRenderConfig] as number) || 1}
                          onChange={e => handleChange(key as any, parseFloat(e.target.value))}
                          className="w-full accent-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN - Preview */}
          {/* RIGHT COLUMN - Preview */}
          <section className="lg:col-span-2 flex flex-col gap-3 overflow-hidden min-h-[400px] relative">
            {imageSrc ? (
              <div className="flex-1 flex flex-col relative group rounded-2xl border border-white/5 bg-slate-900/50">
                {/* Floating Toolbar */}
                <div className="absolute top-4 right-4 z-20 flex gap-1.5 p-1.5 bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-xl">
                  <button onClick={handleCopy} className="p-2 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl transition-colors" title="Copy Text">
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <div className="w-px h-5 bg-white/10 self-center mx-1" />
                  <button onClick={() => asciiRef.current?.downloadPNG()} className="p-2 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl transition-colors" title="Download PNG">
                    <FileImage className="w-4 h-4" />
                  </button>
                  <button onClick={() => asciiRef.current?.downloadSVG()} className="p-2 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl transition-colors" title="Download SVG">
                    <FileCode className="w-4 h-4" />
                  </button>
                  <button onClick={() => asciiRef.current?.downloadTXT()} className="p-2 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl transition-colors" title="Download TXT">
                    <FileText className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Controls Float */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-900/60 backdrop-blur-md rounded-full border border-white/10 shadow-xl">
                    <button
                      onClick={() => setShowOriginal(!showOriginal)}
                      className="px-3 py-1.5 hover:bg-white/10 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
                    >
                      <Eye className="w-3 h-3 text-blue-400" />
                      {showOriginal ? 'Viewing Original' : 'Viewing ASCII'}
                    </button>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="flex items-center gap-2">
                      <button onClick={() => setDisplayScale(Math.max(0.3, displayScale - 0.1))} className="text-slate-400 hover:text-white transition-colors p-1">
                        <span className="sr-only">Zoom Out</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                      </button>
                      <span className="text-white font-mono text-xs w-8 text-center">{Math.round(displayScale * 100)}%</span>
                      <button onClick={() => setDisplayScale(Math.min(3, displayScale + 0.1))} className="text-slate-400 hover:text-white transition-colors p-1">
                        <span className="sr-only">Zoom In</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-auto bg-transparent scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                  <div className="min-w-full min-h-full p-8 flex items-start justify-center">
                    <div style={{ transform: `scale(${displayScale})`, transformOrigin: 'top center' }} className="inline-block font-mono shadow-2xl">
                      {showOriginal ? (
                        <img src={imageSrc} alt="Original image" className="rounded-lg shadow-lg max-w-none" />
                      ) : (
                        <ASCIIRender ref={asciiRef} src={imageSrc} config={config} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 bg-slate-900/30 rounded-2xl border-2 border-dashed border-slate-700/50 flex items-center justify-center hover:border-slate-600/50 transition-colors group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ImageIcon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">Drop your image here</h3>
                  <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                    Support for PNG, JPG, GIF and SVG. <br/>
                    <span className="text-blue-400/80">Click to browse</span> or paste an image URL.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DemoPage;
