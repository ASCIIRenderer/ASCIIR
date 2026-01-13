import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Code2, 
  Zap, 
  Palette, 
  Download, 
  Github,
  Star,
  Sparkles,
  Shield,
  Copy,
  Check,
} from 'lucide-react';
import { HomeSEO } from '../components/SEO';
import { ASCIIR } from '../../src';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install asciir');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HomeSEO />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Open Source React Component
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Transform Images into 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"> Beautiful ASCII Art</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                  A powerful React component for converting images to stunning ASCII art with customizable settings, multiple color modes, and professional export options.
                </p>
              </div>

              {/* Install command */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between max-w-md shadow-sm">
                <code className="text-slate-700 font-mono text-sm sm:text-base">npm install asciir</code>
                <button
                  onClick={handleCopy}
                  className="ml-4 p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500 hover:text-slate-900"
                  aria-label="Copy command"
                >
                  {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
                >
                  Try Demo <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all bg-white shadow-sm"
                >
                  Read Docs <Code2 className="ml-2 w-5 h-5 text-slate-500" />
                </Link>
              </div>

              <div className="pt-4 flex items-center gap-6 text-sm text-slate-500">
                <a
                  href="https://github.com/AkshayPall/asciir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-slate-900 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
                <a
                  href="https://github.com/AkshayPall/asciir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-slate-900 transition-colors"
                >
                  <Star className="w-5 h-5 text-yellow-500" />
                  Star on GitHub
                </a>
              </div>
            </div>

            {/* Live ASCIIR Demo */}
            <div className="relative order-first lg:order-last flex justify-center items-center perspective-1000">
              {/* Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 blur-[100px] rounded-full pointer-events-none" />
              
              {/* Floating ASCII Art */}
              <div className="relative z-10 p-2 transition-all duration-700 hover:scale-105 hover:rotate-2">
                <ASCIIR 
                  src="/NoBgIcon.svg"
                  config={{
                    resolutionWidth: 56,
                    characterSet: " ASCIIR",
                    inverted: false,
                    contrastStretch: true,
                    fontColor: "#0f172a", // Darker color for white bg
                    backgroundColor: "transparent",
                    lineHeight: 1,
                    autoScaleHeight: true,
                    fontSize: 12,
                    transparentBackground: true,
                    dithering: false,
                    colorMode: "original",
                    fontFamily: "'Fira Code', monospace",
                    exportScale: 2,
                    fillTransparency: false,
                    brightness: 1,
                    contrast: 1,
                    saturation: 1
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Packed with Features
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to create beautiful ASCII art with advanced controls and export options.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Palette,
                title: "Multiple Color Modes",
                description: "Monochrome, original colors, or custom palettes. Full control over your output.",
              },
              {
                icon: Code2,
                title: "Custom Characters",
                description: "Use preset character sets or create your own custom ramps for unique effects.",
              },
              {
                icon: Zap,
                title: "Image Filters",
                description: "Brightness, contrast, and saturation controls for perfect results.",
              },
              {
                icon: Sparkles,
                title: "Dithering Support",
                description: "Floyd-Steinberg dithering for smooth gradients and better quality.",
              },
              {
                icon: Download,
                title: "Multiple Exports",
                description: "Download as PNG, SVG, or TXT. Perfect for any use case.",
              },
              {
                icon: Shield,
                title: "TypeScript Ready",
                description: "Full type definitions included. Works perfectly with TypeScript projects.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple to Use
            </h2>
            <p className="text-lg text-slate-400">
              Get started with just a few lines of code
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-slate-500 text-sm font-mono">App.tsx</span>
            </div>
            <pre className="p-4 sm:p-6 overflow-x-auto">
              <code className="text-sm text-slate-300 font-mono leading-relaxed">{`import { ASCIIR, useASCIIRender } from 'asciir';

function App() {
  const ref = useASCIIRender();

  return (
    <div>
      <ASCIIR 
        ref={ref}
        src="/your-image.jpg"
        config={{
          resolutionWidth: 100,
          colorMode: 'mono',
          fontColor: '#00FF00'
        }}
      />
      <button onClick={() => ref.current?.downloadPNG()}>
        Download PNG
      </button>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Quick Installation
            </h2>
            <p className="text-lg text-slate-600">
              Install ASCIIR with npm
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg p-8 text-center">
            <code className="text-xl sm:text-2xl text-slate-900 font-mono bg-slate-50 px-6 py-3 rounded-xl inline-block">
              npm install asciir
            </code>
            <p className="mt-6 text-slate-500">
              Requires React 18+ and supports TypeScript out of the box
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Create ASCII Art?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Try the interactive demo, read the documentation, or install the package and get started today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/demo"
              className="px-8 py-3.5 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Launch Demo
            </Link>
            <Link
              to="/docs"
              className="px-8 py-3.5 rounded-xl border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
