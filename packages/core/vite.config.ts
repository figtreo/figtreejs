import dts from 'vite-plugin-dts'




import packageJson from "./package.json";



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(),dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
     name: packageJson.name, // used only for UMD/IIFE
      formats: ['es', 'cjs'], // add 'umd' only if you need it
      fileName: (format) => (format === 'es' ? 'index.mjs' : `index.${format}`)
    },
    rollupOptions: {
      // mark peer deps external to avoid bundling react, etc.
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM' //react jsx runtime?
        }
      }
    }
  },
   test: {
    globals: true,
    environment: 'jsdom',          // makes `document` available at runtime
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // setupFiles: ['./vitest.setup.ts'], // optional
  },
});


