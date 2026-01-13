import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Copy,
  Check,
  Book,
  Code2,
  Palette,
  Download,
  Settings,
  Zap,
  Terminal,
  FileCode,
  Package,
  Layers,
  ExternalLink,
  Menu,
  X as XIcon,
} from 'lucide-react';
import { DocsSEO } from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const DocsPage: React.FC = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(section || 'getting-started');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (section) setActiveSection(section);
  }, [section]);

  const handleSectionChange = (id: string) => {
    setActiveSection(id);
    navigate(`/docs/${id}`);
    setSidebarOpen(false);
  };

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, language = 'tsx', id, title }: { code: string; language?: string; id?: string; title?: string }) => (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 my-4 group">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          {title && <span className="text-sm text-slate-400 ml-2">{title}</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500 uppercase">{language}</span>
          {id && (
            <button
              onClick={() => copyToClipboard(code, id)}
              className="flex items-center gap-1.5 px-2 py-1 text-xs text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-all"
            >
              {copiedCode === id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode === id ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-slate-100 font-mono leading-relaxed">{code}</code>
      </pre>
    </div>
  );

  const PropTable = ({ props }: { props: Array<{ name: string; type: string; default?: string; description: string; required?: boolean }> }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="py-3 px-4 text-sm font-semibold text-slate-900">Property</th>
            <th className="py-3 px-4 text-sm font-semibold text-slate-900">Type</th>
            <th className="py-3 px-4 text-sm font-semibold text-slate-900">Default</th>
            <th className="py-3 px-4 text-sm font-semibold text-slate-900">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, idx) => (
            <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="py-3 px-4">
                <code className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{prop.name}</code>
                {prop.required && <span className="ml-2 text-xs text-red-500 font-medium">required</span>}
              </td>
              <td className="py-3 px-4"><code className="text-sm text-slate-600 font-mono">{prop.type}</code></td>
              <td className="py-3 px-4"><code className="text-sm text-slate-500">{prop.default || '—'}</code></td>
              <td className="py-3 px-4 text-sm text-slate-600">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const sections = [
    { id: 'getting-started', label: 'Getting Started', icon: Zap },
    { id: 'installation', label: 'Installation', icon: Terminal },
    { id: 'quick-start', label: 'Quick Start', icon: Code2 },
    { id: 'configuration', label: 'Configuration', icon: Settings },
    { id: 'component-api', label: 'Component API', icon: Package },
    { id: 'hooks', label: 'Hooks', icon: Layers },
    { id: 'color-modes', label: 'Color Modes', icon: Palette },
    { id: 'exports', label: 'Export Formats', icon: Download },
    { id: 'examples', label: 'Examples', icon: FileCode },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <article className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Getting Started with ASCIIR</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              ASCIIR is a powerful React component that transforms images into beautiful ASCII art.
              With full TypeScript support, multiple export formats, and extensive customization options.
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-8">
              {[
                { icon: '🎨', title: 'Customizable', desc: 'Full control over colors, fonts, and character sets' },
                { icon: '📦', title: 'Lightweight', desc: 'Zero dependencies, optimized bundle size' },
                { icon: '⚡', title: 'Fast', desc: 'Efficient rendering with React 18+ support' },
              ].map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 text-center">
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Quick Install</h2>
            <CodeBlock code="npm install @asciirender/asciir" language="bash" id="quick-install" />

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Basic Usage</h2>
            <CodeBlock
              code={`import { ASCIIR } from '@asciirender/asciir';

function App() {
  return <ASCIIR src="/your-image.jpg" />;
}`}
              language="tsx"
              id="basic-usage"
            />

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5" /> Pro Tip
              </h3>
              <p className="text-blue-800">
                Use the <code className="bg-blue-100 px-1.5 py-0.5 rounded">useASCIIRender</code> hook to access download methods and get the ASCII text output.
              </p>
            </div>
          </article>
        );

      case 'installation':
        return (
          <article className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Installation</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              ASCIIR is available on npm and can be installed using npm.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Using npm</h2>
            <CodeBlock code="npm install @asciirender/asciir" language="bash" id="npm-install" />

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Requirements</h2>
            <ul className="space-y-2 my-4">
              <li className="flex items-center gap-2 text-slate-600">
                <Check className="w-5 h-5 text-green-500" /> React 18.0.0 or higher
              </li>
              <li className="flex items-center gap-2 text-slate-600">
                <Check className="w-5 h-5 text-green-500" /> React DOM 18.0.0 or higher
              </li>
              <li className="flex items-center gap-2 text-slate-600">
                <Check className="w-5 h-5 text-green-500" /> TypeScript 4.7+ (optional, for type definitions)
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Verify Installation</h2>
            <CodeBlock
              code={`import { ASCIIR, useASCIIRender } from '@asciirender/asciir';

// If this compiles without errors, you're ready to go!
console.log('ASCIIR installed successfully');`}
              language="tsx"
              id="verify-install"
            />
          </article>
        );

      case 'quick-start':
        return (
          <article className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Quick Start</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Get up and running with ASCIIR in under 5 minutes.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Step 1: Import the Component</h2>
            <CodeBlock
              code={`import { ASCIIR, useASCIIRender } from '@asciirender/asciir';`}
              language="tsx"
              id="step1"
            />

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Step 2: Basic Rendering</h2>
            <CodeBlock
              code={`function MyASCIIArt() {
  return (
    <ASCIIR 
      src="/path/to/image.jpg"
      config={{
        resolutionWidth: 100,
        colorMode: 'mono'
      }}
    />
  );
}`}
              language="tsx"
              id="step2"
            />

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Step 3: Add Download Functionality</h2>
            <CodeBlock
              code={`function MyASCIIArt() {
  const asciiRef = useASCIIRender();

  return (
    <div>
      <ASCIIR 
        ref={asciiRef}
        src="/path/to/image.jpg"
        config={{ resolutionWidth: 100 }}
      />
      
      <div className="flex gap-2 mt-4">
        <button onClick={() => asciiRef.current?.downloadPNG()}>
          Download PNG
        </button>
        <button onClick={() => asciiRef.current?.downloadSVG()}>
          Download SVG
        </button>
        <button onClick={() => asciiRef.current?.downloadTXT()}>
          Download TXT
        </button>
      </div>
    </div>
  );
}`}
              language="tsx"
              id="step3"
            />

            <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
              <h3 className="font-semibold text-green-900 mb-2">🎉 You're Ready!</h3>
              <p className="text-green-800">
                You now have a working ASCII art generator with export capabilities. Explore the configuration options to customize the output.
              </p>
            </div>
          </article>
        );

      case 'configuration':
        return (
          <article className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Configuration</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Customize every aspect of your ASCII art with these configuration options.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Resolution & Layout</h2>
            <PropTable props={[
              { name: 'resolutionWidth', type: 'number', default: '150', description: 'Width of output in characters (columns)' },
              { name: 'fontSize', type: 'number', default: '12', description: 'Font size in pixels for rendering' },
              { name: 'scaleRatio', type: 'number', default: '0.55', description: 'Vertical scale ratio for aspect ratio correction' },
              { name: 'autoScaleHeight', type: 'boolean', default: 'false', description: 'Automatically calculate scale ratio based on font' },
            ]} />

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Character Set</h2>
            <PropTable props={[
              { name: 'characterSet', type: 'string', default: '" .:-=+*#%@"', description: 'Characters used for ASCII mapping (light to dark)' },
            ]} />

            <CodeBlock
              code={`// Custom character sets
config={{ characterSet: ' ░▒▓█' }}  // Block characters
config={{ characterSet: ' .:oO@' }} // Simple dots
config={{ characterSet: ' .-+*#' }} // Minimal set`}
              language="tsx"
              id="charset-examples"
            />

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Colors</h2>
            <PropTable props={[
              { name: 'colorMode', type: '"mono" | "original" | "palette"', default: '"mono"', description: 'Color rendering mode' },
              { name: 'fontColor', type: 'string', default: '"#FFFFFF"', description: 'Text color for monochrome mode' },
              { name: 'backgroundColor', type: 'string', default: '"#242424"', description: 'Background color' },
              { name: 'colorPalette', type: 'string[]', default: '[]', description: 'Custom color palette for palette mode' },
            ]} />

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Image Processing</h2>
            <PropTable props={[
              { name: 'brightness', type: 'number', default: '1.0', description: 'Brightness adjustment (0-3)' },
              { name: 'contrast', type: 'number', default: '1.0', description: 'Contrast adjustment (0-3)' },
              { name: 'saturation', type: 'number', default: '1.0', description: 'Saturation adjustment (0-3)' },
              { name: 'dithering', type: 'boolean', default: 'false', description: 'Apply Floyd-Steinberg dithering' },
              { name: 'inverted', type: 'boolean', default: 'false', description: 'Invert brightness values' },
              { name: 'contrastStretch', type: 'boolean', default: 'false', description: 'Auto-stretch contrast range' },
              { name: 'fillTransparency', type: 'boolean', default: 'false', description: 'Fill transparent pixels with background' },
            ]} />
          </article>
        );

      case 'component-api':
        return (
          <article className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Component API</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Complete reference for the ASCIIR component and its methods.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Props</h2>
            <PropTable props={[
              { name: 'src', type: 'string', description: 'Image source URL or data URL', required: true },
              { name: 'config', type: 'Partial<ASCIIRenderConfig>', description: 'Configuration options' },
              { name: 'onComplete', type: '(result: ProcessingResult) => void', description: 'Callback when rendering completes' },
              { name: 'className', type: 'string', description: 'CSS class name for the container' },
            ]} />

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Ref Methods</h2>
            <p className="text-slate-600 mb-4">
              Access these methods via the ref returned by <code className="bg-slate-100 px-1.5 py-0.5 rounded">useASCIIRender()</code>
            </p>

            <div className="space-y-4 my-6">
              {[
                { method: 'downloadPNG(filename?: string)', desc: 'Download the ASCII art as a PNG image' },
                { method: 'downloadSVG(filename?: string)', desc: 'Download the ASCII art as an SVG vector file' },
                { method: 'downloadTXT(filename?: string)', desc: 'Download the ASCII art as a plain text file' },
                { method: 'copyToClipboard()', desc: 'Copy the ASCII text to the system clipboard' },
                { method: 'getResult()', desc: 'Get the current ProcessingResult with text and metadata' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <code className="text-blue-600 font-medium">{item.method}</code>
                  <p className="text-slate-600 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">TypeScript Types</h2>
            <CodeBlock
              code={`import type { 
  ASCIIRenderConfig,
  ASCIIRenderRef,
  ProcessingResult 
} from '@asciirender/asciir';

// ProcessingResult interface
interface ProcessingResult {
  text: string;        // The ASCII art as text
  width: number;       // Width in characters
  height: number;      // Height in characters
  config: ASCIIRenderConfig;
}`}
              language="tsx"
              id="types"
            />
          </article>
        );

      case 'hooks':
        return (
          <article className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Hooks</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              React hooks provided by ASCIIR for advanced usage.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">useASCIIRender</h2>
            <p className="text-slate-600">
              The primary hook for accessing the ASCIIR component's methods.
            </p>

            <CodeBlock
              code={`import { ASCIIR, useASCIIRender } from '@asciirender/asciir';

function MyComponent() {
  const asciiRef = useASCIIRender();

  const handleExport = async () => {
    // Get the ASCII text
    const result = asciiRef.current?.getResult();
    console.log(result?.text);
    
    // Download as different formats
    asciiRef.current?.downloadPNG('my-ascii-art');
    asciiRef.current?.downloadSVG('my-ascii-art');
    asciiRef.current?.downloadTXT('my-ascii-art');
  };

  return (
    <div>
      <ASCIIR 
        ref={asciiRef}
        src="/image.jpg"
        onComplete={(result) => console.log('Rendered:', result)}
      />
      <button onClick={handleExport}>Export</button>
    </div>
  );
}`}
              language="tsx"
              id="use-ascii-render"
            />

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
              <h3 className="font-semibold text-amber-900 mb-2">⚠️ Important</h3>
              <p className="text-amber-800">
                Always check if <code className="bg-amber-100 px-1.5 py-0.5 rounded">asciiRef.current</code> exists before calling methods, as the ref may be null before the component mounts.
              </p>
            </div>
          </article>
        );

      case 'color-modes':
        return (
          <article className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Color Modes</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              ASCIIR supports three color modes for different visual effects.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              {[
                { mode: 'mono', title: 'Monochrome', desc: 'Classic single-color ASCII art', color: 'bg-slate-800' },
                { mode: 'original', title: 'Original', desc: 'Preserves the source image colors', color: 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500' },
                { mode: 'palette', title: 'Palette', desc: 'Map to a custom color palette', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className={`h-20 ${item.color}`} />
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded mt-2 inline-block">colorMode: "{item.mode}"</code>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Monochrome Mode</h2>
            <CodeBlock
              code={`<ASCIIR
  src="/image.jpg"
  config={{
    colorMode: 'mono',
    fontColor: '#00FF00',      // Matrix-style green
    backgroundColor: '#000000'  // Black background
  }}
/>`}
              language="tsx"
              id="mono-mode"
            />

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Original Colors Mode</h2>
            <CodeBlock
              code={`<ASCIIR
  src="/image.jpg"
  config={{
    colorMode: 'original',
    dithering: true  // Recommended for better color reproduction
  }}
/>`}
              language="tsx"
              id="original-mode"
            />

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Custom Palette Mode</h2>
            <CodeBlock
              code={`<ASCIIR
  src="/image.jpg"
  config={{
    colorMode: 'palette',
    colorPalette: [
      '#2D1B69',  // Deep purple
      '#5B4B8A',  // Light purple
      '#7B68EE',  // Medium slate blue
      '#DDA0DD',  // Plum
      '#FFFFFF'   // White
    ]
  }}
/>`}
              language="tsx"
              id="palette-mode"
            />
          </article>
        );

      case 'exports':
        return (
          <article className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Export Formats</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Export your ASCII art in multiple formats for different use cases.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              {[
                { format: 'PNG', icon: '🖼️', desc: 'High-quality raster image', use: 'Sharing on social media, presentations' },
                { format: 'SVG', icon: '📐', desc: 'Scalable vector format', use: 'Web usage, print, infinite scaling' },
                { format: 'TXT', icon: '📄', desc: 'Plain text file', use: 'Code comments, terminal display, email signatures' },
              ].map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.format}</h3>
                  <p className="text-slate-600 mb-3">{item.desc}</p>
                  <p className="text-sm text-slate-500 italic">{item.use}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Export Example</h2>
            <CodeBlock
              code={`const asciiRef = useASCIIRender();

// Export with custom filename
asciiRef.current?.downloadPNG('my-ascii-art');
asciiRef.current?.downloadSVG('my-ascii-art');
asciiRef.current?.downloadTXT('my-ascii-art');

// Copy to clipboard
await asciiRef.current?.copyToClipboard();`}
              language="tsx"
              id="export-example"
            />
          </article>
        );

      case 'examples':
        return (
          <article className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Examples</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Real-world examples to help you get started quickly.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Terminal-Style ASCII</h2>
            <CodeBlock
              code={`<ASCIIR
  src="/photo.jpg"
  config={{
    resolutionWidth: 80,
    colorMode: 'mono',
    fontColor: '#00FF00',
    backgroundColor: '#0D0D0D',
    fontFamily: 'Courier New, monospace',
    characterSet: ' .:-=+*#%@'
  }}
/>`}
              language="tsx"
              id="example-terminal"
            />

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">High-Resolution Color</h2>
            <CodeBlock
              code={`<ASCIIR
  src="/photo.jpg"
  config={{
    resolutionWidth: 200,
    colorMode: 'original',
    fontSize: 8,
    dithering: true,
    contrastStretch: true
  }}
/>`}
              language="tsx"
              id="example-hires"
            />

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Retro Game Style</h2>
            <CodeBlock
              code={`<ASCIIR
  src="/sprite.png"
  config={{
    resolutionWidth: 40,
    colorMode: 'palette',
    colorPalette: [
      '#000000', '#1D2B53', '#7E2553', '#008751',
      '#AB5236', '#5F574F', '#C2C3C7', '#FFF1E8',
      '#FF004D', '#FFA300', '#FFEC27', '#00E436',
      '#29ADFF', '#83769C', '#FF77A8', '#FFCCAA'
    ],
    characterSet: '█'
  }}
/>`}
              language="tsx"
              id="example-retro"
            />

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">With Download Buttons</h2>
            <CodeBlock
              code={`function ASCIIArtWithExport() {
  const ref = useASCIIRender();
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="ascii-container">
      <ASCIIR
        ref={ref}
        src="/image.jpg"
        config={{ resolutionWidth: 100, colorMode: 'mono' }}
        onComplete={() => setIsReady(true)}
      />
      
      {isReady && (
        <div className="export-buttons">
          <button onClick={() => ref.current?.downloadPNG()}>
            📷 Save PNG
          </button>
          <button onClick={() => ref.current?.downloadSVG()}>
            📐 Save SVG  
          </button>
          <button onClick={() => ref.current?.downloadTXT()}>
            📄 Save TXT
          </button>
        </div>
      )}
    </div>
  );
}`}
              language="tsx"
              id="example-export"
            />

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <ExternalLink className="w-5 h-5" /> Try it Live
              </h3>
              <p className="text-blue-800">
                Head over to the <a href="/demo" className="text-blue-600 underline font-medium">interactive demo</a> to experiment with these configurations in real-time.
              </p>
            </div>
          </article>
        );

      default:
        return (
          <article className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Documentation</h1>
            <p className="text-xl text-slate-600">Select a section from the sidebar to get started.</p>
          </article>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DocsSEO />
      <Navigation />

      <div className="flex-1 flex">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-xl"
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-slate-50 border-r border-slate-200 transform transition-transform lg:transform-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="h-full overflow-y-auto pt-20 lg:pt-6 pb-8 px-4">
            <div className="flex items-center gap-2 mb-6 px-3">
              <Book className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-slate-900">Documentation</span>
            </div>

            <nav className="space-y-1">
              {sections.map(item => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="text-sm">{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-slate-200 px-3">
              <a
                href="https://github.com/ASCIIRenderer/ASCIIR"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
              >
                <ExternalLink className="w-4 h-4" />
                View on GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/@asciirender/asciir"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mt-3"
              >
                <Package className="w-4 h-4" />
                npm Package
              </a>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 lg:py-12 max-w-4xl">
          {renderContent()}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DocsPage;
