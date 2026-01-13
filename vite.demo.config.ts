import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Demo app build configuration
export default defineConfig({
  plugins: [react()],
  root: '.',
  base: '/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'demo-dist',
    emptyOutDir: true,
    minify: 'esbuild',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
      'asciir': resolve(__dirname, 'src/index.ts'),
    },
  },
});
