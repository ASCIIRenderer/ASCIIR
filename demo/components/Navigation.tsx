import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/demo', label: 'Demo' },
    { path: '/docs', label: 'Docs' },
  ];

  return (
    <nav className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="ASCIIR Home">
            <img src="/NoBgIcon.svg" alt="" className="w-10 h-10 object-contain" aria-hidden="true" />
            <div>
              <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">ASCIIR</p>
              <p className="text-xs text-slate-500">ASCII Art Generator</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-semibold transition-colors relative py-2 ${
                  isActive(link.path)
                    ? 'text-blue-600'
                    : 'text-slate-700 hover:text-blue-600'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/asciir/asciir"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              aria-label="View ASCIIR on GitHub"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              <span>GitHub</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-blue-600 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://github.com/asciir/asciir"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg font-semibold"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
