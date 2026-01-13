import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// Library build configuration - optimized for size and speed
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    dts({
      include: ['src'],
      outDir: 'dist',
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  publicDir: false, // Don't copy public folder to dist for library build
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ASCIIR',
      fileName: 'asciir',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        manualChunks: undefined,
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
    },
    sourcemap: false,
    minify: 'esbuild',
    reportCompressedSize: true,
    target: 'es2020',
    cssMinify: true,
  },
  esbuild: {
    drop: ['console', 'debugger'],
    treeShaking: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
});
