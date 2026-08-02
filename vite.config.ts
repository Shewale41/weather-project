import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        quality: 75,
        compressionLevel: 9,
      },
      jpeg: {
        quality: 75,
      },
      jpg: {
        quality: 75,
      },
      webp: {
        quality: 75,
        lossless: false,
      },
      avif: {
        quality: 60,
        lossless: false,
      },
      svg: {
        multipass: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})