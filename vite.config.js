import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from 'vite-plugin-mpa'
const mpa = pkg.default || pkg

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mpa({
      scanDir: 'src/pages',
      scanFile: 'main.{js,jsx,ts,tsx}',
      filename: 'index.html'
    })
  ]
})
