import dts from 'vite-plugin-dts';
import packageJson from "./package.json";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// think about standard build as well 

export default defineConfig(({mode})=>({
  server:{
    port:8004
  },
  plugins: [react(),dts({ rollupTypes: true })],
  define: {
    // Ensure React uses production branches in the bundle
    'process.env.NODE_ENV': JSON.stringify(mode?? 'production'),
  },

  build: {

    sourcemap: true,
    minify: 'esbuild',
    lib: {
      entry: 'src/index.ts',
     name: packageJson.name, // used only for UMD/IIFE
      formats: ['es', 'cjs'], // add 'umd' only if you need it
      fileName: (format) => (format === 'es' ? 'index.mjs' : `index.${format}`)
    },
    rollupOptions: {
      external: [],// react is bundled here
      output: {
        // Try to keep a single ESM file (avoid shared/vendor chunks)
        inlineDynamicImports: true,
        // For ESM we still want index.mjs specifically
        // Vite overrides this with `fileName` above for lib builds
      }
    },
    target: 'es2018',
  },

   test: {
    globals: true,
    environment: 'jsdom',          // makes `document` available at runtime
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // setupFiles: ['./vitest.setup.ts'], // optional
  },
}));

