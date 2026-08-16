import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ], build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      // Дозволяє використовувати src/... як абсолютний шлях
      src: path.resolve(__dirname, './src'),
      // Або популярніший варіант з @/
      // '@': path.resolve(__dirname, './src'),
    },
  },
})
