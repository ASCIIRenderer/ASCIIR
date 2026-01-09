import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Demo app build configuration
export default defineConfig({
  plugins: [react()],
  root: '.',
  base: './',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'demo-dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
      'asciirender': resolve(__dirname, 'src/index.ts'),
    },
  },
});
