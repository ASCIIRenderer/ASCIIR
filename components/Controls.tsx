import React from 'react';
import { AsciiConfig } from '../types';
import { CHAR_SETS, FONTS, FONT_RATIOS, PALETTE_PRESETS } from '../constants';
import { RotateCcw, Settings2, Upload, MoveHorizontal, Type, Palette, Monitor, Zap, Wand2, Sliders, PaintBucket, Plus, X } from 'lucide-react';
import { Button } from './Button';

interface ControlsProps {
  config: AsciiConfig;
  setConfig: React.Dispatch<React.SetStateAction<AsciiConfig>>;
  onReset: () => void;
  onUploadClick: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ config, setConfig, onReset, onUploadClick }) => {
  
  const handleChange = <K extends keyof AsciiConfig>(key: K, value: AsciiConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleAutoScale = () => {
    const ratio = FONT_RATIOS[config.fontFamily] || 0.55;
    handleChange('scaleRatio', ratio);
  };

  const handleAddColor = () => {
    handleChange('colorPalette', [...config.colorPalette, '#ffffff']);
  };

  const handleRemoveColor = (index: number) => {
    const newPalette = [...config.colorPalette];
    newPalette.splice(index, 1);
    // Ensure at least one color exists
    if (newPalette.length === 0) newPalette.push('#000000');
    handleChange('colorPalette', newPalette);
  };

  const handleUpdateColor = (index: number, newColor: string) => {
    const newPalette = [...config.colorPalette];
    newPalette[index] = newColor;
    handleChange('colorPalette', newPalette);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border-r border-slate-700 h-full overflow-y-auto p-6 w-full md:w-80 flex-shrink-0 flex flex-col gap-8 custom-scrollbar">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
          <Settings2 className="w-5 h-5 text-blue-400" />
          Settings
        </h2>
        <p className="text-slate-400 text-sm">Customize your ASCII art output.</p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Source</h3>
        <Button onClick={onUploadClick} variant="primary" className="w-full" icon={<Upload className="w-4 h-4"/>}>
          Upload New Image
        </Button>
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
            <span className="text-blue-400 font-mono">{config.resolutionWidth}px</span>
          </div>
          <input 
            type="range" 
            min="20" 
            max="400" 
            step="2"
            value={config.resolutionWidth}
            onChange={(e) => handleChange('resolutionWidth', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm items-center">
            <label className="text-slate-300">Vertical Scale</label>
            <div className="flex items-center gap-2">
                <span className="text-blue-400 font-mono">{config.scaleRatio.toFixed(2)}</span>
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
            value={config.scaleRatio}
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
            <span className="text-blue-400 font-mono">{Math.round(config.brightness * 100)}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="3" 
            step="0.1"
            value={config.brightness}
            onChange={(e) => handleChange('brightness', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label className="text-slate-300">Contrast</label>
            <span className="text-blue-400 font-mono">{Math.round(config.contrast * 100)}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="3" 
            step="0.1"
            value={config.contrast}
            onChange={(e) => handleChange('contrast', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label className="text-slate-300">Saturation</label>
            <span className="text-blue-400 font-mono">{Math.round(config.saturation * 100)}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="3" 
            step="0.1"
            value={config.saturation}
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
            value={config.fontFamily}
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
            value={config.characterSet}
            onChange={(e) => handleChange('characterSet', e.target.value)}
          >
            <option value={CHAR_SETS.custom_vinay}>Default (Vinay)</option>
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
            value={config.characterSet}
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
                    {config.colorPalette.map((color, idx) => (
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
                <p className="text-[10px] text-slate-500">
                    Colors in the image will be snapped to the nearest color in this list.
                </p>
            </div>
        )}

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-xs text-slate-400">Background</label>
                <div className="flex items-center gap-2">
                    <input 
                        type="color" 
                        value={config.backgroundColor}
                        disabled={config.transparentBackground}
                        onChange={(e) => handleChange('backgroundColor', e.target.value)}
                        className="h-8 w-8 rounded cursor-pointer border-0 p-0 bg-transparent disabled:opacity-50"
                    />
                    <span className="text-xs font-mono text-slate-500">{config.backgroundColor}</span>
                </div>
            </div>
            {config.colorMode === 'mono' && (
                <div className="space-y-2">
                    <label className="text-xs text-slate-400">Text Color</label>
                    <div className="flex items-center gap-2">
                        <input 
                            type="color" 
                            value={config.fontColor}
                            onChange={(e) => handleChange('fontColor', e.target.value)}
                            className="h-8 w-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                        />
                        <span className="text-xs font-mono text-slate-500">{config.fontColor}</span>
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
                className={`w-11 h-6 bg-slate-700 rounded-full relative transition-colors ${config.contrastStretch ? 'bg-blue-600' : ''}`}
            >
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${config.contrastStretch ? 'translate-x-5' : ''}`}></div>
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

        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <label className="text-sm text-slate-300">Fill Transparent Areas</label>
                <span className="text-[10px] text-slate-500">Uses background color for PNGs</span>
            </div>
            <button 
                onClick={() => handleChange('fillTransparency', !config.fillTransparency)}
                className={`w-11 h-6 bg-slate-700 rounded-full relative transition-colors ${config.fillTransparency ? 'bg-blue-600' : ''}`}
            >
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${config.fillTransparency ? 'translate-x-5' : ''}`}></div>
            </button>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <Button variant="secondary" className="w-full" onClick={onReset} icon={<RotateCcw className="w-4 h-4"/>}>
            Reset Defaults
        </Button>
      </div>

    </div>
  );
};
