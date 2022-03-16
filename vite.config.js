const path = require('path')

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      styles: path.resolve(__dirname, 'src/styles'),
      assets: path.resolve(__dirname, 'src/assets'),
    }
  }
})
