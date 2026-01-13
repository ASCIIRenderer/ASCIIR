import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src='/NoBgIcon.svg' alt='ASCIIR' className='w-10 h-10 object-contain' />
              <span className="font-bold text-xl">ASCIIR</span>
            </Link>
            <p className="text-slate-400 text-sm">
              Transform images into beautiful ASCII art with React.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/demo" className="hover:text-white transition-colors">Demo</Link></li>
              <li><a href="https://www.npmjs.com/package/@asciirender/asciir" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">npm Package</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="https://github.com/ASCIIRenderer/ASCIIR" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://github.com/ASCIIRenderer/ASCIIR/issues" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Issues</a></li>
              <li><a href="https://github.com/ASCIIRenderer/ASCIIR/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contributing</a></li>
              <li><a href="https://github.com/ASCIIRenderer/ASCIIR/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">License</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-slate-400 text-sm mb-3">Star us on GitHub for updates</p>
            <a
              href="https://github.com/ASCIIRenderer/ASCIIR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-medium transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              Star on GitHub
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} ASCIIR. Open source under MIT License.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/ASCIIRenderer/ASCIIR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/asciir"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@asciir.dev"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
