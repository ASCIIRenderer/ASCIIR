import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const DemoPage = lazy(() => import('./pages/DemoPage'));
const DocsPage = lazy(() => import('./pages/DocsPage'));

// Loading component
const PageLoader: React.FC = () => (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
      <p className="text-white font-semibold">Loading ASCIIR...</p>
    </div>
  </div>
);

// 404 Page
const NotFound: React.FC = () => (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-blue-500 mb-4">404</h1>
      <p className="text-2xl text-white mb-6">Page not found</p>
      <a
        href="/"
        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
      >
        Go Home
      </a>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/:section" element={<DocsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
