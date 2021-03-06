const path = require('path')

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'boot',
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      styles: path.resolve(__dirname, 'src/styles'),
      assets: path.resolve(__dirname, 'assets'),
      css: path.resolve(__dirname, 'src/css'),
    },
  },
  assetsInclude: ['**/*.glb', '**/*.exr'],
})
