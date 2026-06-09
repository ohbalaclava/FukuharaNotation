import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// react-native-web ships its source as plain .js files that contain JSX and
// Flow-free ESM, and the app's own JSX also lives in .js files. esbuild needs
// to be told to treat .js as JSX, both for the app source and for prebundled deps.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    },
    extensions: ['.web.js', '.js', '.jsx', '.json']
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js'
  }
})