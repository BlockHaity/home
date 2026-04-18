import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginMPA from '@sunday-sky/vite-plugin-mpa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginMPA({
      pages: {
        index: {
          title: 'index',
          entry: '/src/pages/index/main.jsx',
          template: '/src/pages/index/index.html'
        }
      }
    })],
})
