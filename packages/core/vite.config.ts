import { dirname, resolve } from 'node:path'
import { copyFileSync } from "node:fs"
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react"
import dts from 'vite-plugin-dts'

import packageJson from "./package.json";
const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [react(),
      dts({ rollupTypes: true,
        afterBuild: () => {
          // To pass publint (`npm x publint@latest`) and ensure the
          // package is supported by all consumers, we must export types that are
          // read as ESM. To do this, there must be duplicate types with the
          // correct extension supplied in the package.json exports field.
          copyFileSync("dist/index.d.ts", "dist/index.d.mts")
        }
       })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: packageJson.name,
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external:[
        'react',
      "react/jsx-runtime",
      'react-dom'
    ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
        'react': 'react',
        'react-dom': 'ReactDOM',
        'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
    sourcemap: true,
  },
})