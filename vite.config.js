import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import Pages from 'vite-plugin-pages'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      exportAsDefault: false, // enable named exports like ReactComponent
    }),
    Pages()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: [
      'ff49-2806-108e-d-e9b3-6199-24d-d6c5-2f43.ngrok-free.app'
    ]
  }
})