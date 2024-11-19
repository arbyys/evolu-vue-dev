
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
  ],
  base: './',
  optimizeDeps: {
    exclude: ['@evolu/vue'],
  },
})
