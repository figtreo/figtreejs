import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 4242, // so we don't conflict
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']], // animated with n in app when this is activated
      },
    }),
  ],
})
